var app = angular.module('AppIndicadoresGeneralesArea', [ "kendo.directives" ]); 


app.controller('ListadoAreasCtrl', function($scope, $http, $timeout) {

    $scope.$watch('nivel1', function () {
        $http.get('ajax/getIndicadoresGeneralesArea.php?filtro=anio,id_empresa&data='
            + $scope.anio + ','+ $scope.id_empresa).success(function(data){
         $scope.areas = data;



            if (indicador == 'satisfaccion') {
                $scope.resultado = data;
            } else if (indicador == 'asistencia' || indicador == 'cuota'){
                $scope.resultado = Math.ceil(data);
            } else {
                $scope.resultado =  commaSeparateNumber(String(Math.ceil(data)));
            }





            
        }); 

        $http.get('ajax/getDetalleArea.php?filtro=anio,id_empresa&data=' 
            + $scope.anio + ',' + $scope.id_empresa).success(function(data2){
                $scope.resultado = data2;
        });

        $http.get('ajax/getTendenciaArea.php?filtro=anio,id_empresa,indicador,nivel1&data='
            + $scope.anio + ',' + $scope.id_empresa + ',' +  $scope.indicador + ',' +  $scope.nivel1).success(function(data2){
            $scope.tendencia = data2;
        });

    });

});


app.controller('DetalleAreaCrtl', function ($scope, $http, $timeout) {
});

function commaSeparateNumber(val){
    val = val.replace(',', '');
    var array = val.split('');
    var index = -3;
    while (array.length + index > 0) {
        array.splice(index, 0, ',');
        index -= 4;
    }
    return array.join('');
};  
