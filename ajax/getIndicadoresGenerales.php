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

$query="select resultado from cap_indicadores_generales";

if(isset($_GET['filtro']) && isset($_GET['data'])){

    $filtros = explode(',',$_GET['filtro']);
    $datos = explode(',',$_GET['data']);

    $query .= " where " . $filtros[0] . "= " . $datos[0] . " and " . $filtros[1] . "= " . $datos[1] . " and " . $filtros[2] . "= '" . $datos[2] . "'";

}

$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
$row = $result->fetch_row();
$resultado = (string)$row[0];
echo $resultado;

?>