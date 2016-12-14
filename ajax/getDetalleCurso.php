<?php
include('config.php');

function utf8_encode_recursive ($array)
{
    $result = array();
    foreach ($array as $key => $value)
    {
        if (is_array($value))
        {
            $result[$key] = utf8_encode_recursive($value);
        }
        else if (is_string($value))
        {
            $result[$key] = utf8_encode($value);
        }
        else
        {
            $result[$key] = $value;
        }
    }
    return $result;
}

$query="select ciclo, mes, id_empresa, curso, programa, sesion, tipo_capacitacion, modalidad, expositor, f_inicio, f_fin, sesiones, horas_lectivas, inscritos, aprobados, aprobacion, pendientes, retiros, horas_dictadas, horas_asistidas, asistencia, fb_curso, fb_utilidad, fb_expositor from cap_detalle_curso";

$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_array()) {
		$arr[] = $row;	
	}
}

# JSON-encode the response
$json_response = json_encode(utf8_encode_recursive($arr));

// # Return the response
echo $json_response;
?>
