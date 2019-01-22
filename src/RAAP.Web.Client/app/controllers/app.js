

(function () {
    "use strict";


    angular.module("raap").controller('appController', appController);
    appController.$inject = ['$scope', '$location', '$timeout', 'controlService', '$loading', '$rootScope'];

    function appController($scope, $location, $timeout, controlService, $loading, $rootScope) {


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // This event is called before state is changed
            // TODO: Try to find sub controller and call exit() method?
            // We have to decide here if we should abort state change, example:
            // event.preventDefault();

            // TODO: Only show confirm message if subcontroller has exit() method?

            //var result = confirm("Are you sure you want to leave?");
            //if (!result) {
            //    event.preventDefault();
            //}

        });


     
    }




})();
