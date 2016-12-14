<?php
ini_set('memory_limit', '1G'); // or you could use 1G
include('config.php');

$query="select * from cap_detalle_inscrito";

$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_array()) {
		$arr[] = $row;	
	}
}

# JSON-encode the response
$json_response = json_encode($arr);

// # Return the response
echo $json_response;
?>
