var app = angular.module('AppDetalleInscrito', ['ui.bootstrap', 'ngResource']);

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

app.controller('DetalleInscritoCtrl', function ($scope, $http, $timeout) {  
    $scope.predicate = 'colaborador ';  
    $scope.reverse = true;  
    $scope.order = function (predicate) {  
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
      $scope.predicate = predicate;  
    };  
    $scope.list = [];

    $http.get('ajax/getDetalleInscrito.php')
      .then(function(result) {
      $scope.list = result.data;
      $scope.totalItems = $scope.list.length; 
      $scope.filteredItems = $scope.list.length; //Initially for no filter 
    });

    $scope.currentPage = 1; //current page
    $scope.entryLimit = 5; //max rows for data table
    $scope.totalItems = $scope.list.length; 
    $scope.numPerPage = 5;  

    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

    var mystyle = {
      sheetid: 'Detalle_Curso',
      headers: true,

      header: {
        style: function(sheet,row,rowidx){
          return 'background:#99CAC0';
        }
      },

      row: {
        style: function(sheet,row,rowidx){
          return 'background:'+(rowidx%2?'red':'yellow');
        }
      },

      caption: {
        title:'Detalle por Inscrito'
      },
      style:'background:#FFFFFF',
      column: {
        style:'background:#99CAC0'
      },
      columns: [
        {columnid:'ciclo',title: 'Ciclo',width: '35px'},
        {columnid:'mes',title: 'Mes',width: '30px'},
        {columnid:'nivel1',title: 'Nivel 1',width: '100px'},
        {columnid:'nivel2',title: 'Nivel 2',width: '100px'},
        {columnid:'registro',title: 'Registro',width: '50px'},
        {columnid:'dni',title: 'DNI',width: '50px'},
        {columnid:'colaborador',title: 'Colaborador',width: '120px'},
        {columnid:'cargo',title: 'Cargo',width: '80px'},

        {columnid:'curso',title: 'Curso',width: '296px'},
        {columnid:'programa',title: 'Programa',width: '296px'},
        {columnid:'sesion',title: 'Sesion',width: '42px'},
        {columnid:'tipo_capacitacion',title: 'Tipo Curso',width: '66px'},
        {columnid:'modalidad',title: 'Modalidad',width: '65px'},
        {columnid:'expositor',title: 'Expositor',width: '300px'},
        {columnid:'f_inicio',title: 'F Ini',width: '72px'},
        {columnid:'f_fin',title: 'F Fin',width: '72px'},
        
        {columnid:'sesiones',title: 'Sesiones',width: '72px'},
        {columnid:'horas_lectivas',title: 'H Lectivas',width: '72px'},
        {columnid:'horas_asistidas',title: 'H Asistidas',width: '72px'},
        {columnid:'asistencia',title: '% Asistencia',width: '72px'},
        {columnid:'nota',title: 'Nota',width: '72px'},
        {columnid:'estado',title: 'Estado',width: '80px'},

        {columnid:'fb_curso',title: 'FB Curso',width: '72px'},
        {columnid:'fb_utilidad',title: 'FB Utilidad',width: '72px'},
        {columnid:'fb_expositor',title: 'FB Expositor',width: '72px'},
      ],
      row: {
        style: function(sheet,row,rowidx){
          return 'background:'+(rowidx%2?'#FFFFFF':'#EDEDED');
        }
      }
    };

    $scope.exportDetalleInscrito = function () {
            alasql('SELECT * INTO XLS("Detalle_Inscrito.xls",?) FROM ?',[mystyle,$scope.list]);
    };
});