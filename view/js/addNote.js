function newNote(){

  var htmlCode =
  '<div class="newMainArea">'+
    '<div class="newTitleArea">'+
      '<input type="text" id="newTitle" class="NoteTitle" name="NoteTitle" value="TITLE">'+
    '</div>'+
    '<div class="newTextArea">'+
      '<textarea rows="4" cols="50" class="NoteText" id="newText"></textarea>'+
    '</div>'+
    '<div class="newSubmit">'+
      '<input type="button" class="buttonNew buttonOk" value="ADD", name="submit" onclick="submitNote();">'+
    '</div>'+
    '<div class="newSubmit">'+
      '<input type="button" class="buttonNew" value="CANCEL", name="cancel" onclick="cancelNewNote();"'+
    '</div>'+
  '</div>'+
  '<div class="addNoteOutput" id="addNoteOutput">' +
  '</div>';

  document.getElementById("onNewClick").innerHTML = htmlCode;
  document.getElementById("onFindClick").innerHTML = "";
}

function cancelNewNote(){

    document.getElementById("onNewClick").innerHTML = "";
}

function submitNote(){

  // Create our XMLHttpRequest object
  var hr = new XMLHttpRequest();
  // Create some variables we need to send to our PHP file
  var url = "view/js/responses/addNote.php";
  var title = document.getElementById("newTitle").value;
  var text = document.getElementById("newText").value;
  var vars = "title="+title+"&text="+text;
  hr.open("POST", url, true);
  // Set content type header information for sending url encoded variables in the request
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Access the onreadystatechange event for the XMLHttpRequest object
  hr.onreadystatechange = function() {
    if(hr.readyState == 4 && hr.status == 200) {
      var return_data = hr.responseText;
    document.getElementById("addNoteOutput").innerHTML = return_data;
    loadNotes();
    emptyFields();
    }
  }
  // Send the data to PHP now... and wait for response to update the status div
  hr.send(vars); // Actually execute the request
  document.getElementById("addNoteOutput").innerHTML = "processing...";
}

function emptyFields(){

  document.getElementById("newTitle").value = "";
  document.getElementById("newText").value = "";
}
