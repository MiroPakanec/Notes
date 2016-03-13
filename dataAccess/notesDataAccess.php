<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/projects/notes/notes/model/notesModel.php';

  Class NotesDataAccess{

    public function addNote($noteModel){

      try{

        DEFINE ('DB_USER', 'root');
        DEFINE ('DB_PASSWORD', '');
        DEFINE ('DB_HOST', 'localhost');
        DEFINE ('DB_NAME', 'notesdb');

        $dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
        OR die('Could not connect ');

        $query = 'INSERT INTO notes (title, text, date) VALUES (?, ?, NOW())';
        $stmt = mysqli_prepare($dbc, $query);

        $title = $noteModel->getTitle();
        $text = $noteModel->getText();

        mysqli_stmt_bind_param($stmt, "ss", $title, $text);
        mysqli_stmt_execute($stmt);
        $affectedRows = mysqli_stmt_affected_rows($stmt);

        if($affectedRows == 1)
          return 'Note added';
        else
          return 'Unable to add note';

        mysqli_stmt_close($stmt);
        mysqli_close($dbc);
      }
      catch(Exception $e){
        return 'Unable to add Note';
      }
    }

    public function loadNotes($titleWhere){

      try{

        DEFINE ('DB_USER', 'root');
        DEFINE ('DB_PASSWORD', '');
        DEFINE ('DB_HOST', 'localhost');
        DEFINE ('DB_NAME', 'notesdb');

        $dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
        OR die('Could not connect ');

        if($titleWhere == null){
          $query = "SELECT id, title, text, date FROM notes";
        }
        else{
          $query = "SELECT id, title, text, date FROM notes WHERE title LIKE '%".$titleWhere."%'";
        }

        $response = @mysqli_query($dbc, $query);
        $array =  array();

        if($response){
            while($row = mysqli_fetch_array($response)){

              $id = $row['id'];
              $title = $row['title'];
              $text = $row['text'];
              $date = $row['date'];

              $title = $this->checkEmpty($title);
              $text = $this->checkEmpty($text);
              $date = $this->checkEmpty($date);

              $modelObject = new NotesModel($id, $title, $text, $date);
              array_push($array, $modelObject);
            }
        }
        else {
          return 'could not fetch data';
        }

        mysqli_close($dbc);
        return $array;
      }
      catch(Exception $e){
        return 'ERR';
      }
    }

    public function deleteNote($id){

      try{

        DEFINE ('DB_USER', 'root');
        DEFINE ('DB_PASSWORD', '');
        DEFINE ('DB_HOST', 'localhost');
        DEFINE ('DB_NAME', 'notesdb');

        $dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
        OR die('Could not connect ');

        $sql = "DELETE FROM notes WHERE id=".$id;

        if ($dbc->query($sql) === TRUE) {
            return "Record deleted successfully";
        } else {
            return "Error while deleting record";
        }

          $dbc->close();
      }
      catch(Exception $e){
        return "Error while deleting record";
      }
    }

    public function updateNote($id, $title, $text){

      try{

        DEFINE ('DB_USER', 'root');
        DEFINE ('DB_PASSWORD', '');
        DEFINE ('DB_HOST', 'localhost');
        DEFINE ('DB_NAME', 'notesdb');

        $dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
        OR die('Could not connect ');

        $sql = "UPDATE notes SET title='".$title."' , text='".$text."' WHERE id=".$id;

        if ($dbc->query($sql) === TRUE) {
            return "Record updated successfully";
        } else {
            return "Error while updating record";
        }

          $dbc->close();
      }
      catch(Exception $e){
        return "Error while deleting record";
      }
    }

    private function checkEmpty($var){
      if(empty($var))
        return ' ';

      return $var;
    }
  }
?>
