(function () {
    "use strict";

    angular.module("raap").directive("businessContinuityPlanEditor", businessContinuityPlanEditor);
    function businessContinuityPlanEditor() {
        return {
            scope: {
                editMode: '=editmode',
                businessContinuityPlans: '=businesscontinuityplans',
                editForm: '=editform',
            },
            controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {



                $scope.currentBusinessContinuityPlan = {};
                $scope.$watch('businessContinuityPlans', function () {

                    if ($scope.businessContinuityPlans == null) {
                        $scope.businessContinuityPlans = [];
                    }
                    else if ($scope.businessContinuityPlans.length > 0) {
                        $scope.currentBusinessContinuityPlan = $scope.businessContinuityPlans[0];
                    }
                });

                $scope.edit = function () {

                    $mdDialog.show({
                        controller: 'editBusinessContinuityPlanController',
                        templateUrl: 'app/views/shared/businessContinuityPlansModal.html',
                        parent: angular.element(document.body),
                        resolve: {
                            businessContinuityPlans: function () {
                                return $scope.businessContinuityPlans;
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
                       $scope.currentBusinessContinuityPlan = $scope.businessContinuityPlans[0];
                       if ($scope.editForm) {
                           $scope.editForm.$setDirty();
                       }
                   }, function () {
                   });


                };


            }],
            templateUrl: 'app/views/shared/businessContinuityPlans.html'
        };
    }

    angular.module("raap").controller('editBusinessContinuityPlanController', editBusinessContinuityPlanController);
    editBusinessContinuityPlanController.$inject = ['$scope', '$mdDialog', 'businessContinuityPlans', 'editMode'];
    function editBusinessContinuityPlanController($scope, $mdDialog, businessContinuityPlans, editMode) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.businessContinuityPlans = businessContinuityPlans;
        $scope.editMode = editMode;

        $scope.addBusinessContinuityPlan = function () {
            $scope.currentBusinessContinuityPlan.createdOn = new Date();
            $scope.businessContinuityPlans.unshift($scope.currentBusinessContinuityPlan);
            $scope.currentBusinessContinuityPlan = $scope.businessContinuityPlans[0];
        };

        $scope.$watch('businessContinuityPlans', function () {

            if ($scope.businessContinuityPlans.length <= 0) {
                $scope.currentBusinessContinuityPlan = { businessContinuityPlanId: 0, revision: 1, text: "", createdOn: new Date() };
            }
            else {
                var revision = 1;
                if ($scope.businessContinuityPlans && $scope.businessContinuityPlans.length > 0) {
                    revision = $scope.businessContinuityPlans[0].revision + 1;
                }
                $scope.currentBusinessContinuityPlan = { businessContinuityPlanId: 0, revision: revision, text: $scope.businessContinuityPlans[0].text, createdOn: new Date() };
            }
        });

        $scope.ok = function () {
            $mdDialog.hide($scope.currentBusinessContinuityPlan);
        };
        $scope.cancel
            = function () {
            $mdDialog.cancel('cancel');
        }
   
    }





})();

