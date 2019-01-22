(function () {
    "use strict";

    angular.module("raap").controller('legalchapterEditController', legalchapterEditController);
    legalchapterEditController.$inject = ['$scope', '$location', '$timeout', 'soachapterService','$sce', '$loading', '$stateParams', '$uibModal', 'localStorageService'];
    function legalchapterEditController($scope, $location, $timeout, soachapterService, $sce, $loading, $stateParams, $uibModal, localStorageService) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.isoCode = localStorageService.get('languageIsoCode');

        $scope.exit = function () {
            window.history.back();
        }

        $scope.message = '';
        $scope.savedSuccessfully = false;

       $scope.vm = {
            chapters: [],
        };

        var startTimer = function() {
            var timer = $timeout(function() {
                $timeout.cancel(timer);
                $location.path('/app/legalchapter/grid');
            }, 1000);
        };
        
        $scope.save = function (exit) {
            $scope.message = '';
            $loading.start('key');
            $scope.savedSuccessfully = false;

            soachapterService.update($scope.vm.chapters).then(function (response) {
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

            soachapterService.get(2, $scope.isoCode).then(
                function(result) {
                    $scope.vm.chapters = result.data;
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

        $scope.addChapter = function (parentChapter) {
            var chapter = {
                id : -1,
                name: "",
                description: "",
                goal: "",
                subChapters: [],
                soaType: 2,
            };
            if (parentChapter == null)
               $scope.vm.chapters.push(chapter);
            else
                parentChapter.subChapters.push(chapter);
        };

        $scope.deleteChapter = function (chapter, parentChapter) {
            if (parentChapter == null) {
                var index = $scope.vm.chapters.indexOf(chapter);
                if (index > -1)
                    $scope.vm.chapters.splice(index, 1);
            } else {
                var index = parentChapter.subChapters.indexOf(chapter);
                if (index > -1)
                    parentChapter.subChapters.splice(index, 1);
            };
        }

        $scope.save = function (exit) {
            $scope.message = "";
            $loading.start('key');
            $scope.savedSuccessfully = false;

            soachapterService.update($scope.vm.chapters).then(function (response) {
                $scope.savedSuccessfully = true;
                if (exit && exit == true) {
                    $scope.message = $sce.trustAsHtml("SoA was saved. Please wait while we redirect back to the index page.");
                    startTimer();
                } else {
                    $scope.message = $sce.trustAsHtml("SoA was saved.");
                }
                $loading.finish('key');
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

        $scope.$on('language-changed', function (event, args) {
            $scope.isoCode = args.isoCode;
            $scope.loadData();
        });

        $scope.loadData();

    }

    angular.module("raap").controller('legalchapterViewController', legalchapterViewController);
    legalchapterViewController.$inject = ['$scope', '$location', '$timeout', 'soachapterService', '$sce', '$loading', '$stateParams', '$uibModal', 'localStorageService'];
    function legalchapterViewController($scope, $location, $timeout, soachapterService, $sce, $loading, $stateParams, $uibModal, localStorageService) {
        $scope.message = '';

        $scope.isoCode = localStorageService.get('languageIsoCode');

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            chapters: [],
        };

        $scope.loadData = function () {
            $scope.message = '';
            $loading.start('key');

            soachapterService.get(2, $scope.isoCode).then(
                function (result) {
                    $scope.vm.chapters = result.data;
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
            $location.path('/app/legalchapter/edit/');
        };

        $scope.$on('language-changed', function (event, args) {
            $scope.isoCode = args.isoCode;
            $scope.loadData();
        });

        $scope.loadData();

    }




})();

