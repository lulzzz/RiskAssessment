(function () {
    "use strict";

    angular.module("raap").directive("usernameAvailable", usernameAvailable);
    usernameAvailable.$inject = ['$http', '$q', '$timeout', 'userService'];
    function usernameAvailable($http, $q, $timeout, userService) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function(scope, elm, attr, model) {
                model.$asyncValidators.usernameAvailable = function () {
                    return userService.isUsernameAvailable(model.$viewValue).then(function(res) {
                        $timeout(function () {
                            model.$setValidity('usernameAvailable', !!res.data);
                        }, 100);
                    });
                };
            }
        };
    }

    angular.module("raap").directive("emailAvailable", emailAvailable);
    emailAvailable.$inject = ['$http', '$q', '$timeout', 'userService'];
    function emailAvailable($http, $q, $timeout, userService) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function (scope, elm, attr, model) {
                model.$asyncValidators.emailAvailable = function () {
                    return userService.isEmailAvailable(model.$viewValue).then(function (res) {
                        $timeout(function () {
                            model.$setValidity('emailAvailable', !!res.data);
                        }, 100);
                    });
                };
            }
        };
    }

    angular.module("raap").directive("toggleState", toggleState);
    toggleState.$inject = ['toggleStateService'];
    function toggleState(toggleStateService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var $body = $('body');

                $(element)
                  .on('click', function (e) {
                      e.preventDefault();
                      var classname = attrs.toggleState;

                      if (classname) {
                          if ($body.hasClass(classname)) {
                              $body.removeClass(classname);
                              if (!attrs.noPersist)
                                  toggleStateService.removeState(classname);
                          }
                          else {
                              $body.addClass(classname);
                              if (!attrs.noPersist)
                                  toggleStateService.addState(classname);
                          }

                      }

                  });
            }
        };
    }

    angular.module("raap").controller('responsibleUserController', responsibleUserController);
    responsibleUserController.$inject = ['$scope', 'userService', 'authService'];
    function responsibleUserController($scope, userService, authService) {
        $scope.users = [];

        $scope.loadData = function () {
            var companyId = authService.authentication.userDetails.companyId;
            userService.getAll(1000, 1, 'firstName', false, companyId).then(
                    function (result) {
                        $scope.users = [{ userId: null, firstName: 'None' }].concat(result.data.items);

                    });
       };

        $scope.loadData();
    };


    angular.module("raap").directive("responsibleUserSelector", responsibleUserSelector);
    function responsibleUserSelector() {
        return {
            scope: {
                responsibleUserId: '=?responsibleUserId',
            },
            controller: 'responsibleUserController',
            templateUrl: 'app/views/shared/responsibleUserSelector.html'
        };
    };

    angular.module("raap").controller('selectCompanyController', selectCompanyController);
    selectCompanyController.$inject = ['$scope', 'companyService'];
    function selectCompanyController($scope, companyService) {
        $scope.companies = [];

        $scope.loadData = function () {
            companyService.getAll(1000, 1, 'firstName', false).then(
                function (result) {
                    $scope.companies = result.data.items;
                });
        };

        $scope.loadData();
    };

    angular.module("raap").directive("companySelector", companySelector);
    function companySelector() {
        return {
            scope: {
                companyId: '=?companyId',
            },
            controller: 'selectCompanyController',
            templateUrl: 'app/views/shared/companySelector.html'
        };
    };

    angular.module("raap").controller('roleSelectorController', roleSelectorController);
    roleSelectorController.$inject = ['$scope', 'authService'];
    function roleSelectorController($scope, authService) {
        $scope.roles = [];
        if (authService.authentication.hasRole('SystemAdministrator')) {
            $scope.roles.push({
                name: 'SystemAdministrator',
                role: 'SystemAdministrator'
            });
        }
        if (authService.authentication.hasRole('SystemAdministrator') || authService.authentication.hasRole('Administrator')) {
            $scope.roles.push({
                name: 'Administrator',
                role: 'Administrator'
            });
        }
        $scope.roles.push({
            name: 'User',
            role: 'User'
        });
        $scope.roles.push({
            name: 'None',
            role: null
        });


    };

    angular.module("raap").directive("roleSelector", roleSelector);
    function roleSelector() {
        return {
            scope: {
                role: '=?role',
            },
            controller: 'roleSelectorController',
            templateUrl: 'app/views/shared/roleSelector.html'
        };
    };

    angular.module('raap')
        .run([
            '$templateCache', function($templateCache) {
                $templateCache.put('partials/menu-link.tmpl.html',
                    '<md-button \n' +
                    '  ui-sref="{{section.state}}" ng-click="focusSection()">\n' +
                    '  <ng-md-icon icon="{{section.icon}}"></ng-md-icon> {{section | humanizeDoc}}\n' +
                    '   <span  class="md-visually-hidden "\n' +
                    '    ng-if="isSelected()">\n' +
                    '    current page\n' +
                    '  </span>\n' +
                    '</md-button>\n' +
                    '');
            }
        ])
        .directive('menuLink', ['menuService', function(menuService) {
            return {
                scope: {
                    section: '='
                },
                templateUrl: 'partials/menu-link.tmpl.html',
                link: function($scope, $element) {
                    var controller = $element.parent().controller();

                    $scope.focusSection = function() {
                        // set flag to be used later when
                        // $locationChangeSuccess calls openPage()
                       // controller.autoFocusContent = true;
                    };
                }
            };
        }]);

    angular.module('raap')
        .run([
            '$templateCache', function($templateCache) {
                $templateCache.put('partials/menu-toggle.tmpl.html',
                    '<div ng-show="checkRole(section)" ><md-button class="md-button-toggle"\n' +
                    '  ng-click="toggle()"\n' +
                    '  aria-controls="docs-menu-{{section.name | nospace}}"\n' +
                    '  flex layout="row"\n' +
                    '  aria-expanded="{{isOpen()}}">\n' +
                    ' <ng-md-icon icon="{{section.icon}}"></ng-md-icon>{{section.name}}\n' +
                    '  <span aria-hidden="true" class=" pull-right fa fa-chevron-down md-toggle-icon"\n' +
                    '  ng-class="{\'toggled\' : isOpen()}"></span>\n' +
                    '</md-button></div>\n' +
                    '<ul ng-show="isOpen()" id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n' +
                    '  <li ng-repeat="page in section.pages" ng-show="checkRole(page)" >\n' +
                    '    <menu-link section="page"></menu-link>\n' +
                    '  </li>\n' +
                    '</ul>\n' +
                    '');
            }
        ])
        .directive('menuToggle', [
            '$timeout', 'menuService', 'authService', function ($timeout, menuService, authService) {
                return {
                    scope: {
                        section: '='
                    },
                    templateUrl: 'partials/menu-toggle.tmpl.html',
                    link: function(scope, element) {
                        var controller = element.parent().controller();

                        scope.checkRole = function (page) {
                            if (page.roles && page.roles.length > 0) {
                                var hasRole = false;
                                angular.forEach(page.roles, function (role, key) {
                                    
                                    if (authService.authentication.hasRole(role)) { hasRole = true; }
                                });

                                return hasRole;
                            }
                            else {
                                return true;
                            }
                        };

                        scope.isOpen = function () {
                            //console.log(controller);
                            return menuService.isSectionSelected(scope.section);
                           //) return controller.vm.isOpen(scope.section);
                        };
                        scope.toggle = function() {
                           // controller.vm.toggleOpen(scope.section);
                            menuService.toggleSelectSection(scope.section);
                        };

                        var parentNode = element[0].parentNode.parentNode.parentNode;
                        if (parentNode.classList.contains('parent-list-item')) {
                            var heading = parentNode.querySelector('h2');
                            element[0].firstChild.setAttribute('aria-describedby', heading.id);
                        }
                    }
                };
            }
        ]);


})();

