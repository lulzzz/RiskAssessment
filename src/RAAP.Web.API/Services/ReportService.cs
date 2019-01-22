using System;
using System.Collections.Generic;
using System.Linq;
using RAAP.Contracts.Dashboard;
using RAAP.Database;

namespace RAAP.Web.API.Services
{
    public class ReportService : ServiceBase
    {
        public ReportService(UserService userService) : base(userService)
        {
        }

        public DashboardReport GetDashboardReport()
        {
            var report = new DashboardReport
            {
                GeneratedDate = DateTime.Now,
                AssetsByCategoryData = new List<int>(),
                AssetsByCategoryLabels = new List<string>(),
                ThreatsByCategoryData = new List<int>(),
                ThreatsByCategoryLabels = new List<string>(),
                ProcessesByCategoryData = new List<int>(),
                ProcessesByCategoryLabels = new List<string>()
            };

            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var allAssets = db.Assets.Include("AssetSubCategory").ToArray();

                // assets by category
                var assetsByCategory = allAssets.GroupBy(a => a.AssetSubCategory.Name).ToArray();
                report.AssetsByCategoryLabels = assetsByCategory.Select(a => a.Key).ToList();
                report.AssetsByCategoryData = assetsByCategory.Select(a => a.Count()).ToList();


                var allProcesses = db.Processes.Include("ProcessCategory").ToArray();

                // processes by category
                var processesByCategory = allProcesses.GroupBy(a => a.ProcessCategory.Name).ToArray();
                report.ProcessesByCategoryLabels = processesByCategory.Select(a => a.Key).ToList();
                report.ProcessesByCategoryData = processesByCategory.Select(a => a.Count()).ToList();

                var allThreats = db.Threats.Include("ThreatCategory").ToArray();

                // threats by category
                var threatsByCategory = allThreats.GroupBy(a => a.ThreatCategory.Name).ToArray();
                report.ThreatsByCategoryLabels = threatsByCategory.Select(a => a.Key).ToList();
                report.ThreatsByCategoryData = threatsByCategory.Select(a => a.Count()).ToList();


            }



            return report;
        }

    }
}