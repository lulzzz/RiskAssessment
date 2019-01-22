(function () {
    "use strict";

    angular.module("raap").factory("userService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/user";
        var userServiceFactory = {};
        var companies = {};

        // get all 
        userServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc, companyId, force) {
            if (!companyId)
                companyId = 1;
            if (companies[companyId] == null || force) {
                companies[companyId] = $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc + '&companyId=' + companyId);
            }
            return companies[companyId];
        };

        // get single 
        userServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/' + id);
        };

        // is username available
        userServiceFactory.isUsernameAvailable = function (username) {
            return $http.get(serviceBase + '/IsUsernameAvailable?Username=' + username);
        };

        // is email available
        userServiceFactory.isEmailAvailable = function (email) {
            return $http.get(serviceBase + '/IsEmailAvailable?Email=' + email);
        };
        
        // create 
        userServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // set password
        userServiceFactory.setPassword = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase + '/SetPassword', model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update password
        userServiceFactory.updatePassword = function (model) {
            var deferred = $q.defer();

            $http.post(ngAuthSettings.apiServiceBaseUri + "api/account" + '/ChangePassword', model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };


        // update 
        userServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        userServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/' + id);
        };

        // search 
        userServiceFactory.search = function (query) {
            return $http.get(serviceBase + '/search?query=' + query);
        };



        return userServiceFactory;
    }]);

})();
