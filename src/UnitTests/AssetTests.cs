using System;
using System.IO;
using System.Linq;
using System.Security.Principal;
using System.Transactions;
using System.Web;
using System.Web.Hosting;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RAAP.Contracts.Asset;
using RAAP.Contracts.AssetSubCategory;
using RAAP.Contracts.Common;
using RAAP.Contracts.Control;
using RAAP.Contracts.Evaluation;
using RAAP.Contracts.Threat;
using RAAP.Web.API.Services;
using Microsoft.AspNet.Identity.EntityFramework;
using RAAP.Contracts.Risk;
using RAAP.Contracts.User;
using RAAP.Web.API.Authentication.Providers;

namespace UnitTests
{
    [TestClass]
    public class AssetTests
    {
        private TransactionScope _transactionScope;
        private AssetService _assetService;
        private AssetSubCategoryService _assetSubCategoryService;
        private ThreatCategoryService _threatCategoryService;
        private ControlCategoryService _controlCategoryService;
        private UserService _userService;
        private CompanyService _companyService;

        [TestInitialize]
        public void Init()
        {
            _transactionScope = new TransactionScope(TransactionScopeOption.Required);
            _userService = new UserService();
            _companyService = new CompanyService(_userService);
            _assetService = new AssetService(_userService);
            _assetSubCategoryService = new AssetSubCategoryService();
            _threatCategoryService = new ThreatCategoryService();
            _controlCategoryService = new ControlCategoryService();

            if (HttpContext.Current == null)
            {
                SimpleWorkerRequest request = new SimpleWorkerRequest("", "", "", null, new StringWriter());
                HttpContext context = new HttpContext(request);
                HttpContext.Current = context;
            }
            ResetAdminPassword();
            HttpContext.Current.User =
                new GenericPrincipal(RAAPAuthProvider.ToClaimsIdentity("None",
                    _userService.GetIdentityUserByLogin("admin", "Test123")), new string[]{});
        }

        public void ResetAdminPassword()
        {
            _userService.SetPassword(new SetPassword() { Password = "Test123", UserId = 1 });
        }

        [TestCleanup]
        public void Cleanup()
        {
            _transactionScope?.Dispose();
        }

        [TestMethod]
        public void HardResetAdminPassword()
        {
            _transactionScope.Complete();
        }

        [TestMethod]
        public void TestGetUnhandledThreats()
        {
            var riskTypeCreated = _companyService.CreateRiskType(new RiskType() { Name = "TestRiskType" });
            var asset = CreateAsset();
            var threat = CreateThreat();
            threat.Risks.Add(new Risk(5, 5, 5, 5, 5, 5, 5, 25, 125, riskTypeCreated.RiskTypeId, riskTypeCreated.Name, 0));
            asset.Threats.Add(threat);
            var createdAsset = _assetService.Create(asset);
            var problems = _assetService.GetUnhandledThreats(5, 5, 1);
            Assert.AreEqual(1, problems.Count());
            Assert.AreEqual(createdAsset.AssetId, problems.First().AssetId);
        }

        [TestMethod]
        public void TestHtmlComments()

        {
            var asset = CreateAsset();
            var threat = CreateThreat();
            asset.Threats.Add(threat);
            var threatEvaluation = CreateEvaluation();
            threat.Evaluations.Add(threatEvaluation);
            var newAsset = _assetService.Create(asset);
            Assert.AreEqual(1, newAsset.Threats.First().Evaluations.Count);
            var newEvaluation = newAsset.Threats.First().Evaluations.First();
            Assert.AreEqual(threatEvaluation.Text, newEvaluation.Text);
            Assert.AreNotEqual(0, newEvaluation.EvaluationId);
            Assert.AreNotEqual(0, newEvaluation.Revision);
        }

        [TestMethod]
        public void TestRiskCreation()
        {
            var riskTypeCreated = _companyService.CreateRiskType(new RiskType() {Name = "TestRiskType"});
            var riskTypeReturned = _companyService.GetRiskType(riskTypeCreated.RiskTypeId);
            Assert.AreEqual(riskTypeReturned.RiskTypeId, riskTypeCreated.RiskTypeId);
            Assert.AreEqual(riskTypeReturned.Name, riskTypeCreated.Name);
            _companyService.DeleteRiskType(riskTypeReturned.RiskTypeId);
        }

        [TestMethod]
        public void TestDefaultRiskCalculationOnAsset()
        {
            var riskType = _companyService.CreateRiskType(new RiskType() {Name = "Test"});
            var asset = CreateAsset();
            var threat = CreateThreat();
            asset.Threats.Add(threat);
            var createdAsset = _assetService.Create(asset);
            Assert.IsTrue(createdAsset.Risks.Any(r => r.Type == riskType.RiskTypeId));
            var assetRisk = createdAsset.Risks[0];
            Assert.IsTrue(createdAsset.Threats.Count == 1);
            Assert.IsTrue(createdAsset.Threats[0].Risks.Any(r => r.Type == riskType.RiskTypeId));
            var threatRisk = createdAsset.Threats[0].Risks[0];
            Assert.IsTrue(assetRisk.Equals(threatRisk));
            _assetService.Delete(createdAsset.AssetId);
            _assetService.Delete(riskType.RiskTypeId);
        }

        [TestMethod]
        public void TestRiskCalculationOnAsset()
        {
            var riskType = _companyService.CreateRiskType(new RiskType() { Name = "Test" });
            var asset = CreateAsset();
            var threat = CreateThreat();
            threat.Risks.Add(new Risk()
            {
                IsoImpact = 3,
                IsoProbability = 3,
                Type = riskType.RiskTypeId,
                Name = riskType.Name
            });
            asset.Threats.Add(threat);
            var createdAsset = _assetService.Create(asset);
            Assert.IsTrue(createdAsset.Risks.Any(r => r.Type == riskType.RiskTypeId));
            var assetRisk = createdAsset.Risks[0];
            Assert.AreEqual(3, assetRisk.IsoImpact);
            Assert.AreEqual(3, assetRisk.IsoProbability);
            Assert.AreEqual(9, assetRisk.IsoRisk);
            Assert.IsTrue(createdAsset.Threats.Count == 1);
            Assert.IsTrue(createdAsset.Threats[0].Risks.Any(r => r.Type == riskType.RiskTypeId));
            var threatRisk = createdAsset.Threats[0].Risks[0];
            Assert.IsTrue(assetRisk.Equals(threatRisk));
            _assetService.Delete(createdAsset.AssetId);
            _companyService.DeleteRiskType(riskType.RiskTypeId);
        }

        [TestMethod]
        public void TestRiskCalculationOnAssetWithControls()
        {
            var riskType = _companyService.CreateRiskType(new RiskType() { Name = "Test" });
            var asset = CreateAsset();
            var threat = CreateThreat();
            threat.Risks.Add(new Risk()
            {
                IsoImpact = 3,
                IsoProbability = 3,
                Type = riskType.RiskTypeId,
                Name = riskType.Name
            });
            asset.Threats.Add(threat);
            var createdAsset = _assetService.Create(asset);
            Assert.IsTrue(createdAsset.Risks.Any(r => r.Type == riskType.RiskTypeId));
            var assetRisk = createdAsset.Risks[0];
            Assert.AreEqual(3, assetRisk.IsoImpact);
            Assert.AreEqual(3, assetRisk.IsoProbability);
            Assert.AreEqual(9, assetRisk.IsoRisk);
            Assert.IsTrue(createdAsset.Threats.Count == 1);
            Assert.IsTrue(createdAsset.Threats[0].Risks.Any(r => r.Type == riskType.RiskTypeId));
            var threatRisk = createdAsset.Threats[0].Risks[0];
            Assert.IsTrue(assetRisk.Equals(threatRisk));
            _assetService.Delete(createdAsset.AssetId);
            _companyService.DeleteRiskType(riskType.RiskTypeId);
        }

        private Evaluation CreateEvaluation()
        {
            return new Evaluation()
            {
                Text = "All good",
            };
        }

        [TestMethod]
        public void RemoveThreatFromAsset()
        {
            
            var asset = CreateAsset();
            var threat = CreateThreat();
            asset.Threats.Add(threat);
            var newAsset = _assetService.Create(asset);
            Assert.AreEqual(1, newAsset.Threats.Count);
            Assert.AreEqual(threat.Name, newAsset.Threats.First().Name);
            newAsset.Threats.Clear();
            var updatedAsset = _assetService.Update(newAsset);
            Assert.AreEqual(0, updatedAsset.Threats.Count);
        }

        private Threat CreateThreat()
        {
            var threat = new Threat()
            {
                Name = new Random().Next(10000000).ToString(),
                Category = _threatCategoryService.Get(new PagedQuery(10, 1)).Items.First(),
            };
            return threat;
        }

        private CreateAsset CreateAsset()
        {
            var asset = new CreateAsset()
            {
                Name = new Random().Next(10000000).ToString(),
                Category = AssetCategory.Business,
                Description = "test",
                Enabled = true,
                RequiresBusinessContinuityPlan = false,
                SubCategory = _assetSubCategoryService.Get(new PagedQuery(10, 1)).Items.First(),
            };
            return asset;
        }

        [TestMethod]
        public void RemoveControlFromThreat()
        {
            var asset = CreateAsset();
            var threat = CreateThreat();
            var control = CreateControl();
            asset.Threats.Add(threat);
            threat.Controls.Add(control);
            var newAsset = _assetService.Create(asset);
            Assert.AreEqual(1, newAsset.Threats.Count);
            Assert.AreEqual(1, newAsset.Threats.First().Controls.Count);
            Assert.AreEqual(control.Name, newAsset.Threats.First().Controls.First().Name);
            newAsset.Threats.First().Controls.Clear();
            var updatedAsset = _assetService.Update(newAsset);
            Assert.AreEqual(1, newAsset.Threats.Count);
            Assert.AreEqual(0, updatedAsset.Threats.First().Controls.Count);
        }

        private Control CreateControl()
        {
            return new Control()
            {
                Name = new Random().Next(1000000).ToString(),
                Category = _controlCategoryService.Get(new PagedQuery(10, 1)).Items.First(),
                Enabled = true,
                Type = ControlType.Reduce,
                Status = ControlStatus.Executed,
            };
        }
    }
}
