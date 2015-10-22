app.controller('digestCountController', ['$scope', function($scope) {

    $scope.count = '';
    io.socket.on ('digestCount', function (res) {
        $scope.count = res.count;
        $scope.$apply();
    });


    io.socket.get ('/reddit/digestCount');


}]);