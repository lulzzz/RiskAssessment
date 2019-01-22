(function () {
    "use strict";

    angular.module("raap").factory("controlService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/control";
        var controlServiceFactory = {};

        // get all 
        controlServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc, excludeIds) {
            var excludeIdsValue = "";
            if (excludeIds && excludeIds.length > 0) {
                for (var i = 0; i < excludeIds.length; i++) {
                    excludeIdsValue = excludeIdsValue + "&excludeIds=" + excludeIds[i];
                }
            }
            return $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc + excludeIdsValue);
        };

        // get single 
        controlServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/' + id);
        };

        // create 
        controlServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        controlServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        controlServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/' + id);
        };

        // search 
        controlServiceFactory.search = function (query) {
            return $http.get(serviceBase + '/search?query=' + query);
        };


        return controlServiceFactory;
    }]);

})();
