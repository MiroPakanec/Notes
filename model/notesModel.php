<?php

  /**
   *  NotesModel class
   *  encapsulates individual currencies
   */
  Class NotesModel{

      private $id;
      private $title;
      private $text;
      private $date;

      public function __construct($id, $title, $text, $date){
        $this->id = $id;
        $this->title = $title;
        $this->text = $text;
        $this->date = $date;
      }

      public function getId(){
        return $this->id;
      }

      public function getTitle(){
        return $this->title;
      }

      public function getText(){
        return $this->text;
      }

      public function getDate(){
        return $this->date;
      }

      public function setId($value){
        $this->id = $value;
      }

      public function setTitle($value){
        $this->title = $value;
      }

      public function setText($value){
        $this->text = $value;
      }

      public function setDate($value){
        $this->date = $value;
      }
  }

?>
