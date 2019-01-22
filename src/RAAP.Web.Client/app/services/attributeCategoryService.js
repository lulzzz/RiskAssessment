(function () {
    "use strict";

    angular.module("raap").factory("attributeCategoryService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/attributecategory";
        var attributeCategoryServiceFactory = {};

        // get all 
        attributeCategoryServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc, attributeTypeId) {
            console.log('sdsadasdsad' + attributeTypeId);
            return $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc + '&attributeTypeId=' + attributeTypeId);
        };

        // get single 
        attributeCategoryServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/' + id);
        };

        // create 
        attributeCategoryServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        attributeCategoryServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        attributeCategoryServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/' + id);
        };

        // search 
        attributeCategoryServiceFactory.search = function (query, attributeTypeId) {
            return $http.get(serviceBase + '/search?query=' + query + '&attributeTypeId=' + attributeTypeId);
        };


        return attributeCategoryServiceFactory;
    }]);

})();
