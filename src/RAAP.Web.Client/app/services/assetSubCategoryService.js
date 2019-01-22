(function () {
    "use strict";

    angular.module("raap").factory("assetSubCategoryService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/assetsubcategory";
        var assetSubCategoryServiceFactory = {};

        // get all 
        assetSubCategoryServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc) {
            return $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc);
        };

        // get single 
        assetSubCategoryServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/' + id);
        };

        // create 
        assetSubCategoryServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        assetSubCategoryServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        assetSubCategoryServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/' + id);
        };

        // search 
        assetSubCategoryServiceFactory.search = function (query) {
            return $http.get(serviceBase + '/search?query=' + query);
        };


        return assetSubCategoryServiceFactory;
    }]);

})();
