<?php
  include_once $_SERVER['DOCUMENT_ROOT'].'/projects/notes/notes/controller/notesController.php';

  $id = $_POST['id'];

  $controllerObject = new notesController();
  $message = $controllerObject->deleteNote($id);

  echo $message;
 ?>
