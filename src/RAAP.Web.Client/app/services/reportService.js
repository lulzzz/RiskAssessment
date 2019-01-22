(function () {
    "use strict";

    angular.module("raap").factory("reportService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/report";
        var serviceFactory = {};

        // GetDashboardReport 
        serviceFactory.getDashboardReport = function () {
            return $http.get(serviceBase + '/GetDashboardReport');
        };


        return serviceFactory;
    }]);

})();
