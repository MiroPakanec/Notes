<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/projects/notes/notes/controller/notesController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/projects/notes/notes/model/notesModel.php';


$notesController = new NotesController();
$modelArray = $notesController->loadNotes('');

//forms response is in xml
header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>';

//root element
echo '<response>';
  foreach ($modelArray as $element) {
    echo '<note>';
      echo '<id>';
        echo $element->getId();
      echo '</id>';
      echo '<title>';
        echo $element->getTitle();
      echo '</title>';
      echo '<text>';
        echo $element->getText();
      echo '</text>';
      echo '<date>';
        echo $element->getDate();
      echo '</date>';
    echo '</note>';
  }
echo '</response>';

?>
