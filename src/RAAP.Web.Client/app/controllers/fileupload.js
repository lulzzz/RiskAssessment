(function() {
    "use strict";
    angular.module('raap').controller('uploadController', [
        '$scope', 'Upload', '$timeout', 'ngAuthSettings', function ($scope, Upload, $timeout, ngAuthSettings) {
            $scope.uploadFiles = function (file, errFiles, soachapterid, soatype, master, files) {
                $scope.f = file;
                
                $scope.errFile = errFiles && errFiles[0];
                if (file) {
                    file.upload = Upload.upload({
                        url: ngAuthSettings.apiServiceBaseUri + "api/upload",
                        data: { file: file, 'soachapterid': soachapterid, 'soaType' : soatype, 'master' : master}
                    });

                    file.upload.then(function(response) {
                        $timeout(function() {
                            file.result = response.data;
                            var newFile = {
                                fileName: file.name,
                                soaChapterId: soachapterid
                            };
                            files.push(response.data);
                        });
                    }, function(response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function(evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                };
            };
        }]);

})();


