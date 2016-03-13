<?php
  include_once $_SERVER['DOCUMENT_ROOT'].'/projects/notes/notes/controller/notesController.php';

  $id = $_POST['id'];
  $title = $_POST['title'];
  $text = $_POST['text'];

  $controllerObject = new notesController();
  $message = $controllerObject->updateNote($id, $title, $text);

  //$message = $id.$title.$text;
  echo $message;
 ?>
