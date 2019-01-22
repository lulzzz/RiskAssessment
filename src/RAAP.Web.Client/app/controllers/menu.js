(function () {
    "use strict";
    angular.module('raap').controller('topMenuController', topMenuController);
    topMenuController.$inject = ['$scope', '$rootScope'];
    function topMenuController($scope, $rootScope ) {

        $scope.selectedName = 'dashboard';
        $scope.setSelectedIndex = function (index) {
            $rootScope.$broadcast('topMenuIndexChange', { selectedIndex: index });
        };

    }



    angular.module('raap').controller('menuController', menuController);
    menuController.$inject = ['$scope', '$state', '$rootScope', '$location', 'authService', 'processService', 'assetService', '$timeout', 'menuService', '$window'];
    function menuController($scope, $state, $rootScope, $location, authService, processService, assetService, $timeout, menuService, $window) {

        $scope.selectedtab = 0;

        $rootScope.$on('topMenuIndexChange', function (event, obj) {
            $scope.selectedtab = obj.selectedIndex;
        });

        $scope.vm = {
            isLoading: true,
            initialLoad: true,
            processes: [],
            treeInstance: null,
            treeConfig: {
                core: {
                    multiple: false,
                    animation: true,
                    error: function (error) {
                        console.log(error);
                    },
                    check_callback: true,
                    worker: true,
                    themes: {
                        name: 'default-dark'
                    }
                },
                state: { key: "raaptree" },
                types: {
                    process: {
                        icon: 'fa fa-briefcase'
                    },
                    asset: {
                        icon: 'fa fa-heartbeat'
                    },
                    threat: {
                        icon: 'fa fa-user-secret'
                    },
                    control: {
                        icon: 'fa fa-medkit'
                    },
                    company: {
                        icon: 'fa fa-building-o'
                    }
                },
                version: 1,
                plugins: ['types', 'state']
            },
            treeData: []
        };
     

        //functions for menu-link and menu-toggle
        $scope.vm.isOpen = isOpen;
        $scope.vm.toggleOpen = toggleOpen;
        $scope.vm.menu = menuService;
        $scope.vm.autoFocusContent = false;
       

        $scope.vm.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };


        function isOpen(section) {
            return menuService.isSectionSelected(section);
        }

        function toggleOpen(section) {
            menuService.toggleSelectSection(section);
        }

        $scope.authentication = authService.authentication;

        $scope.navigateBack = function () {
            window.history.back();
        };

        if (!$scope.authentication.isAuth) {
            $location.path('/login');
        }

        $scope.treeNodeClick = function (obj, e) {
            $scope.showNode(e.node);
            $scope.$apply();
        };

        $scope.treeNodeHover = function (obj, e) {
            $("#" + e.node.id + "_anchor").tooltip('show');
        };

        $scope.treeNodeDehover = function (obj, e) {
            $("#" + e.node.id + "_anchor").tooltip('hide');
        };


        $scope.showNode = function (node) {
      
            if (node.type == 'asset') {
              
                $location.path('/app/asset/view/'+ node.data.processId +'/' + node.data.assetId);
            }
            else if (node.type == 'threat') {
                $location.path('/app/threat/view/'+ node.data.assetId +'/' + node.data.threatId);
            }
            else if (node.type == 'control') {
                $location.path('/app/control/view/' + node.data.assetId + '/' + node.data.threatId + "/" + node.data.controlId);
            }
            else if (node.type == 'process') {
                $location.path('/app/process/view/' + node.data.processId);
            }
            else if (node.type == "company") {
                $location.path('/app/company/view/' + node.data.companyId);
            }
            else {
                alert("Unkown node type!");
            }
            

        }

        $scope.createProcess = function () {
            $location.path('/app/process/create');
        };

        $scope.refreshTreeView = function () {
            $scope.vm.message = '';
            $scope.vm.isLoading = true;

            processService.getAll(100, 1, 'Name', false).then(
                function (result) {
                    var newTree = [];
                    $scope.vm.processes = result.data.items;

                    //newTree.push({
                    //        id: 'company-node',
                    //        parent: '#',
                    //        text: $scope.authentication.userDetails.companyName,
                    //        state: { opened: true, selected: true },
                    //        data: {
                    //            companyId: $scope.authentication.userDetails.companyId
                    //        },
                    //        type: 'company',
                    //        li_attr: { 'class': 'defaultnode' }
                    //    }
                    //);

                    for (var i = 0; i < $scope.vm.processes.length; i++) {
                        var process = $scope.vm.processes[i];
                        var processTree = assetService.generateTreeListProcess(process, true);
                        newTree = newTree.concat(processTree);
                    }

                    if (newTree.length > 0) { //  && $scope.vm.initialLoad
                        newTree[0].state.selected = true;
                    }

                    // loop tree and try to set same view state
                    //var existingElements = $scope.vm.treeInstance.jstree(true).get_json('#', { 'flat': true });

                    //for (var i = 0; i < newTree.length; i++) {
                    //    var existingElement = $scope.findTreeElementById(existingElements, newTree[i].id);
                    //    if (existingElement != null) {
                    //        newTree[i].state = {
                    //            opened: existingElement.state.opened,
                    //            selected: existingElement.state.selected
                    //        };

                    //    }
                    //}

                    // activate new tree
                    $scope.vm.treeData = newTree;

                    $scope.vm.treeConfig.version++;
                    $scope.vm.isLoading = false;
                    $scope.vm.initialLoad = false;

          
                    $('[data-toggle="tooltip"]').tooltip();

                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.vm.message = $sce.trustAsHtml("Error: " + response.exceptionMessage);
                    } else {
                        $scope.vm.message = $sce.trustAsHtml('Unkown error - please try again!');
                    }
                    $scope.vm.isLoading = false;
                    
                });


        };

        $scope.findTreeElementById = function (existingElements, id) {
            if (!existingElements) {
                return null;
            }
            for (var j = 0; j < existingElements.length; j++) {
                var element = existingElements[j];
                if (element.id == id) {
                    return element;
                }
            }
            return null;
        };

        $scope.refreshTreeView();

       $scope.reloadState = function() {
           // reset internal seed -- important!
           assetService.seed = 0;

           $scope.refreshTreeView();
       }
       

        // ensure 100% height for our tabs
        $scope.changingTab = function(tab) {
            var height = window.innerHeight - $("#menutoolbar").height();
            $("#menutabs").height(height);
        }

        $(window).on('resize', function () {
            var height = window.innerHeight - $("#menutoolbar").height();
            $("#menutabs").height(height);
        });


    }


})();


