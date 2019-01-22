(function () {
    "use strict";

    angular.module("raap").controller('deleteController', deleteController);
    deleteController.$inject = ['$scope', '$mdDialog'];
    function deleteController($scope, $mdDialog) {

        $scope.ok = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel('cancel');
        }
    }


})();

