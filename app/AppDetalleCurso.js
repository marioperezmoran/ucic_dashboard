var app = angular.module('AppDetalleCurso', ['ui.bootstrap', 'ngResource']);  

     app.controller('DetalleCursoCtrl', function ($scope, $http, $timeout) {  
       $scope.predicate = 'curso';  
       $scope.reverse = true;  
       $scope.currentPage = 1;  
       $scope.order = function (predicate) {  
         $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
         $scope.predicate = predicate;  
       };  

        $scope.documents = [];
        $http.get('ajax/getDetalleCurso.php')
          .then(function(result) {
            $scope.documents = result.data;
            $scope.totalItems = $scope.documents.length; 
            $scope.filteredItems = $scope.documents.length; //Initially for no filter 
        });
          
       $scope.numPerPage = 15;  
       $scope.paginate = function (value) {  
         var begin, end, index;  
         begin = ($scope.currentPage - 1) * $scope.numPerPage;  
         end = begin + $scope.numPerPage;  
         index = $scope.documents.indexOf(value);  
         return (begin <= index && index < end);  
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
          title:'My Big Table'
        },
        style:'background:#FFFFFF',
        column: {
          style:'background:#99CAC0'
        },
        columns: [

                            {columnid:'ciclo',title: 'Ciclo',width: '35px'},
                            {columnid:'mes',title: 'Mes',width: '30px'},
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

                            {columnid:'inscritos',title: 'Inscritos',width: '72px'},
                            {columnid:'aprobados',title: 'Aprobados',width: '72px'},
                            {columnid:'aprobacion',title: 'Aprobacion',width: '72px'},
                            {columnid:'pendientes',title: 'Pendientes',width: '72px'},
                            {columnid:'retiros',title: 'Retiros',width: '72px'},

                            {columnid:'horas_dictadas',title: 'H Dictadas',width: '72px'},
                            {columnid:'horas_asistidas',title: 'H Asistidas',width: '72px'},
                            {columnid:'asistencia',title: 'Asistencia',width: '72px'},

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

        $scope.filter = function() {
            $timeout(function() { 
                $scope.filteredItems = $scope.filtered.length;
            }, 10);
        };

    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

    $scope.exportDetalleCurso = function () {
            alasql('SELECT * INTO XLS("Detalle_Curso.xls",?) FROM ?',[mystyle,$scope.documents]);
    };
     });  










