function findNote(){

  var htmlCode =
  '<div class="findMainArea">'+
    '<div class="FindTitleHeader">Enter Title</div>' +
    '<div class="FindTitleArea">'+
      '<input type="text" id="findTitle" class="findNoteTitle" name="FindNoteTitle" value="" onkeyup="findNoteConfirm();">'+
    '</div>'+
    '<div class="findSubmit">'+
      '<input type="button" class="buttonNew buttonCancelFind" value="CANCEL", name="cancel" onclick="cancelFindNote();"'+
    '</div>'+
  '</div>'+
  '<div class="findNoteOutput" id="findNoteOutput">' +
  '</div>';

  document.getElementById("onNewClick").innerHTML = '';
  document.getElementById("onFindClick").innerHTML = htmlCode;
}

function cancelFindNote(){
  document.getElementById("onFindClick").innerHTML = "";
  loadNotes();
}

function findNoteConfirm(){

  // Create our XMLHttpRequest object
  var hr = new XMLHttpRequest();
  // Create some variables we need to send to our PHP file
  var url = "view/js/responses/findNote.php";
  var title = document.getElementById("findTitle").value;
  var vars = "title="+title;
  hr.open("POST", url, true);
  // Set content type header information for sending url encoded variables in the request
  hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Access the onreadystatechange event for the XMLHttpRequest object
  hr.onreadystatechange = function() {
    if(hr.readyState == 4 && hr.status == 200) {
      var return_data = readResponseFind(hr);
    }
  }
  // Send the data to PHP now... and wait for response to update the status div
  hr.send(vars); // Actually execute the request
}

function readResponseFind(hr){

  var htmlCode = '';
  xmlResponse = hr.responseXML;
  xmlDocumentElement = xmlResponse.documentElement;
  //message = xmlDocumentElement.firstChild.data;

  var notesLen = xmlDocumentElement.getElementsByTagName("note").length;

  //loop response to number of 'currency' elements
  for(i = 0; i<notesLen; i++){

    //get currency tag
    var note = xmlDocumentElement.getElementsByTagName("note")[i];
    var id = note.getElementsByTagName("id")[0].firstChild.data;
    var title = note.getElementsByTagName("title")[0].firstChild.data;
    var text = note.getElementsByTagName("text")[0].firstChild.data;
    var date = note.getElementsByTagName("date")[0].firstChild.data;

    //generate html
    htmlCode += generateHtml(id, title, text, date, i);
  }

  document.getElementById("onLoad").innerHTML = htmlCode;

}
