<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/projects/notes/notes/controller/notesController.php';

  $title = $_POST['title'];
  $text = $_POST['text'];

  $controllerObject = new notesController();
  $message = $controllerObject->addNote($title, $text);

  echo $message;
 ?>
