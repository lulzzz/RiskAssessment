
angular.module('raap', [
        'ngMaterial',
        'ngMessages',
        'ngCookies',
        'ngMdIcons',
        'ui.router',
        'ui.bootstrap',
        'angularResizable',
        'LocalStorageModule',
        'darthwade.loading',
        'ngJsTree',
        'md.data.table',
        'textAngular',
        'vAccordion',
        'raapFilters',
        'ngFileUpload',
        'chart.js'
])
    .config([
        '$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true).hashPrefix('!');
        }
    ])
    .config([
        '$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpInterceptorService');
        }
    ])

    .config([
        '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            // default state
            $urlRouterProvider.otherwise("/app/dashboard");

            // set up the states
            $stateProvider
                // Authed states
                .state('app', {url: '/app', abstract: true, templateUrl: 'app/views/shared/main-layout.html?v=' + buildVersion })
                .state('app.dashboard', { url: '/dashboard', templateUrl: 'app/views/dashboard.html?v=' + buildVersion, controller: 'dashboardController', data: { variabel: 'en-verdi' } })
                .state('app.assettree', { url: '/assettree', templateUrl: 'app/views/dashboard/assettree.html?v=' + buildVersion, controller: 'assettreeController', data: { variabel: 'en-verdi' } })
                .state('app.soadashboard', { url: '/soadashboard', templateUrl: 'app/views/dashboard/soadashboard.html?v=' + buildVersion, controller: 'soaDashboardController', data: { variabel: 'en-verdi' } })
                // Company
                .state('app.companygrid', { url: '/company/grid', templateUrl: 'app/views/companies/grid.html?v=' + buildVersion, controller: 'companyController' })
                .state('app.companycreate', { url: '/company/create', templateUrl: 'app/views/companies/save.html?v=' + buildVersion, controller: 'companyCreateController' })
                .state('app.companyedit', { url: '/company/edit/:id', templateUrl: 'app/views/companies/save.html?v=' + buildVersion, controller: 'companyEditController' })
                .state('app.companyview', { url: '/company/view/:id', templateUrl: 'app/views/companies/view.html?v=' + buildVersion, controller: 'companyViewController' })
                // User
                .state('app.usergrid', { url: '/user/grid', templateUrl: 'app/views/users/grid.html?v=' + buildVersion, controller: 'userController' })
                .state('app.usercreate', { url: '/user/create/:id', templateUrl: 'app/views/users/save.html?v=' + buildVersion, controller: 'userCreateController' })
                .state('app.useredit', { url: '/user/edit/:id', templateUrl: 'app/views/users/save.html?v=' + buildVersion, controller: 'userEditController' })
                .state('app.usermypage', { url: '/user/mypage', templateUrl: 'app/views/users/mypage.html?v=' + buildVersion, controller: 'userMyPageController' })
                // Asset
                .state('app.assetgrid', { url: '/asset/grid', templateUrl: 'app/views/assets/grid.html?v=' + buildVersion, controller: 'assetController' })
                .state('app.assetgrid/category', { url: '/asset/grid/:categoryId', templateUrl: 'app/views/assets/grid.html?v=' + buildVersion, controller: 'assetController' })
                .state('app.assetcreate', { url: '/asset/create/:categoryId', templateUrl: 'app/views/assets/save.html?v=' + buildVersion, controller: 'assetCreateController' })
                .state('app.assetedit', { url: '/asset/edit/:id', templateUrl: 'app/views/assets/save.html?v=' + buildVersion, controller: 'assetEditController' })
                .state('app.assetview', { url: '/asset/view/:processid/:assetid', templateUrl: 'app/views/assets/view.html?v=' + buildVersion, controller: 'assetViewController' })
                // Threat
                .state('app.threatgrid', { url: '/threat/grid', templateUrl: 'app/views/threats/grid.html?v=' + buildVersion, controller: 'threatController' })
                .state('app.threatcreate', { url: '/threat/create', templateUrl: 'app/views/threats/save.html?v=' + buildVersion, controller: 'threatCreateController' })
                .state('app.threatedit', { url: '/threat/edit/:id', templateUrl: 'app/views/threats/save.html?v=' + buildVersion, controller: 'threatEditController' })
                .state('app.threatview', { url: '/threat/view/:assetid/:threatid', templateUrl: 'app/views/threats/view.html?v=' + buildVersion, controller: 'threatViewController' })
                .state('app.threatedittree', { url: '/threat/edittree/:assetid/:threatid', templateUrl: 'app/views/threats/save.html?v=' + buildVersion, controller: 'threatTreeEditController' })
                // Threatcategory
                .state('app.threatcategorygrid', { url: '/threatcategory/grid', templateUrl: 'app/views/common_categories/grid.html?v=' + buildVersion, controller: 'threatCategoryController' })
                .state('app.threatcategorycreate', { url: '/threatcategory/create', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'threatCategoryCreateController' })
                .state('app.threatcategoryedit', { url: '/threatcategory/edit/:id', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'threatCategoryEditController' })
                // Assetcategory
                .state('app.assetsubcategorygrid', { url: '/assetsubcategory/grid', templateUrl: 'app/views/common_categories/grid.html?v=' + buildVersion, controller: 'assetSubCategoryController' })
                .state('app.assetsubcategorycreate', { url: '/assetsubcategory/create', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'assetSubCategoryCreateController' })
                .state('app.assetsubcategoryedit', { url: '/assetsubcategory/edit/:id', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'assetSubCategoryEditController' })
                // Process
                .state('app.processgrid', { url: '/process/grid', templateUrl: 'app/views/processes/grid.html?v=' + buildVersion, controller: 'processController' })
                .state('app.processcreate', { url: '/process/create', templateUrl: 'app/views/processes/save.html?v=' + buildVersion, controller: 'processCreateController' })
                .state('app.processedit', { url: '/process/edit/:id', templateUrl: 'app/views/processes/save.html?v=' + buildVersion, controller: 'processEditController' })
                .state('app.processview', { url: '/process/view/:id', templateUrl: 'app/views/processes/view.html?v=' + buildVersion, controller: 'processViewController' })
                // Incident
                .state('app.incidentgrid', { url: '/incident/grid', templateUrl: 'app/views/incidents/grid.html?v=' + buildVersion, controller: 'incidentController' })
                .state('app.incidentcreate', { url: '/incident/create', templateUrl: 'app/views/incidents/create.html?v=' + buildVersion, controller: 'incidentCreateController' })
                .state('app.incidentedit', { url: '/incident/edit/:id', templateUrl: 'app/views/incidents/edit.html?v=' + buildVersion, controller: 'incidentEditController' })
                // Processcategory
                .state('app.processcategorygrid', { url: '/processcategory/grid', templateUrl: 'app/views/common_categories/grid.html?v=' + buildVersion, controller: 'processCategoryController' })
                .state('app.processcategorycreate', { url: '/processcategory/create', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'processCategoryCreateController' })
                .state('app.processcategoryedit', { url: '/processcategory/edit/:id', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'processCategoryEditController' })
                // Criticalitycategory
                .state('app.criticalitycategorygrid', { url: '/criticalitycategory/grid', templateUrl: 'app/views/common_categories/grid.html?v=' + buildVersion, controller: 'criticalityCategoryController' })
                .state('app.criticalitycategorycreate', { url: '/criticalitycategory/create', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'criticalityCategoryCreateController' })
                .state('app.criticalitycategoryedit', { url: '/criticalitycategory/edit/:id', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'criticalityCategoryEditController' })
                // Control
                .state('app.controlgrid', { url: '/control/grid', templateUrl: 'app/views/controls/grid.html?v=' + buildVersion, controller: 'controlController' })
                .state('app.controlcreate', { url: '/control/create', templateUrl: 'app/views/controls/save.html?v=' + buildVersion, controller: 'controlCreateController' })
                .state('app.controledit', { url: '/control/edit/:id', templateUrl: 'app/views/controls/save.html?v=' + buildVersion, controller: 'controlEditController' })
                .state('app.controlview', { url: '/control/view/:assetid/:threatid/:controlid', templateUrl: 'app/views/controls/view.html?v=' + buildVersion, controller: 'controlViewController' })
                .state('app.controledittree', { url: '/control/edittree/:assetid/:threatid/:controlid', templateUrl: 'app/views/controls/save.html?v=' + buildVersion, controller: 'controlTreeEditController' })
                // Controlcategory
                .state('app.controlcategorygrid', { url: '/controlcategory/grid', templateUrl: 'app/views/common_categories/grid.html?v=' + buildVersion, controller: 'controlCategoryController' })
                .state('app.controlcategorycreate', { url: '/controlcategory/create', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'controlCategoryCreateController' })
                .state('app.controlcategoryedit', { url: '/controlcategory/edit/:id', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'controlCategoryEditController' })
                 // Cause category
                .state('app.causecategorygrid', { url: '/causecategory/grid', templateUrl: 'app/views/common_categories/grid.html?v=' + buildVersion, controller: 'attributeCategoryController', data: { attributeTypeId: 'Cause', nameprefix: 'Cause', urlprefix: 'causecategory' } })
                .state('app.causecategorycreate', { url: '/causecategory/create', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'attributeCategoryCreateController', data: { attributeTypeId: 'Cause', nameprefix: 'Cause', urlprefix: 'causecategory' } })
                .state('app.causecategoryedit', { url: '/causecategory/edit/:id', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'attributeCategoryEditController', data: { attributeTypeId: 'Cause', nameprefix: 'Cause', urlprefix: 'causecategory' } })
                // Origin of Treat category
                .state('app.originofthreatcategorygrid', { url: '/originofthreatcategory/grid', templateUrl: 'app/views/common_categories/grid.html?v=' + buildVersion, controller: 'attributeCategoryController', data: { attributeTypeId: 'OriginOfThreat', nameprefix: 'Origin of Threat', urlprefix: 'originofthreatcategory' } })
                .state('app.originofthreatcategorycreate', { url: '/originofthreatcategory/create', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'attributeCategoryCreateController', data: { attributeTypeId: 'OriginOfThreat', nameprefix: 'Origin of Threat', urlprefix: 'originofthreatcategory' } })
                .state('app.originofthreatcategoryedit', { url: '/originofthreatcategory/edit/:id', templateUrl: 'app/views/common_categories/save.html?v=' + buildVersion, controller: 'attributeCategoryEditController', data: { attributeTypeId: 'OriginOfThreat', nameprefix: 'Origin of Threat', urlprefix: 'originofthreatcategory' } })
                // Origin of Treat
                .state('app.originofthreatgrid', { url: '/originofthreat/grid', templateUrl: 'app/views/common_attributes/grid.html?v=' + buildVersion, controller: 'attributeController', data: { attributeTypeId: 'OriginOfThreat', nameprefix: 'Origin of Threat', urlprefix: 'originofthreat' } })
                .state('app.originofthreatcreate', { url: '/originofthreat/create', templateUrl: 'app/views/common_attributes/save.html?v=' + buildVersion, controller: 'attributeCreateController', data: { attributeTypeId: 'OriginOfThreat', nameprefix: 'Origin of Threat', urlprefix: 'originofthreat' } })
                .state('app.originofthreatedit', { url: '/originofthreat/edit/:id', templateUrl: 'app/views/common_attributes/save.html?v=' + buildVersion, controller: 'attributeEditController', data: { attributeTypeId: 'OriginOfThreat', nameprefix: 'Origin of Threat', urlprefix: 'originofthreat' } })
                // Causes
                .state('app.causegrid', { url: '/cause/grid', templateUrl: 'app/views/common_attributes/grid.html?v=' + buildVersion, controller: 'attributeController', data: { attributeTypeId: 'Cause', nameprefix: 'Causes', urlprefix: 'cause' } })
                .state('app.causecreate', { url: '/cause/create', templateUrl: 'app/views/common_attributes/save.html?v=' + buildVersion, controller: 'attributeCreateController', data: { attributeTypeId: 'Cause', nameprefix: 'Causes', urlprefix: 'cause' } })
                .state('app.causeedit', { url: '/cause/edit/:id', templateUrl: 'app/views/common_attributes/save.html?v=' + buildVersion, controller: 'attributeEditController', data: { attributeTypeId: 'Cause', nameprefix: 'Causes', urlprefix: 'cause' } })
                // Frontend pages
                .state('login', { url: '/login', templateUrl: 'app/views/user/login.html?v=' + buildVersion, controller: 'loginController' })
                .state('lostpassword', { url: '/lostpassword', templateUrl: 'app/views/user/lostpassword.html?v=' + buildVersion, controller: 'lostPasswordController' })
                .state('changepassword', { url: '/changepassword/:id', templateUrl: 'app/views/user/changepassword.html?v=' + buildVersion, controller: 'changePasswordController' })
                .state('app.soachapteredit', { url: '/soachapter/edit', templateUrl: 'app/views/soachapters/edit.html?v=' + buildVersion, controller: 'soachapterEditController', data: { soaType: 1 } })
                .state('app.helsesoachapteredit', { url: '/helsesoachapter/edit', templateUrl: 'app/views/soachapters/edit.html?v=' + buildVersion, controller: 'soachapterEditController', data: { soaType: 4 } })
                .state('app.gdprsoachapteredit', { url: '/gdprsoachapter/edit', templateUrl: 'app/views/soachapters/edit.html?v=' + buildVersion, controller: 'soachapterEditController', data: { soaType: 5 } })
                .state('app.soaedit', { url: '/soa/edit', templateUrl: 'app/views/soa/edit.html?v=' + buildVersion, controller: 'soaEditController', data: { soaType: 1 } })
                .state('app.helsesoaedit', { url: '/soa/helsesoaedit', templateUrl: 'app/views/soa/edit.html?v=' + buildVersion, controller: 'soaEditController', data: { soaType: 4 } })
                .state('app.gdpredit', { url: '/soa/gdpredit', templateUrl: 'app/views/soa/edit.html?v=' + buildVersion, controller: 'soaEditController', data: { soaType: 5 } })
                .state('app.legalchapteredit', { url: '/legalchapter/edit', templateUrl: 'app/views/legalchapters/edit.html?v=' + buildVersion, controller: 'legalchapterEditController' })
                .state('app.legaledit', { url: '/legal/edit', templateUrl: 'app/views/legal/edit.html?v=' + buildVersion, controller: 'legalEditController' })
                .state('app.fileedit', { url: '/file/edit', templateUrl: 'app/views/file/edit.html?v=' + buildVersion, controller: 'filetemplateEditController', data: { master: false} })
                .state('app.filetemplateedit', { url: '/file/templateedit', templateUrl: 'app/views/file/templateedit.html?v=' + buildVersion, controller: 'filetemplateEditController', data: { master: true } })
                // RiskTypes
                .state('app.risktypegrid', { url: '/risktype/grid', templateUrl: 'app/views/risktypes/grid.html?v=' + buildVersion, controller: 'risktypeController'})
                .state('app.risktypecreate', { url: '/risktype/create', templateUrl: 'app/views/risktypes/save.html?v=' + buildVersion, controller: 'risktypeCreateController'})
                .state('app.risktypeedit', { url: '/risktype/edit/:id', templateUrl: 'app/views/risktypes/save.html?v=' + buildVersion, controller: 'risktypeEditController'})
            ;
        }
    ])
    .constant('ngAuthSettings', {
        apiServiceBaseUri: 'http://raap.dev.no/WebAPI/',
        webBaseUri: 'http://raap.dev.no/WebClient/',
        clientId: 'ngAuthApp',
        internalAuthenticationProviderName: 'RAAPAuthProvider'
    })
    .value('runningInModal', false)
    .value('runningInModalChild', false)

    .config(['$httpProvider', function($httpProvider) {
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};    
        }    
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }])

    .config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {
            return date ? moment(date).format('YYYY-MM-DD') : '';
        };
  
        $mdDateLocaleProvider.parseDate = function (dateString) {
            Console.log("parsing!?");
            var m = moment(dateString, 'YYYY-MM-DD', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
    })
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.transformResponse.push(function(responseData){
            convertDateStringsToDates(responseData);
            return responseData;
        });
    }])

    .run(['authService', '$rootScope', '$location', function (authService, $rootScope, $location) {
        authService.fillAuthData();
    }])
    //take all whitespace out of string
    .filter('nospace', function () {
        return function (value) {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    })
    //replace uppercase to regular case
    .filter('humanizeDoc', function () {
        return function (doc) {
            if (!doc) return;
            if (doc.type === 'directive') {
                return doc.name.replace(/([A-Z])/g, function ($1) {
                    return '-' + $1.toLowerCase();
                });
            }

            return doc.label || doc.name;
        };
    });



var regexIso8601 = /((((19|20)([2468][048]|[13579][26]|0[48])|2000)-02-29|((19|20)[0-9]{2}-(0[4678]|1[02])-(0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}-(0[1359]|11)-(0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}-02-(0[1-9]|1[0-9]|2[0-8])))[T]([01][0-9]|2[0-3]):([012345][0-9]):([012345][0-9]))/;

function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0])
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
    }
}
