app.controller('digestCountController', ['$scope', function($scope) {

    io.socket.on ('digestCount', function (res) {
        $scope.count = res.count;
        $scope.$apply();
    });


    io.socket.get ('/reddit/digestCount', function (res) {
        $scope.count = res.count;
        $scope.$apply();
    });


    $scope.increase = function() {
        io.socket.get ('/reddit/digestIncrease');
    };


}]);