(function () {
    "use strict";

    angular.module("raap").factory("attributeService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/attribute";
        var attributeServiceFactory = {};

        var monthEnum = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 4,
            May: 8,
            Jun: 16,
            Jul: 32,
            Aug: 64,
            Sep: 128,
            Oct: 256,
            Nov: 512,
            Dec: 1024
        };


        // month enum
        attributeServiceFactory.monthEnum = monthEnum;

        // get all 
        attributeServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc, attributeTypeId, excludeIds) {
            var excludeIdsValue = "";
            if (excludeIds && excludeIds.length > 0) {
                for (var i = 0; i < excludeIds.length; i++) {
                    excludeIdsValue = excludeIdsValue + "&excludeIds=" + excludeIds[i];
                }
            }

            return $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc + '&attributeTypeId=' + attributeTypeId + excludeIdsValue);
        };

        // get all childs
        attributeServiceFactory.getAllChilds = function (pageSize, page, orderByKey, isDesc, attributeTypeId, excludeIds) {
            var excludeIdsValue = "";
            if (excludeIds && excludeIds.length > 0) {
                for (var i = 0; i < excludeIds.length; i++) {
                    excludeIdsValue = excludeIdsValue + "&excludeIds=" + excludeIds[i];
                }
            }

            return $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc + '&attributeTypeId=' + attributeTypeId + excludeIdsValue);
        };


        // get single 
        attributeServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/' + id);
        };

        // create 
        attributeServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        attributeServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        attributeServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/' + id);
        };

        // search 
        attributeServiceFactory.search = function (query, attributeTypeId) {
            return $http.get(serviceBase + '/search?query=' + query + '&attributeTypeId=' + attributeTypeId);
        };


        return attributeServiceFactory;
    }]);

})();
