(function () {
    "use strict";

    angular.module("raap").factory("threatService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/threat";
        var threatServiceFactory = {};

        // get all 
        threatServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc, excludeIds) {
            var excludeIdsValue = "";
            if (excludeIds && excludeIds.length > 0) {
                for (var i = 0; i < excludeIds.length; i++) {
                    excludeIdsValue = excludeIdsValue + "&excludeIds=" + excludeIds[i];
                }
            }
            return $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc +  excludeIdsValue);
        };

        // get single 
        threatServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/' + id);
        };

        // create 
        threatServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        threatServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        threatServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/' + id);
        };

        // search 
        threatServiceFactory.search = function (query) {
            return $http.get(serviceBase + '/search?query=' + query);
        };


        threatServiceFactory.getColorValue = function (input) {

            if (input.impact == 5 && input.probability >= 3)
                return "red";
            if (input.impact == 4 && input.probability >= 4)
                return "red";
            if (input.impact == 3 && input.probability == 5)
                return "red";

            if (input.impact == 1 && input.probability <= 3)
                return "green";
            if (input.impact == 2 && input.probability <= 2)
                return "green";
            if (input.impact == 3 && input.probability == 1)
                return "green";

            if (input.impact == 0 && input.probability == 0)
                return "green";

            return "yellow";

        };

        return threatServiceFactory;
    }]);

})();
