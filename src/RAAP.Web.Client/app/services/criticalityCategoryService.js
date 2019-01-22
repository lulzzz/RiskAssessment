(function () {
    "use strict";

    angular.module("raap").factory("criticalityCategoryService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/criticalitycategory";
        var criticalityCategoryServiceFactory = {};

        // get all 
        criticalityCategoryServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc) {
            return $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc);
        };

        // get single 
        criticalityCategoryServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/' + id);
        };

        // create 
        criticalityCategoryServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        criticalityCategoryServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        criticalityCategoryServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/' + id);
        };

        // search 
        criticalityCategoryServiceFactory.search = function (query) {
            return $http.get(serviceBase + '/search?query=' + query);
        };


        return criticalityCategoryServiceFactory;
    }]);

})();
