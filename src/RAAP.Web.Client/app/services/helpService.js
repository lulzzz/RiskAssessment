(function () {
    "use strict";

    angular.module("raap").factory("helpService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/help";
        var helpServiceFactory = {};

        // get by slug 
        helpServiceFactory.getBySlug = function (slug, language) {
            return $http.get(serviceBase + '/GetBySlug?slug=' + slug + '&language=' + language);
        };

        // create 
        helpServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        helpServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };


        return helpServiceFactory;
    }]);

})();
