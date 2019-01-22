using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace RAAP.Web.Client
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            AreaRegistration.RegisterAllAreas();
            RegisterRoutes(RouteTable.Routes);
            RegisterBundles(BundleTable.Bundles);
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "home_default",
                "{*everything}",
                new { controller = "Core", action = "Index", everything = UrlParameter.Optional });

        }

        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/Framework").Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/spin.min.js",
                "~/Scripts/angular-locale_nb-no.js",
                "~/Scripts/angular-ui-router.min.js",
                "~/Scripts/angular-loading.min.js",
                "~/Scripts/angular-local-storage.min.js",
                "~/Scripts/angular-material.min.js",
                "~/Scripts/angular-material-icons.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-aria.min.js",
                "~/Scripts/angular-messages.js",
                "~/Scripts/angular-resizable.min.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                "~/Scripts/v-accordion.min.js",
                "~/Scripts/bootstrap.tooltip.js",
                "~/Scripts/lodash.min.js",
                "~/Scripts/md-data-table.min.js",
                "~/Scripts/jquery-3.1.0.min.js",
                "~/Scripts/jsTree3/jstree.js",
                "~/Scripts/jsTree3/ngJsTree.min.js",
                "~/Scripts/modernizr.min.js",
                 "~/Scripts/moment.js",
                "~/Scripts/textAngular.min.js",
                "~/Scripts/d3/d3.min.js",
                "~/Scripts/d3/d3pie.min.js",
                "~/Scripts/Chart.min.js",
                "~/Scripts/angular-chart.min.js",
                "~/Scripts/ng-file-upload.min.js"));

            bundles.Add(new ScriptBundle("~/app/all-services").Include(
                "~/App/services/utils/toggleStateService.js",
                "~/App/services/httpInterceptorService.js",
                "~/App/services/authService.js",
                "~/App/services/assetService.js",
                "~/App/services/threatCategoryService.js",
                "~/App/services/assetSubCategoryService.js",
                "~/App/services/threatService.js",
                "~/App/services/reportService.js",
                "~/App/services/companyService.js",
                "~/App/services/languageService.js",
                "~/App/services/userService.js",
                "~/App/services/helpService.js",
                "~/App/services/controlService.js",
                "~/App/services/incidentService.js",
                "~/App/services/processCategoryService.js",
                "~/App/services/criticalityCategoryService.js",
                "~/App/services/controlCategoryService.js",
                "~/App/services/processService.js",
                "~/App/services/soachapterService.js",
                "~/App/services/attributeCategoryService.js",
                "~/App/services/attributeService.js",
                "~/App/services/menuService.js",
                "~/App/services/risktypeService.js"
                ));


            bundles.Add(new ScriptBundle("~/app/all-directives").Include(
                "~/App/directives/common.js",
                "~/App/directives/risk.js",
                "~/App/directives/evaluations.js",
                "~/App/directives/businesscontinuity.js",
                "~/App/directives/filters.js",
                "~/App/directives/dendogram.js"));

            bundles.Add(new ScriptBundle("~/app/all-controllers").Include(
              "~/App/controllers/assettree.js",
              "~/App/controllers/soadashboard.js",
              "~/App/controllers/dashboard.js",
              "~/App/controllers/login.js",
              "~/App/controllers/app.js",
              "~/App/controllers/menu.js",
              "~/App/controllers/header.js",
              "~/App/controllers/delete.js",
              "~/App/controllers/okcancel.js",
              "~/App/controllers/company.js",
              "~/App/controllers/user.js",
              "~/App/controllers/asset.js",
              "~/App/controllers/threatCategory.js",
              "~/App/controllers/threat.js",
              "~/App/controllers/incident.js",
              "~/App/controllers/control.js",
              "~/App/controllers/assetSubCategory.js",
              "~/App/controllers/processCategory.js",
              "~/App/controllers/criticalityCategory.js",
              "~/App/controllers/controlCategory.js",
              "~/App/controllers/help.js",
              "~/App/controllers/legalchapter.js",
              "~/App/controllers/legal.js",
              "~/App/controllers/soachapter.js",
              "~/App/controllers/soa.js", 
              "~/App/controllers/process.js",
              "~/App/controllers/attributeCategory.js",
              "~/App/controllers/attribute.js",
              "~/App/controllers/fileupload.js",
              "~/App/controllers/file.js",
              "~/App/controllers/risktype.js"));


            bundles.Add(new StyleBundle("~/Content/all-styles").Include(
                "~/Content/font-awesome.min.css",
                "~/Content/angular-material.css",
                "~/Content/bootstrap-social.css",
                "~/Content/simple-line-icons.css",
                "~/Content/md-data-table.min.css",
                "~/Content/textAngular.css",
                "~/Content/angular-resizable.min.css",
                "~/Content/v-accordion.min.css",
                "~/Content/jsTree/themes/default/style.css",
                "~/Content/jsTree/themes/default-dark/style.css",
                "~/Content/layout2.css",
                "~/Content/d3.css"));

#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
                BundleTable.EnableOptimizations = true;
#endif


        }

    }


    #region Default controllers


    public class CoreController : Controller
    {

        public ActionResult Index()
        {
            return View("../Index");
        }

    }

    #endregion
}
