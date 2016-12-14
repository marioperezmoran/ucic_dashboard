var app = angular.module('AppAsistenciaAprobacion', []);

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
app.controller('AsistenciaAprobacionCrtl', function ($scope, $http, $timeout) {
    $http.get('ajax/getAsistenciaAprobacion.php?filtro=id_empresa&data='+ $scope.id_empresa + '').success(function(data){
        $scope.resultado = data;
    });
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    }; 
});
