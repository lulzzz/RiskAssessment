(function () {
    "use strict";


    angular.module("raap").controller('threatController', threatController);
    threatController.$inject = ['$scope', '$location', '$timeout', 'threatService', '$loading'];
    function threatController($scope, $location, $timeout, threatService, $loading) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.gridPagination = function (page, limit) {
            $scope.vm.pageSize = limit;
            $scope.vm.page = page;
            $scope.loadData();
        }
        $scope.gridReOrder = function (order) {
            $scope.vm.orderByKey = order.replace('-', '');
            $scope.vm.isDesc = !$scope.vm.isDesc;
            $scope.loadData();
        };


        $scope.vm = {
            searchLoading: false,
            searchResult: null,
            pageSize: 500,
            page: 1,
            orderByKey: '',
            isDesc: false,
            dataset: {
                items: [],
                totalPages: 0,
                totalItems: 0
            }
        };

        $scope.copyItem = function (item) {
            $scope.alerts = [];
            $loading.start('key');
            item.name += " - copy";
            item.threatId = 0;
            threatService.create(item).then(function (item) {
                $loading.finish('key');
                $location.path('/app/threat/edit/' + item.threatId);
            },
                function (response) {
                    $loading.finish('key');
                });
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');

            threatService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc).then(
                function (result) {

                    $scope.vm.dataset.items = result.data.items;
                    $scope.vm.dataset.totalPages = result.data.totalPages;
                    $scope.vm.dataset.totalItems = result.data.totalItems;
                    $scope.vm.page = result.data.currentPage;
                    $loading.finish('key');
                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    }
                    else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('key');
                });
        };

        $scope.edit = function (id) {
            $location.path('/app/threat/edit/' + id);
        };

        $scope.create = function () {
            $location.path('/app/threat/create');
        };

  
        $scope.search = function (val) {
            return threatService.search(val).then(function (response) {
                return response.data;
            });
        };


        $scope.loadData();

    }

    angular.module("raap").controller('selectControlsController', selectControlsController);
    selectControlsController.$inject = ['$scope', 'controlService', '$loading', 'controls', '$mdDialog'];
    function selectControlsController($scope, controlService, $loading, controls, $mdDialog) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            pageSize: 500,
            page: 1,
            orderByKey: 'name',
            isDesc: false,
            dataset: {
                items: [],
                totalPages: 0,
                totalItems: 0
            },
            addedControls: controls
        };

        $scope.createControl = function () {

            $mdDialog.show({
                controller: 'controlCreateTreeController',
                templateUrl: 'app/views/controls/save.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    runningInModalChild: function () {
                        return true;
                    }
                }
            })
               .then(function (result) {
                   $scope.addControl(result);
               }, function () {
                   // cancel
               });

        };

        $scope.addControl = function (control) {
            // add to local
            $scope.vm.addedControls.push(control);
            // reload data
            $scope.loadData();
        };

        $scope.addedControlIds = function () {
            var result = [];
            for (var i = 0; i < $scope.vm.addedControls.length; i++) {
                result.push($scope.vm.addedControls[i].controlId);
            }
            return result;
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');

            controlService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, $scope.addedControlIds()).then(
                function (result) {
                    $scope.vm.dataset.items = result.data.items;
                    $scope.vm.dataset.totalPages = result.data.totalPages;
                    $scope.vm.dataset.totalItems = result.data.totalItems;

                    $loading.finish('key');
                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    }
                    else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('key');
                });
        };

        $scope.ok = function () {
            
            $mdDialog.hide();
        };

        $scope.loadData();
    }


    angular.module("raap").controller('selectCausesController', selectCausesController);
    selectCausesController.$inject = ['$scope', 'attributeService', '$loading', 'causes', '$mdDialog'];
    function selectCausesController($scope, attributeService, $loading, causes, $mdDialog) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            pageSize: 500,
            page: 1,
            orderByKey: 'name',
            isDesc: false,
            dataset: {
                items: [],
                totalPages: 0,
                totalItems: 0
            },
            addedCauses: causes
        };

  
        $scope.addCause = function (cause) {
            // add to local
            $scope.vm.addedCauses.push(cause);
            // reload data
            $scope.loadData();
        };

        $scope.addedCauseIds = function () {
            var result = [];
            for (var i = 0; i < $scope.vm.addedCauses.length; i++) {
                result.push($scope.vm.addedCauses[i].attributeId);
            }
            return result;
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');


            attributeService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, 'Cause', $scope.addedCauseIds()).then(
                function (result) {
                    $scope.vm.dataset.items = result.data.items;
                    $scope.vm.dataset.totalPages = result.data.totalPages;
                    $scope.vm.dataset.totalItems = result.data.totalItems;

                    $loading.finish('key');
                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    }
                    else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('key');
                });
        };

        $scope.ok = function () {

            $mdDialog.hide();
        };

        $scope.loadData();
    }



    angular.module("raap").controller('threatCreateController', threatCreateController);
    threatCreateController.$inject = ['$scope', '$location', '$timeout', 'threatService', 'threatCategoryService', '$sce', '$loading', '$mdDialog', 'runningInModalChild']; // modalInstance must be last (optional)
    function threatCreateController($scope, $location, $timeout, threatService, threatCategoryService, $sce, $loading, $mdDialog, runningInModalChild) {
        // overloading new controller (as angularjs dont support optional injector values)
        threatCreateTreeController($scope, $location, $timeout, threatService, threatCategoryService, $sce, $loading, $mdDialog, runningInModalChild);
    }


    angular.module("raap").controller('threatCreateTreeController', threatCreateTreeController);
    threatCreateTreeController.$inject = ['$scope', '$location', '$timeout', 'threatService', 'threatCategoryService', '$sce', '$loading', '$mdDialog', 'runningInModalChild']; // modalInstance must be last (optional)
    function threatCreateTreeController($scope, $location, $timeout, threatService, threatCategoryService, $sce, $loading, $mdDialog, runningInModalChild) {

        $scope.createMode = true;

        $scope.savedSuccessfully = false;

        $scope.vm = {
            damage: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1
            },
            financial: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1
            },
            reputation: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1
            },
            enabled: false,
            internalExternal: 3,
            securitySafety: 1,
            riskAssessmentMethod: 1,
            confidenciality: false,
            integrity: false,
            availability: false,
            authenticity: false,
            name: '',
            description: '',
            avoidRisk: false,
            shareRisk: false,
            reduceRisk: false,
            acceptRisk: false,
            riskDate: undefined,
            riskUser: '',
            category: {
                threatCategoryId: 0,
                name: '',
                description: ''
            },
            controls: [],
            causes: [],
            evaluations: [{ evaluationId: 0, revision: 1, text: "" }]
        };


        $scope.exit = function () {
            if ($scope.editThreatForm.$pristine) {
                if (runningInModalChild) {
                    $mdDialog.hide($scope.vm);
                } else {
                    window.history.back();
                }
            }
            else {
                $mdDialog.show({
                    controller: 'okCancelController',
                    templateUrl: 'app/views/shared/unsaved.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                    .then(function (answer) {
                        $scope.save(true);
                    }, function () {
                        if (runningInModalChild) {
                            $mdDialog.hide($scope.vm);
                        } else {
                            window.history.back();
                        }
                    });


            }
        };

       
        $scope.ensureTypeOfThreat = function () {
            if ($scope.vm.securitySafety == 2) {
                $scope.vm.riskAssessmentMethod = 1;
            }
        };

        $scope.selectControls = function () {

            $mdDialog.show({
                controller: 'selectControlsController',
                templateUrl: 'app/views/threats/select-controls.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    controls: function () {
                        return $scope.vm.controls;
                    }
                }
            })
                .then(function (result) {
                    $scope.editThreatForm.$setDirty();
                }, function () {
                    // cancel
                });

        };

        $scope.removeControl = function (control) {
            for (var i = 0; i < $scope.vm.controls.length; i++) {
                if ($scope.vm.controls[i] == control)
                    $scope.vm.controls.splice(i, 1);
            }
            $scope.editThreatForm.$setDirty();
        };

        $scope.editControl = function (controlToEdit) {

            $mdDialog.show({
                controller: 'controlEditModalController',
                templateUrl: 'app/views/controls/save.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    runningInModalChild: function () {
                        return true;
                    },
                    control: function () {
                        return controlToEdit;
                    }
                }
            })
              .then(function (result) {
                  $scope.editThreatForm.$setDirty();
              }, function () {
                  // cancel
              });

          
        };

        $scope.selectCauses = function () {

            $mdDialog.show({
                controller: 'selectCausesController',
                templateUrl: 'app/views/threats/select-causes.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    causes: function () {
                        return $scope.vm.causes;
                    }
                }
            })
                .then(function (result) {
                    $scope.editThreatForm.$setDirty();
                }, function () {
                    // cancel
                });

        };
        $scope.removeCause = function (cause) {
            for (var i = 0; i < $scope.vm.causes.length; i++) {
                if ($scope.vm.causes[i] == cause)
                    $scope.vm.causes.splice(i, 1);
            }
            $scope.editThreatForm.$setDirty();
        };



        $scope.categories = [];

        $scope.validateRiskAndEffect = function () {
            if (!$scope.vm.avoidRisk && !$scope.vm.shareRisk && !$scope.vm.reduceRisk && !$scope.vm.acceptRisk) {
                $scope.alerts.push({ type: 'danger', msg: 'Please check/enable atleast 1 on the risks'});
                return false;
            }
            if (!$scope.vm.confidenciality && !$scope.vm.integrity && !$scope.vm.availability && !$scope.vm.authenticity) {
                $scope.alerts.push({ type: 'danger', msg: 'Please check/enable atleast 1 on the threat effects'});
                return false;
            }
            return true;
        }

        $scope.save = function (exit) {
          
            if (!$scope.validateRiskAndEffect()) { return;}

            $loading.start('key');
            $scope.savedSuccessfully = false;

            if (runningInModalChild) {
                // this controller/view is called from modal - dont save to db
                $mdDialog.hide($scope.vm);
                return;
            }

            threatService.create($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                    $scope.editThreatForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.alerts.push({ type: 'success', msg: 'The threat was created! Please wait while we redirect back to the index page.' });
                        startTimer();
                    } else {
                        $scope.alerts.push({ type: 'success', msg: 'The threat was created.' });
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
                        $scope.alerts.push({ type: 'danger', msg: 'Please correct the following: ' + errors[0] });
                    } else if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }
                    $loading.finish('key');

                });
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');

            threatCategoryService.getAll(100, 1, "Name", false).then(
                function (result) {

                    $scope.categories = result.data.items;
                    $scope.vm.category = $scope.categories[0];
                    $loading.finish('key');
                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    }
                    else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('key');
                });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/app/threat/grid');
            }, 1000);
        };

        $scope.loadData();
    }

    angular.module("raap").controller('threatEditController', threatEditController);
    threatEditController.$inject = ['$scope', '$location', '$timeout', 'threatService', 'threatCategoryService', '$sce', '$loading', '$stateParams', '$mdDialog', 'runningInModalChild','$uibModal'];
    function threatEditController($scope, $location, $timeout, threatService, threatCategoryService, $sce, $loading, $stateParams, $mdDialog, runningInModalChild, $uibModal) {
        return threatEditModalController($scope, $location, $timeout, threatService, threatCategoryService, $sce, $loading, $stateParams, $mdDialog, runningInModalChild, null, $uibModal);

    }

    angular.module("raap").controller('threatEditModalController', threatEditModalController);
    threatEditModalController.$inject = ['$scope', '$location', '$timeout', 'threatService', 'threatCategoryService', '$sce', '$loading', '$stateParams', '$mdDialog', 'runningInModalChild', 'threat', '$uibModal'];
    function threatEditModalController($scope, $location, $timeout, threatService, threatCategoryService, $sce, $loading, $stateParams, $mdDialog, runningInModalChild, threat, $uibModal) {

        $scope.createMode = false;

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.exit = function () {
            if ($scope.editThreatForm.$pristine) {
                if (runningInModalChild) {
                    $mdDialog.hide($scope.vm);
                } else {
                    window.history.back();
                }
            }
            else {
                $mdDialog.show({
                    controller: 'okCancelController',
                    templateUrl: 'app/views/shared/unsaved.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                    .then(function (answer) {
                        $scope.save(true);
                    }, function () {
                        if (runningInModalChild) {
                            $mdDialog.hide($scope.vm);
                        } else {
                            window.history.back();
                        }
                    });


            }
        };

        $scope.message = '';
        $scope.savedSuccessfully = false;
        $scope.runningInModalChild = runningInModalChild;

        $scope.vm = {
            threatId: $stateParams.id,
            damage: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1
            },
            financial: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1
            },
            reputation: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1
            },
            enabled: false,
            internalExternal: 3,
            securitySafety: 1,
            riskAssessmentMethod: 1,
            acceptRisk: false,
            confidenciality: false,
            integrity: false,
            availability: false,
            transferRisk: false,
            name: '',
            description: '',
            createdOn: new Date(),
            updatedOn: new Date(),
            category: {
                threatCategoryId: 0,
                name: '',
                description: ''
            },
            controls: [],
            causes: [],
            evaluations: [{ evaluationId: 0, revision: 1, text: "" }]
        };

        $scope.ensureTypeOfThreat = function () {
            if ($scope.vm.securitySafety == 2) {
                $scope.vm.riskAssessmentMethod = 1;
            }
        };

        $scope.selectControls = function () {

            $mdDialog.show({
                controller: 'selectControlsController',
                templateUrl: 'app/views/threats/select-controls.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    controls: function () {
                        return $scope.vm.controls;
                    }
                }
            })
                .then(function (result) {
                    $scope.editThreatForm.$setDirty();
                }, function () {
                    // cancel
                });

        };

        $scope.editControl = function (controlToEdit) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/views/controls/save.html',
                controller: 'controlEditModalController',
                windowClass: 'app-modal-window',
                size: 'lg',
                resolve: {
                    runningInModalChild: function () {
                        return true;
                    },
                    control: function () {
                        return controlToEdit;
                    }
                }
            });

            modalInstance.result.then(function (result) {
                // object is already binded
                $scope.editThreatForm.$setDirty();
            }, function () {
                // cancel
            });
        };

        $scope.removeControl = function (control) {
            for (var i = 0; i < $scope.vm.controls.length; i++) {
                if ($scope.vm.controls[i] == control)
                    $scope.vm.controls.splice(i, 1);
            }
            $scope.editThreatForm.$setDirty();
        };

        $scope.selectCauses = function () {

            $mdDialog.show({
                controller: 'selectCausesController',
                templateUrl: 'app/views/threats/select-causes.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    causes: function () {
                        return $scope.vm.causes;
                    }
                }
            })
                .then(function (result) {
                    $scope.editThreatForm.$setDirty();
                }, function () {
                    // cancel
                });

        };
        $scope.removeCause = function (cause) {
            for (var i = 0; i < $scope.vm.causes.length; i++) {
                if ($scope.vm.causes[i] == cause)
                    $scope.vm.causes.splice(i, 1);
            }
            $scope.editThreatForm.$setDirty();
        };

        $scope.categories = [];

        $scope.validateRiskAndEffect = function () {
            if (!$scope.vm.avoidRisk && !$scope.vm.shareRisk && !$scope.vm.reduceRisk && !$scope.vm.acceptRisk) {
                $scope.alerts.push({ type: 'danger', msg: 'Please check/enable atleast 1 on the risks' });
                return false;
            }
            if (!$scope.vm.confidenciality && !$scope.vm.integrity && !$scope.vm.availability && !$scope.vm.authenticity) {
                $scope.alerts.push({ type: 'danger', msg: 'Please check/enable atleast 1 on the threat effects' });
                return false;
            }
            return true;
        }


        $scope.save = function (exit) {
            if (!$scope.validateRiskAndEffect()) { return;}
            if (runningInModalChild) {
                // this controller/view is called from modal - dont save to db
                $mdDialog.hide($scope.vm);
                return;
            }
            $scope.alerts = [];
            $loading.start('key');
            $scope.savedSuccessfully = false;

            threatService.update($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.editThreatForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.alerts.push({ type: 'success', msg: 'The threat was created! Please wait while we redirect back to the index page.' });
                        startTimer();
                    } else {
                        $scope.alerts.push({ type: 'success', msg: 'The threat was created.' });
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
                        $scope.alerts.push({ type: 'danger', msg: 'Please correct the following: ' + errors[0] });
                    } else if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }
                    $loading.finish('key');

                });
        };

        $scope.delete = function () {


            $mdDialog.show({
                controller: 'deleteController',
                templateUrl: 'app/views/shared/delete.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true
            })
            .then(function (answer) {

                $loading.start('key');

                threatService.delete($scope.vm.threatId).then(function (response) {
                    $loading.finish('key');
                    $scope.alerts.push({ type: 'success', msg: 'Threat is deleted. Please wait while the grid is updating ...' });
                    startTimer();

                },
                    function (response) {
                        if (response && response.exceptionMessage) {
                            $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                        }
                        else {
                            $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                        }
                        $loading.finish('key');
                    });


            }, function () {

            });


        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/app/threat/grid');
            }, 1000);
        }



        $scope.loadData = function () {
          
            $scope.savedSuccessfully = false;
            $loading.start('key');

            $loading.start('category');

            threatCategoryService.getAll(100, 1, "Name", false).then(
                function (result) {

                    $scope.categories = result.data.items;
                    $loading.finish('category');

                    if (runningInModalChild) {
                        $scope.vm = threat;

                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.categories[i].threatCategoryId == $scope.vm.category.threatCategoryId) {
                                $scope.vm.category = $scope.categories[i];
                                break;
                            }
                        }
                        $scope.ensureTypeOfThreat();
                        $loading.finish('key');
                    } else {
                        threatService.getSingle($scope.vm.threatId).then(
                      function (result) {
                          $scope.vm = result.data;

                          if (!$scope.vm.causes) {
                              $scope.vm.causes = [];
                          }

                          for (var i = 0; i < $scope.categories.length; i++) {
                              if ($scope.categories[i].threatCategoryId == $scope.vm.category.threatCategoryId) {
                                  $scope.vm.category = $scope.categories[i];
                                  break;
                              }
                          }
                          $scope.ensureTypeOfThreat();
                          $loading.finish('key');
                      },
                      function (response) {

                          if (response && response.exceptionMessage) {
                              $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                          } else {
                              $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                          }

                          $loading.finish('key');
                      });
                    }


                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('category');
                });
        };


        $scope.loadData();

    }




    angular.module("raap").controller('threatViewController', threatViewController);
    threatViewController.$inject = ['$scope', '$location', '$timeout', 'threatService', 'threatCategoryService', '$sce', '$loading', '$stateParams', '$uibModal', 'assetService'];
    function threatViewController($scope, $location, $timeout, threatService, threatCategoryService, $sce, $loading, $stateParams, $uibModal, assetService) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.message = '';

        $scope.vm = {
            threatId: $stateParams.threatid,
            assetId: $stateParams.assetid,
            threat: null,
            asset: null
        };

   

        $scope.loadData = function () {
            $scope.message = '';
            $loading.start('key');

            assetService.getSingle($scope.vm.assetId).then(
                function(result) {
                    $scope.vm.asset = result.data;
                    $scope.setCurrentThreat();
                    // find and set current threat
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

        $scope.setCurrentThreat = function () {

            if (!$scope.vm.asset || !$scope.vm.asset.threats || $scope.vm.asset.threats.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
                return;
            }

            for (var i = 0; i < $scope.vm.asset.threats.length; i++) {
                var currentThreat = $scope.vm.asset.threats[i];
                if (currentThreat.threatId == $scope.vm.threatId) {
                    $scope.vm.threat = currentThreat;

                    $scope.mycheckbox1 = ($scope.vm.threat.securitySafety == 1);
                    $scope.mycheckbox2 = ($scope.vm.threat.securitySafety == 2);

                    $scope.mycheckbox3 = ($scope.vm.threat.internalExternal == 1);
                    $scope.mycheckbox4 = ($scope.vm.threat.internalExternal == 2);
                    $scope.mycheckbox5 = ($scope.vm.threat.internalExternal == 3);
                 

                    break;
                }
            }

            if (!$scope.vm.threat) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
            }
        };

        $scope.edit = function () {
            $location.path('/app/threat/edittree/' + $scope.vm.assetId + "/" + $scope.vm.threatId);
        };

        $scope.removeCurrentThreat = function() {
            if (!$scope.vm.asset || !$scope.vm.asset.threats || $scope.vm.asset.threats.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
                return;
            }

            var position = -1;
            for (var i = 0; i < $scope.vm.asset.threats.length; i++) {
                var currentThreat = $scope.vm.asset.threats[i];
                if (currentThreat.threatId == $scope.vm.threatId) {
                    position = i;
                    break;
                }
            }
            if (position >= 0) {
                $scope.vm.asset.threats.splice(position, 1);
            }

            if (!$scope.vm.threat) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
            }
        };

        $scope.delete = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/views/threats/delete.html',
                controller: 'deleteController',
                windowClass: 'app-modal-window'
            });

            modalInstance.result.then(function (result) {
                $loading.start('key');

                // remove threat from asset 
                $scope.removeCurrentThreat();

                assetService.update($scope.vm.asset).then(function (response) {
                    $loading.finish('key');
                    $('#mainmenu').scope().refreshTreeView();
                    $location.path('/app/threat/grid');
                },
                    function (response) {
                        if (response && response.exceptionMessage) {
                            $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                        }
                        else {
                            $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                        }
                        $loading.finish('key');
                    });


            }, function () {
                // cancel
            });

        };

        $scope.loadData();

    }


    angular.module("raap").controller('threatTreeEditController', threatTreeEditController);
    threatTreeEditController.$inject = ['$scope', '$location', '$timeout', 'threatService', 'threatCategoryService', '$sce', '$loading', '$stateParams', '$mdDialog', 'assetService'];
    function threatTreeEditController($scope, $location, $timeout, threatService, threatCategoryService, $sce, $loading, $stateParams, $mdDialog, assetService) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.exit = function () {
            if ($scope.editThreatForm.$pristine) {
                    window.history.back();
            } else {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/shared/unsaved.html',
                    controller: 'okCancelController',
                    windowClass: 'app-modal-window'
                });

                modalInstance.result.then(function (result) {
                    $scope.save(true);
                },
                    function (result) {
                            window.history.back();
                    });
            }
        }

        $scope.message = '';
        $scope.savedSuccessfully = false;

        $scope.vm = {
            threatId: $stateParams.threatid,
            damage: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1,
            },
            financial: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1,
            },
            reputation: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1,
            },
            internalExternal: 3,
            securitySafety: 1,
            riskAssessmentMethod: 1,
            acceptRisk: false,
            confidenciality: false,
            integrity: false,
            availability: false,
            transferRisk: false,
            name: '',
            description: '',
            createdOn: Date(),
            updatedOn: Date(),
            category: {
                threatCategoryId: 0,
                name: '',
                description: ''
            },
            controls: [],
            causes: [],
            evaluations: [{ evaluationId: 0, revision: 1, text: "" }]
        };

        $scope.vm2 = {
            threatId: $stateParams.threatid,
            assetId: $stateParams.assetid,
            threat: null,
            asset: null
        };

        $scope.ensureTypeOfThreat = function () {
            if ($scope.vm.securitySafety == 2) {
                $scope.vm.riskAssessmentMethod = 1;
            }
        };

        $scope.selectControls = function () {


            $mdDialog.show({
                controller: 'selectControlsController',
                templateUrl: 'app/views/threats/select-controls.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    runningInModalChild: function () {
                        return true;
                    },
                    controls: function () {
                        return $scope.vm.controls;
                    }
                }
            })
            .then(function (result) {
              
            }, function () {
                // cancel
            });



        };


        $scope.editControl = function (controlToEdit) {



            $mdDialog.show({
                controller: 'controlEditModalController',
                templateUrl: 'app/views/controls/save.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    runningInModalChild: function () {
                        return true;
                    },
                    control: function () {
                        return controlToEdit;
                    }
                }
            })
            .then(function (result) {
               
            }, function () {
                // cancel
            });





        };

        $scope.removeControl = function (control) {
            for (var i = 0; i < $scope.vm.controls.length; i++) {
                if ($scope.vm.controls[i] == control)
                    $scope.vm.controls.splice(i, 1);
            }
            $scope.editThreatForm.$setDirty();
        };

        $scope.selectCauses = function () {

            $mdDialog.show({
                controller: 'selectCausesController',
                templateUrl: 'app/views/threats/select-causes.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    causes: function () {
                        return $scope.vm.causes;
                    }
                }
            })
                .then(function (result) {
                    $scope.editThreatForm.$setDirty();
                }, function () {
                    // cancel
                });

        };
        $scope.removeCause = function (cause) {
            for (var i = 0; i < $scope.vm.causes.length; i++) {
                if ($scope.vm.causes[i] == cause)
                    $scope.vm.causes.splice(i, 1);
            }
            $scope.editThreatForm.$setDirty();
        };


        $scope.categories = [];

        $scope.validateRiskAndEffect = function () {
            if (!$scope.vm.avoidRisk && !$scope.vm.shareRisk && !$scope.vm.reduceRisk && !$scope.vm.acceptRisk) {
                $scope.alerts.push({ type: 'danger', msg: 'Please check/enable atleast 1 on the risks' });
                return false;
            }
            if (!$scope.vm.confidenciality && !$scope.vm.integrity && !$scope.vm.availability && !$scope.vm.authenticity) {
                $scope.alerts.push({ type: 'danger', msg: 'Please check/enable atleast 1 on the threat effects' });
                return false;
            }
            return true;
        }


        $scope.save = function (exit) {
            $scope.alerts = [];
            $scope.message = '';
            if (!$scope.validateRiskAndEffect()) { return;}
            $loading.start('key');
            $scope.savedSuccessfully = false;

            $scope.updateCurrentThreat();

            assetService.update($scope.vm2.asset).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.editThreatForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.message = $sce.trustAsHtml("The threat was updated! Please wait while we redirect back to the view page.");
                        startTimer();
                    } else {
                        $scope.message = $sce.trustAsHtml("The threat was saved.");
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

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/app/threat/view/'+ $scope.vm2.assetId +'/' + $scope.vm2.threatId);
            }, 1000);
        }


        $scope.loadData = function () {
            $scope.message = '';
            $scope.savedSuccessfully = false;
            $loading.start('key');

            $loading.start('category');

            threatCategoryService.getAll(100, 1, "Name", false).then(
                function (result) {

                    $scope.categories = result.data.items;
                    $loading.finish('category');

                    assetService.getSingle($scope.vm2.assetId).then(
                        function(result) {
                            $scope.vm2.asset = result.data;

                            $scope.setCurrentThreat();
                            $scope.vm = $scope.vm2.threat;

                            if (!$scope.vm.causes) {
                                $scope.vm.causes = [];
                            }

                            for (var i = 0; i < $scope.categories.length; i++) {
                                if ($scope.categories[i].threatCategoryId == $scope.vm.category.threatCategoryId) {
                                    $scope.vm.category = $scope.categories[i];
                                    break;
                                }
                            }
                            $scope.ensureTypeOfThreat();

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


                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('category');
                });
        };

        $scope.setCurrentThreat = function () {

            if (!$scope.vm2.asset || !$scope.vm2.asset.threats || $scope.vm2.asset.threats.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
                return;
            }

            for (var i = 0; i < $scope.vm2.asset.threats.length; i++) {
                var currentThreat = $scope.vm2.asset.threats[i];
                if (currentThreat.threatId == $scope.vm2.threatId) {
                    $scope.vm2.threat = currentThreat;
                    break;
                }
            }

            if (!$scope.vm2.threat) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
            }
        };

        $scope.updateCurrentThreat = function () {
            if (!$scope.vm2.asset || !$scope.vm2.asset.threats || $scope.vm2.asset.threats.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
                return;
            }

            var position = -1;
            for (var i = 0; i < $scope.vm2.asset.threats.length; i++) {
                var currentThreat = $scope.vm2.asset.threats[i];
                if (currentThreat.threatId == $scope.vmvm2threatId) {
                    position = i;
                    break;
                }
            }
            if (position >= 0) {
                $scope.vm2.asset.threats[position] = $scope.vm;
            }

            if (!$scope.vm2.threat) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
            }
        };

        $scope.loadData();

    }





})();

