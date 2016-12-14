var app = angular.module('AppIndicadoresGenerales', []); 

app.controller('IndicadoresGeneralesCrtl', function ($scope, $http, $timeout) {
    var indicador = $scope.indicador;
    $http.get('ajax/getIndicadoresGenerales.php?filtro=anio,id_empresa,indicador&data=' 
        + $scope.anio + ',' + $scope.id_empresa + ',' + $scope.indicador + '').success(function(data){
            if (indicador == 'satisfaccion') {
                $scope.resultado = data;
            } else if (indicador == 'asistencia' || indicador == 'cuota'){
                $scope.resultado = Math.ceil(data);
            } else {
                $scope.resultado =  commaSeparateNumber(String(Math.ceil(data)));
            }
            
    });
});

app.controller('AcuerdoServicioCrtl', function ($scope, $http, $timeout) {
    $http.get('ajax/getAcuerdoServicio.php?filtro=anio,id_empresa,indicador&data=' 
        + $scope.anio + ',' + $scope.id_empresa + ',' + $scope.indicador + '').success(function(data){
                $scope.list = data;
    });
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
