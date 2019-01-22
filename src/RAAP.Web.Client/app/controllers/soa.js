(function () {
    "use strict";

    angular.module("raap").controller('soaEditController', soaEditController);
    soaEditController.$inject = ['$scope', '$location', '$timeout', 'soachapterService', '$sce', '$loading', '$stateParams', '$uibModal', 'ngAuthSettings', 'localStorageService', '$state'];
    function soaEditController($scope, $location, $timeout, soachapterService, $sce, $loading, $stateParams, $uibModal, ngAuthSettings, localStorageService, $state) {

        var soaType = $state.current.data.soaType;

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.fileBaseUri = ngAuthSettings.apiServiceBaseUri + "api/file/GetFile?guid=";
        $scope.authData = localStorageService.get('authorizationData');

        $scope.isoCode = localStorageService.get('languageIsoCode');

        $scope.exit = function () {
            window.history.back();
        }

        $scope.message = '';
        $scope.savedSuccessfully = false;

       $scope.vm = {
           soa: {
               soaChapters: [],
               enabled: true,
           },
       };

        var startTimer = function() {
            var timer = $timeout(function() {
                $timeout.cancel(timer);
                $location.path('/app/soa/grid');
            }, 1000);
        };

        $scope.deleteLink = function(link, chapter) {
            for (var i = 0; i < chapter.soaLinks.length; i++) {
                if (chapter.soaLinks[i] === link) {
                    chapter.soaLinks.splice(i, 1);
                    break;
                }
            }
        };

        $scope.addLink = function(chapter) {
            if (chapter && chapter.newLinkName && chapter.newLinkUrl && chapter.newLinkName !== '' && chapter.newLinkUrl !== '') {
                var soaLink = {
                    name: chapter.newLinkName,
                    url: chapter.newLinkUrl
                };
                chapter.soaLinks.push(soaLink);
            }
        };

        $scope.deleteFile = function (uid, chapter) {
            $scope.message = '';
            $loading.start('key');
           
            var file = { guid: uid };
            soachapterService.deleteFile(file).then(function (response) {
                $scope.savedSuccessfully = true;
                var i = 0;
                for(i = 0; i < chapter.files.length; i++){
                    if (chapter.files[i].guid == uid) {
                        chapter.files.splice(i, 1);
                        break;
                    };
                };


                    $scope.message = $sce.trustAsHtml("File deleted.");
                $loading.finish('key');
            },
                function (response) {
                    console.log(response);
                    if (response && response.modelState) {
                        var errors = [];
                        for (var key in response.modelState) {
                            for (var i = 0; i < response.modelState[key].length; i++) {
                                errors.push(response.modelState[key][i]);
                            }
                        }
                        $scope.message = $sce.trustAsHtml("Please correct the following: <ul><li>" + errors.join('</li><li>') + "</li></ul>");
                    } else if (response && response.exceptionMessage) {
                        $scope.message = $sce.trustAsHtml("Error: " + response.exceptionMessage);
                    } else {
                        $scope.message = $sce.trustAsHtml('Unkown error - please try again!');
                    }
                    $loading.finish('key');
                });
        };
        
        $scope.save = function (exit) {
            $scope.message = '';
            $loading.start('key');
            $scope.savedSuccessfully = false;

            soachapterService.updateSoa($scope.vm.soa).then(function (response) {
                $scope.savedSuccessfully = true;
                if (exit && exit == true) {
                    $scope.message = $sce.trustAsHtml("SOA chapters was updated! Please wait while we redirect back to the index page.");
                    startTimer();
                } else {
                    $scope.message = $sce.trustAsHtml("SOA chapters was saved.");
                }
                $loading.finish('key');
                $('#mainmenu').scope().refreshTreeView();
            },
                function (response) {
                    if (response && response.modelState) {
                        var errors = [];
                        for (var key in response.modelState) {
                            for (var i = 0; i < response.modelState[key].length; i++) {
                                errors.push(response.modelState[key][i]);
                            }
                        }
                        $scope.message = $sce.trustAsHtml("Please correct the following: <ul><li>" + errors.join('</li><li>') + "</li></ul>");
                    } else if (response && response.exceptionMessage) {
                        $scope.message = $sce.trustAsHtml("Error: " + response.exceptionMessage);
                    } else {
                        $scope.message = $sce.trustAsHtml('Unkown error - please try again!');
                    }
                    $loading.finish('key');

                });
        };

        $scope.loadData = function() {
            $scope.message = '';
            $scope.savedSuccessfully = false;
            $loading.start('key');

            soachapterService.getSoa(soaType, $scope.isoCode).then(
                function(result) {
                    $scope.vm.soa = result.data;
                    $loading.finish('key');
                },
                function(response) {

                    if (response && response.exceptionMessage) {
                        $scope.message = $sce.trustAsHtml("Error: " + response.exceptionMessage);
                    } else {
                        $scope.message = $sce.trustAsHtml('Unkown error - please try again!');
                    }

                    $loading.finish('key');
                });
        };

        $scope.$on('accordion1:onReady', function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $scope.accordion1.toggle(0);
            }, 100);
        });

        $scope.$on('language-changed', function (event, args) {
            $scope.isoCode = args.isoCode;
            $scope.loadData();
        });

        $scope.loadData();

    }

    angular.module("raap").controller('soaViewController', soaViewController);
    soaViewController.$inject = ['$scope', '$location', '$timeout', 'soachapterService', '$sce', '$loading', '$stateParams', '$uibModal', 'localStorageService', '$state'];
    function soaViewController($scope, $location, $timeout, soachapterService, $sce, $loading, $stateParams, $uibModal, localStorageService, $state) {
        var soaType = $state.current.data.soaType;
        $scope.message = '';

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            soa: {
                    soaChapters: [],
                    enabled: true,
                 },
        };

        $scope.isoCode = localStorageService.get('languageIsoCode');

        $scope.loadData = function () {
            $scope.message = '';
            $loading.start('key');

            soachapterService.get(soaType, $scope.isoCode).then(
                function (result) {
                    $scope.vm.soa = result.data;
                    $loading.finish('key');
                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.message = $sce.trustAsHtml("Error: " + response.exceptionMessage);
                    } else {
                        $scope.message = $sce.trustAsHtml('Unkown error - please try again!');
                    }

                    $loading.finish('key');
                });
        };

        $scope.edit = function () {
            $location.path('/app/soa/edit/');
        };

        $scope.$on('language-changed', function (event, args) {
            $scope.isoCode = args.isoCode;
            $scope.loadData();
        });

        $scope.loadData();

    }




})();

