
$.ajax({
type: 'GET',
url: 'ajax/getAsistenciaAprobacion.php?filtro=anio,id_empresa&data=2016,008',
dataType: "json",
contentType: "application/json; charset=utf-8",
success: function (json) {
     Morris.Line({
        element: 'asistencia',
        data: json,
        xkey: 'mes',
        ykeys: ['asistencia','aprobacion'],
        labels: ['asistencia','aprobacion'],
        parseTime: false,
        lineColors: ['#5d9cec', '#5fbeaa'],
        postUnits: '%',
        hideHover: true,
        goals: [80],
        goalLineColors: ['#FF0066']
      });
    }
});

$.ajax({
type: 'GET',
url: 'ajax/getSatisfaccion.php?filtro=anio,id_empresa&data=2016,008',
dataType: "json",
contentType: "application/json; charset=utf-8",
success: function (json) {
     Morris.Line({
        element: 'satisfaccion',
        data: json,
        xkey: 'mes',
        ykeys: ['fb_curso','fb_utilidad','fb_expositor'],
        labels: ['Curso','Utilidad','Expositor'],
        parseTime: false,
        lineColors: ['#5d9cec', '#5fbeaa', '#4c5667'],
        ymin: 3,
        ymax: 5,
        hideHover: true,
        goals: [4.2],
        goalLineColors: ['#FF0066']
      });
    }
});

$.ajax({
type: 'GET',
url: 'ajax/getDistribucionAreas.php?filtro=anio,id_empresa&data=2016,008',
dataType: "json",
contentType: "application/json; charset=utf-8",
success: function (json) {
     Morris.Donut({
        element: 'distribucion_areas',
        parseTime: false,
        data: json,
        resize: true,
        colors: ['#5d9cec', '#5fbeaa', '#4c5667'],
        formatter: function (y, data) {return y + '%'} 
      });
    }
});

