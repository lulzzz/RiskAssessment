


angular.module("raap").controller('viewHelpController', viewHelpController);
viewHelpController.$inject = ['$scope', '$mdDialog', 'slug', 'helpService'];
function viewHelpController($scope, $mdDialog, slug, helpService) {

    $scope.defaultLanguage = 'en-us';
    $scope.editMode = false;
    $scope.isAdmin = true; // TOO: This must be connected to real user roles!

    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.vm = {
        title: '',
        description: ''
    };

    $scope.getHelp = function (slug, language) {
        helpService.getBySlug(slug, language).then(
              function (result) {
                  $scope.vm = result.data;
                  $scope.vm.slug = slug;
                  if ($scope.vm.id <= 0) {
                      $scope.vm.title = "No help found!";
                      $scope.vm.description = "There is no help available for topic '" + slug + "'";
                  }
              },
              function (response) {

                  if (response && response.exceptionMessage) {
                      $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                  }
                  else {
                      $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                  }
              });
    };

    $scope.slug = slug;

    $scope.getHelp(slug, $scope.defaultLanguage);

    $scope.enterEditMode = function () {
        $scope.editMode = true;
    };

    $scope.exitEditMode = function () {
        $scope.editMode = false;
    };

    $scope.saveHelp = function () {

        if ($scope.vm.id <= 0) {
            // create
            helpService.create($scope.vm).then(
            function (result) {
                
                $scope.vm = result;
                $scope.exitEditMode();
            },
            function (response) {

                if (response && response.exceptionMessage) {
                    $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                }
                else {
                    $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                }
                $scope.exitEditMode();
            });
        }
        else {
            // update
            helpService.update($scope.vm).then(
           function (result) {
               $scope.vm = result;
               $scope.exitEditMode();
           },
           function (response) {

               if (response && response.exceptionMessage) {
                   $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
               }
               else {
                   $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
               }
               $scope.exitEditMode();
           });
        }
    }

    $scope.ok = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel('cancel');
    }

}


