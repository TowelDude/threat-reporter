
<?php
if(isset($_GET["get"]))
{

  switch ($_GET["get"]) {
    case 'attacks':
      if(isset($_GET["type"])){
        header("Content-type: text/csv");
        $csv = fopen('data/attacks.csv','r');

        echo implode(',',fgetcsv($csv, 1000, ',')) . "\n";

        while (($books = fgetcsv($csv, 1000, ','))!== false) {
            if(strtolower($books[7]) == strtolower($_GET["type"])){
                echo implode(',', $books) . "\n";
            }
        }
        fclose($csv);
      }
      break;
    case 'report':
      if(isset($_GET["type"]))
      {
          $json = json_decode(file_get_contents('data/reports.json'));
          header('Content-Type: application/json');
          $list = array();
          foreach ($json->reports as $obj => $value) {
              if(strtolower($value->details->type) == strtolower($_GET["type"]))
              {
                  echo json_encode($value);
                  die();
              }
            }
      }
      break;
    case 'workflow':
      if(isset($_GET["type"]))
      {
        $json = json_decode(file_get_contents('data/reports.json'));
        foreach ($json->reports as $obj => $value) {
          if(strtolower($value->details->type) == strtolower($_GET["type"])){
            //echo str_replace("\n","<br/>",$value->workflow);
            echo $value->workflow;
            die();
          }
        }
      }
    break;
      }
    }

?>
