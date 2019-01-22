(function () {
    "use strict";


    angular.module("raap").directive("risksEditor", risksEditor);
    function risksEditor() {
        return {
            scope: {
                risks: '=risks',
                riskassessmentmethod: '=riskassessmentmethod',
                createmode: '=createmode'
            },
            controller: ['$scope', 'risktypeService', '$loading', function ($scope, risktypeService, $loading) {
                $scope.uniqueId = "risksEditor";
                if ($scope.createmode) {

                    $loading.start('key');

                    risktypeService.getAvailableRiskReduces().then(
                        function (result) {
                            $scope.risks = result;
                            $loading.finish('key');
                        },
                        function (response) {
                            console.log("Unkown error - please try again!");
                            $loading.finish('key');
                        });
                }

            }],
            templateUrl: 'app/views/shared/risks/riskseditor.html'
        };
    };

    angular.module("raap").directive("riskValues", riskValues);
    function riskValues() {
        return {
            scope: {
                risk: '=risk',
                riskassessmentmethod: '=riskassessmentmethod',
            },
            controller: ['$scope', function ($scope) {
                $scope.uniqueId = "riskValues";
                if ($scope.createmode) {
                    // TODO: Generate risks
                }
               
            }],
            templateUrl: 'app/views/shared/risks/riskvalues.html'
        };
    };



    angular.module("raap").directive("risksReduceEditor", risksReduceEditor);
    function risksReduceEditor() {
        return {
            scope: {
                risks: '=risks',
                createmode: '=createmode'
            },
            controller: ['$scope', 'risktypeService', '$loading', function ($scope, risktypeService, $loading) {
                $scope.uniqueId = "risksReduceEditor";

                if ($scope.createmode) {
                   
                    $loading.start('key');

                    risktypeService.getAvailableRiskReduces().then(
                        function (result) {
                            $scope.risks = result;
                            $loading.finish('key');
                        },
                        function (response) {
                            console.log("Unkown error - please try again!");
                            $loading.finish('key');
                        });
                }

            }],
            templateUrl: 'app/views/shared/risks/risksreduceeditor.html'
        };
    };

    angular.module("raap").directive("riskReduceValues", riskReduceValues);
    function riskReduceValues() {
        return {
            scope: {
                risk: '=risk'
            },
            controller: ['$scope', function ($scope) {
                $scope.uniqueId = "riskReduceValues";

            }],
            templateUrl: 'app/views/shared/risks/riskreducevalues.html'
        };
    };



    angular.module("raap").directive("riskGraphs", riskGraphs);
    function riskGraphs() {
        return {
            scope: {
                risks: '=risks',
                hasRegistered: '=hasregistered'
            },
            controller: ['$scope', 'risktypeService', '$loading', function ($scope, risktypeService, $loading) {
                $scope.uniqueId = "risksReduceEditor";


            }],
            templateUrl: 'app/views/shared/risks/riskgraphs.html'
        };
    };


    angular.module("raap").directive("riskGraph", riskGraph);
    function riskGraph() {
        return {
            scope: {
                risk: '=risk',
                showcalculated: '=showcalculated'
            },
            controller: ['$scope', function ($scope) {
                $scope.dy = function () {
                    if ($scope.showcalculated) {
                        return $scope.risk.calculatedIsoImpact ? $scope.risk.calculatedIsoImpact : 0;
                    } else {
                        return $scope.risk.isoImpact ? $scope.risk.isoImpact : 0;
                    }
                    
                };
                $scope.dx = function () {
                    if ($scope.showcalculated) {
                        return $scope.risk.calculatedIsoProbability ? $scope.risk.calculatedIsoProbability : 0;
                    } else {
                        return $scope.risk.isoProbability ? $scope.risk.isoProbability : 0;
                    }
                    
                };
              
       

            }],
            templateUrl: 'app/views/shared/risks/riskgraph.html'
        };
    };


    angular.module("raap").directive("riskReduceGraphs", riskReduceGraphs);
    function riskReduceGraphs() {
        return {
            scope: {
                risks: '=risks'
            },
            controller: ['$scope', 'risktypeService', '$loading', function ($scope, risktypeService, $loading) {
                $scope.uniqueId = "riskReduceGraphs";


            }],
            templateUrl: 'app/views/shared/risks/riskreducegraphs.html'
        };
    };

    angular.module("raap").directive("riskReduceGraph", riskReduceGraph);
    function riskReduceGraph() {
        return {
            scope: {
                risk: '=risk'
            },
            controller: ['$scope', 'risktypeService', '$loading', function ($scope, risktypeService, $loading) {
                $scope.uniqueId = "riskReduceGraph";


            }],
            templateUrl: 'app/views/shared/risks/riskreducegraph.html'
        };
    };

})();

