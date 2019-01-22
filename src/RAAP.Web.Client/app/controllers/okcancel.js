(function () {
    "use strict";

    angular.module("raap").controller('okCancelController', okCancelController);
    okCancelController.$inject = ['$scope', '$mdDialog'];
    function okCancelController($scope, $mdDialog) {


        $scope.ok = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel('cancel');
        }
    }


})();

