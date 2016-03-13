<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/projects/notes/notes/dataAccess/notesDataAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/projects/notes/notes/model/notesModel.php';


  Class NotesController{

      public function addNote($title, $text){

        $notesModel = new NotesModel(null, $title, $text, null);
        $notesDataAccess = new NotesDataAccess();

        return $notesDataAccess->addNote($notesModel);
      }

      public function loadNotes($titleWhere){

        $notesDataAccess = new NotesDataAccess();
        return $notesDataAccess->loadNotes($titleWhere);
      }

      public function deleteNote($id){

        $notesDataAccess = new NotesDataAccess();
        return $notesDataAccess->deleteNote($id);
      }

      public function updateNote($id, $title, $text){

        $notesDataAccess = new NotesDataAccess();
        return $notesDataAccess->updateNote($id, $title, $text);
      }
  }

?>
