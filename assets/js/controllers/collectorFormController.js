app.controller ('collectorFormController', ['$scope', '$state', function ($scope, $state) {


    //$state.go('collector');


    $scope.keywords    = [{ value: '' }];
    $scope.filterTerms = [];

    $scope.createKeyword = function () {
        $scope.keywords.push ({ value: '' });
    };

    $scope.log = function (loggable) {
        console.log (loggable);
    };

    $scope.removeKeyword = function (index) {
        $scope.keywords.splice (index, 1);
    };

    $scope.keywordsCanContinue = function () {
        if ($scope.keywords.length == 0) return false;

        for (var i = 0; i < $scope.keywords.length; i++) {
            if ($scope.keywords[i].value == '') {
                return false;
            }
        }
        return true;
    };

    $scope.keywordsContinue = function () {
        if ($scope.keywordsCanContinue ()) {
            $state.go ('collector-form.search-parameters');
        }
    }


}]);
