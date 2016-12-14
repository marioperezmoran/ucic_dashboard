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

$query="select nivel1, indicador, ene as 'resultado' from cap_detalle_areas";

if(isset($_GET['filtro']) && isset($_GET['data'])){

    $filtros = explode(',',$_GET['filtro']);
    $datos = explode(',',$_GET['data']);

    $query .= " where " . $filtros[0] . "=" . $datos[0] . " and " . $filtros[1] . "=" . $datos[1]. " and " . $filtros[2] . "=" . $datos[2]. " and " . $filtros[3] . "=" . $datos[3];

}

$query .="union select nivel1, indicador, feb as 'resultado' from cap_detalle_areas";

if(isset($_GET['filtro']) && isset($_GET['data'])){

    $filtros = explode(',',$_GET['filtro']);
    $datos = explode(',',$_GET['data']);

    $query .= " where " . $filtros[0] . "=" . $datos[0] . " and " . $filtros[1] . "=" . $datos[1]. " and " . $filtros[2] . "=" . $datos[2]. " and " . $filtros[3] . "=" . $datos[3];

}

$query .="union select nivel1, indicador, mar as 'resultado' from cap_detalle_areas";

if(isset($_GET['filtro']) && isset($_GET['data'])){

    $filtros = explode(',',$_GET['filtro']);
    $datos = explode(',',$_GET['data']);

    $query .= " where " . $filtros[0] . "=" . $datos[0] . " and " . $filtros[1] . "=" . $datos[1]. " and " . $filtros[2] . "=" . $datos[2]. " and " . $filtros[3] . "=" . $datos[3];

}




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
