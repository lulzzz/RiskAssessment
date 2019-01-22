(function () {
    "use strict";

    angular.module("raap").directive("evaluationEditor", evaluationEditor);
    function evaluationEditor() {
        return {
            scope: {
                editMode: '=editmode',
                evaluations: '=evaluations',
                editForm: '=editform',
            },
            controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {

                $scope.currentEvaluation = {};
                $scope.$watch('evaluations', function () {

                    if ($scope.evaluations == null) {
                        $scope.evaluations = [];
                    }
                    else if ($scope.evaluations.length > 0) {
                        $scope.currentEvaluation = $scope.evaluations[0];
                    }
                });


                $scope.edit = function () {

                    $mdDialog.show({
                        controller: 'editEvaluationController',
                        templateUrl: 'app/views/shared/evaluationsModal.html',
                        parent: angular.element(document.body),
                        resolve: {
                            evaluations: function () {
                                return $scope.evaluations;
                            },
                            editMode: function () {
                                return $scope.editMode;
                            }
                        },
                        clickOutsideToClose: true,
                        bindToController: true,
                        fullscreen: true
                    })
                   .then(function (result) {
                       $scope.currentEvaluation = $scope.evaluations[0];
                       if ($scope.editForm) {
                           $scope.editForm.$setDirty();
                       }
                   }, function () {
                   });


                };

            }],
            templateUrl: 'app/views/shared/evaluations.html'
        };
    }

    angular.module("raap").controller('editEvaluationController', editEvaluationController);
    editEvaluationController.$inject = ['$scope', '$mdDialog', 'evaluations', 'editMode', 'authService'];
    function editEvaluationController($scope, $mdDialog, evaluations, editMode, authService) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.evaluations = evaluations;
        $scope.editMode = editMode;

        $scope.addEvaluation = function () {
            $scope.currentEvaluation.createdOn = new Date();
            $scope.evaluations.unshift($scope.currentEvaluation);
            $scope.currentEvaluation = $scope.evaluations[0];
        };

        $scope.$watch('evaluations', function () {

            if ($scope.evaluations.length <= 0) {
                $scope.currentEvaluation = { evaluationId: 0, revision: 1, text: "", createdOn: new Date(), user: authService.authentication.userDetails };
            }
            else {
                var revision = 1;
                if ($scope.evaluations && $scope.evaluations.length > 0) {
                    revision = $scope.evaluations[0].revision + 1;
                }
                $scope.currentEvaluation = { evaluationId: 0, revision: revision, text: $scope.evaluations[0].text, createdOn: new Date(), user: authService.authentication.userDetails };
            }
        });

   
        $scope.ok = function () {
            $mdDialog.hide($scope.currentEvaluation);
        };

        $scope.cancel = function () {
            $mdDialog.cancel('cancel');
        }
    }


    angular.module("raap").directive("threatList", threatList);
    function threatList() {
        return {
            scope: {
                threats: '=threats',
            },
            controller: ['$scope', '$mdDialog', 'threatService', function ($scope, $mdDialog, threatService) {
                $scope.predicate = 'calculatedSortOrder';
                $scope.reverse = false;
                $scope.calculatedSortOrder = function (threat) {

                    var damageColor = threatService.getColorValue(threat.damage);
                    var financialColor = threatService.getColorValue(threat.financial);
                    var reputationColor = threatService.getColorValue(threat.reputation);

                    if (damageColor == "red" || financialColor == "red" || reputationColor == "red")
                        return 1;

                    if (damageColor == "yellow" || financialColor == "yellow" || reputationColor == "yellow")
                        return 2;

                    return 3;
                };
                $scope.order = function (predicate) {
                    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                    $scope.predicate = predicate;
                };
                $scope.gridReOrder = function (order) {
                    $scope.order(order);
                };
                $scope.showControls = function (controls) {

                    $mdDialog.show({
                        controller: 'viewControlsModalController',
                        templateUrl: 'app/views/shared/controls.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        resolve: {
                            controls: function () {
                                return controls;
                            }
                        },
                        fullscreen: true
                    })
                        .then(function (result) {
                            // ok
                        }, function () {
                            // cancel         
                        });


                };

            }],
            templateUrl: 'app/views/shared/threats.html'
        };
    }

    angular.module("raap").controller('viewControlsModalController', viewControlsModalController);
    viewControlsModalController.$inject = ['$scope', '$mdDialog', 'threatService', 'controls'];
    function viewControlsModalController($scope, $mdDialog, threatService, controls) {

        $scope.controls = controls;

        $scope.predicate = 'calculatedSortOrder';
        $scope.reverse = false;
        $scope.calculatedSortOrder = function (control) {

            var damageColor = threatService.getColorValue(control.damage);
            var financialColor = threatService.getColorValue(control.financial);
            var reputationColor = threatService.getColorValue(control.reputation);

            if (damageColor == "red" || financialColor == "red" || reputationColor == "red")
                return 1;

            if (damageColor == "yellow" || financialColor == "yellow" || reputationColor == "yellow")
                return 2;

            return 3;
        };
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
        $scope.gridReOrder = function (order) {
            $scope.order(order);
        };

        $scope.ok = function () {
            $mdDialog.hide();
        };
 

    }


})();

