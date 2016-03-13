var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
  var xmlHttp;
  //check if the user is running internet explorer
  if(window.ActiveXObject){
    try{
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch(e){
      xmlHttp = false;
    }
  }
  else{
    try{
      xmlHttp = new XMLHttpRequest();
    }
    catch(e){
      xmlHttp = false;
    }
  }
  //if variable was not assigned successfully
  if(!xmlHttp){
    alert("Unable to communicate with the Server");
  }
  else{
    return xmlHttp;
  }
}

function loadNotes(){

    //check ready state to send request
    if(xmlHttp.readyState==4 || xmlHttp.readyState==0 ){
        //get response from convertorResponses.php
        xmlHttp.open("GET", "view/js/responses/loadNotes.php", true);
        //handle response
        xmlHttp.onreadystatechange = handleServerResponse;
        xmlHttp.send(null);
    }
    else{

        //try again after 0.1s
        setTimeout('loadNotes()', 100);
    }
}

function handleServerResponse(){

  if( xmlHttp.readyState==4){

    //if status code is 'OK'
    if(xmlHttp.status==200){

        //read returned XML response and process it
        readResponse();
        //calculate and output response result
    }
    else{

      alert('Something went wrong');
      setTimeout('loadNotes()', 100);
    }
  }
}


function readResponse(){

      var htmlCode = '';

      xmlResponse = xmlHttp.responseXML;
      xmlDocumentElement = xmlResponse.documentElement;
      //message = xmlDocumentElement.firstChild.data;
      //alert(message);

      //number of note tags
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

function generateHtml(id, title, text, date, i){

  html = '<div class="loadedNote" id="'+id+'">'+
            '<div class="loadedNoteId" id="'+id+'">' + id +
            '</div>' +
            '<div class="loadedNoteTitle">'+
              '<input type="text" class="loadTitle" name="loadNoteTitle" value="' + title + '">'+
            '</div>'+
            '<div class="loadedNoteText">' +
              '<textarea rows="4" cols="50" class="loadText">'+text+'</textarea>'+
            '</div>'+
            '<div class="loadedNoteDate">' + date + '</div>'+
            '<input type="button" name="findDeleteButton" value="delete" class="buttonFind" onclick="deleteNote(parentNode.id);">' +
            '<input type="button" name="findUpdateButton" value="update" class="buttonFind" onclick="updateNote(parentNode.id);">' +
         '</div>';

    return html;
}
