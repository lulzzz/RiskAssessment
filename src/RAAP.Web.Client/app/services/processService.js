(function () {
    "use strict";

    angular.module("raap").factory("processService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/process";
        var processServiceFactory = {};

        // get all 
        processServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc) {
            return $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc);
        };

        // get single 
        processServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/' + id);
        };

        // create 
        processServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        processServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        processServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/' + id);
        };

        // search 
        processServiceFactory.search = function (query) {
            return $http.get(serviceBase + '/search?query=' + query);
        };


        return processServiceFactory;
    }]);

})();
