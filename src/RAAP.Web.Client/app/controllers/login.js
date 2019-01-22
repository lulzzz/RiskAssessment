(function () {
    "use strict";

    angular.module("raap").controller('loginController', loginController);
    loginController.$inject = ['$scope', '$location', 'authService', 'ngAuthSettings', '$loading'];
    function loginController($scope, $location, authService, ngAuthSettings, $loading) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            userName: "",
            password: "",
        };

        $scope.login = function () {

            $loading.start('key');
            $scope.alerts = [];

            authService.login($scope.vm).then(function (response) {
                $loading.finish('key');
                $location.path('/snowball/grid');

            },
             function (err) {
                 if (err && err.error_description) {
                     $scope.alerts.push({ type: 'danger', msg:  err.error_description });
                 } else {
                     $scope.alerts.push({ type: 'danger', msg: 'Det oppsto en ukjent feil. Vennligst prøv igjen.' });
                 }
                 $loading.finish('key');

             });
        };


    }

    angular.module("raap").controller('lostPasswordController', lostPasswordController);
    lostPasswordController.$inject = ['$scope', '$location', 'authService', 'ngAuthSettings', '$loading'];
    function lostPasswordController($scope, $location, authService, ngAuthSettings, $loading) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            userName: "",
        };

        $scope.recoverPassword = function () {

            $loading.start('key');
            $scope.alerts = [];
   
            authService.recoverPassword($scope.vm).then(function (response) {
                    $loading.finish('key');
                    $scope.alerts.push({ type: 'success', msg: 'Please check your email for further instructions to recover your password.'});

                },
                function (err) {
                    if (err && err.error_description) {
                        $scope.alerts.push({ type: 'danger', msg: err.error_description });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Det oppsto en ukjent feil. Vennligst prøv igjen.' });
                    }
                    $loading.finish('key');

                });
        };


    }


    angular.module("raap").controller('changePasswordController', changePasswordController);
    changePasswordController.$inject = ['$scope', '$location', 'authService', 'ngAuthSettings', '$loading', '$stateParams'];
    function changePasswordController($scope, $location, authService, ngAuthSettings, $loading, $stateParams) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            id: $stateParams.id,
            newPassword: "",
            newPasswordRepeat: "testtest"
    };

        $scope.changePassword = function () {
            $scope.alerts = [];

            if (!$scope.vm.id || $scope.vm.id.length < 4) {
                $scope.alerts.push({ type: 'danger', msg: 'Invalid recovery token!' });
                return;
            }

            if (!$scope.vm.newPassword || $scope.vm.newPassword.length < 4) {
                $scope.alerts.push({ type: 'danger', msg: 'Please enter your new password' });
                return;
            }
            if (!$scope.vm.newPasswordRepeat || $scope.vm.newPasswordRepeat.length < 4) {
                $scope.alerts.push({ type: 'danger', msg: 'Please repeat your new password' });
                return;
            }

            $loading.start('key');
           

            authService.changePassword($scope.vm).then(function (response) {
                $loading.finish('key');
                $scope.alerts.push({ type: 'success', msg: 'Password is updated! Please login with your username and password to continue.' });

            },
                function (err) {
                   
                    if (err && err.data && err.data.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: err.data.exceptionMessage });
                    }
                    else if (err && err.data && err.data.message) {
                        $scope.alerts.push({ type: 'danger', msg: err.data.message });
                    }
                    else {
                        $scope.alerts.push({ type: 'danger', msg: 'Det oppsto en ukjent feil. Vennligst prøv igjen.' });
                    }
                    $loading.finish('key');

                });
        };


    }

})();

