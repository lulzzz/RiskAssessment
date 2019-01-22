(function () {
    "use strict";

    angular.module('raap').controller('headerController', headerController);
    headerController.$inject = ['$scope', '$location', 'authService', '$mdDialog', '$state', '$mdSidenav', 'languageService'];
    function headerController($scope, $location, authService, $mdDialog, $state, $mdSidenav, languageService) {

        $scope.languages = [];
        $scope.languageIsoCode = null;


        $scope.loadLanguages = function () {

            languageService.getLanguages().then(
               function (result) {
                   $scope.languages = result.data;
                  
                   // get user language
                   $scope.languageIsoCode = languageService.getUserLanguage();

                   $scope.$watch('languageIsoCode', function () {
                       // store user language
                       languageService.setUserLanguage($scope.languageIsoCode);
                   });

               },
               function (response) {
                   console.log("unable to load languages from database");
               });
        }
        

        $scope.loadLanguages();


        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.logOut = function () {
            authService.logOut();
            $location.path('/login');
        };

        $scope.authentication = authService.authentication;

        $scope.myPage = function () {
            $location.path('/app/user/mypage');
        };

        $scope.viewHelp = function()
        {
            var slug = $state.current.name;

            $mdDialog.show({
                controller: 'viewHelpController',
                templateUrl: 'app/views/help/helpModal.html',
                parent: angular.element(document.body),
                locals: { slug: slug },
                clickOutsideToClose: true,
                fullscreen: true
            })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

        }

    }


})();


