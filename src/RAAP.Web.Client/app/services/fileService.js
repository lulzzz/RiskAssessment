(function () {
    "use strict";

    angular.module("raap").factory("fileService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/file";
        var fileServiceFactory = {};

        // get templates
        fileServiceFactory.getTemplates = function () {
            return $http.get(serviceBase + '/GetTemplates');
        };

        // create template
        fileServiceFactory.createTemplate = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase + '/CreateTemplate', model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update template
        fileServiceFactory.updateTemplate = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase + '/UpdateTemplate', model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        return fileServiceFactory;
    }]);

})();
