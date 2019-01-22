(function () {
    "use strict";

    angular.module("raap").controller('filetemplateEditController', filetemplateEditController);
    filetemplateEditController.$inject = ['$scope', '$location', '$timeout', 'soachapterService', '$sce', '$loading', '$stateParams', '$uibModal', 'ngAuthSettings', '$state'];
    function filetemplateEditController($scope, $location, $timeout, soachapterService, $sce, $loading, $stateParams, $uibModal, ngAuthSettings, $state) {
        var master = $state.current.data.master;
        $scope.fileBaseUri = ngAuthSettings.apiServiceBaseUri + "api/file/GetFile?guid=";
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.exit = function () {
            window.history.back();
        }

        $scope.message = '';
        $scope.savedSuccessfully = false;

        $scope.vm = {
            templates: [],
        };

        var startTimer = function() {
            var timer = $timeout(function() {
                $timeout.cancel(timer);
                $location.path('/app/file/templateedit');
            }, 1000);
        };

        $scope.loadData = function () {
            $scope.message = '';
            $scope.savedSuccessfully = false;
            $loading.start('key');

            if (master) {
                soachapterService.get(3).then(
                    function(result) {
                        $scope.vm.templates = result.data;
                        for (var i = 0; i < $scope.vm.templates.length; i++) {
                            $scope.vm.templates[i].myfiles = [];
                            $scope.vm.templates[i].templatefiles = [];
                            for (var j = 0; j < $scope.vm.templates[i].files.length; j++) {
                                if ($scope.vm.templates[i].files[j].template === true) {
                                    $scope.vm.templates[i].templatefiles.push($scope.vm.templates[i].files[j]);
                                } else {
                                    $scope.vm.templates[i].myfiles.push($scope.vm.templates[i].files[j]);
                                };
                            };
                        };
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
            } else {
                soachapterService.getSoa(3).then(
                    function(result) {
                        $scope.vm.templates = result.data;
                        for (var i = 0; i < $scope.vm.templates.length; i++) {
                            $scope.vm.templates[i].myfiles = [];
                            $scope.vm.templates[i].templatefiles = [];
                            for (var j = 0; j < $scope.vm.templates[i].files.length; j++) {
                                if ($scope.vm.templates[i].files[j].template === true) {
                                    $scope.vm.templates[i].templatefiles.push($scope.vm.templates[i].files[j]);
                                } else {
                                    $scope.vm.templates[i].myfiles.push($scope.vm.templates[i].files[j]);
                                };
                            };
                        };
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
        };

        $scope.deleteFile = function (uid, chapter) {
            $scope.message = '';
            $loading.start('key');

            var file = { guid: uid };
            soachapterService.deleteFile(file).then(function (response) {
                $scope.savedSuccessfully = true;
                var i = 0;
                for (i = 0; i < chapter.files.length; i++) {
                    if (chapter.files[i].guid == uid) {
                        chapter.files.splice(i, 1);
                        break;
                    };
                };
                for (i = 0; i < chapter.myfiles.length; i++) {
                    if (chapter.myfiles[i].guid == uid) {
                        chapter.myfiles.splice(i, 1);
                        break;
                    };
                };
                for (i = 0; i < chapter.templatefiles.length; i++) {
                    if (chapter.templatefiles[i].guid == uid) {
                        chapter.templatefiles.splice(i, 1);
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

        $scope.addTemplate = function () {
            var chapter = {
                id: -1,
                name: "New template",
                description: "New template",
                goal: "",
                subChapters: [],
                soaType: 3,
            };
           var newChapter = soachapterService.addTemplate(chapter);
           $scope.vm.templates.push(newChapter);
        };

        $scope.deleteTemplate = function (chapter) {
            var index = $scope.vm.templates.indexOf(chapter);
            if (index > -1)
                $scope.vm.templates.splice(index, 1);
        }

        $scope.save = function (exit) {
            $scope.message = "";
            $loading.start('key');
            $scope.savedSuccessfully = false;

            soachapterService.update($scope.vm.templates).then(function (response) {
                $scope.savedSuccessfully = true;
                if (exit && exit == true) {
                    $scope.message = $sce.trustAsHtml("Templates was saved. Please wait while we redirect back to the index page.");
                    startTimer();
                } else {
                    $scope.message = $sce.trustAsHtml("Templates was saved.");
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

        $scope.loadData();

    }

    angular.module("raap").controller('filechapterViewController', filechapterViewController);
    filechapterViewController.$inject = ['$scope', '$location', '$timeout', 'soachapterService', '$sce', '$loading', '$stateParams', '$uibModal'];
    function filechapterViewController($scope, $location, $timeout, soachapterService, $sce, $loading, $stateParams, $uibModal) {
        $scope.message = '';

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

            soachapterService.get(1).then(
                function (result) {
                    $scope.vm.templates = result.data;
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
            $location.path('/app/file/templateedit/');
        };

        $scope.loadData();

    }




})();

