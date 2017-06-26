//Get the current tab's URL - it includes the product ASIN
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

//on document load
document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // log function for debugging
    log = function(data) {
      $("div#terminal").prepend("</br>" + data);
      console.log(data);
    };
    $(document).ready(function() {
      $("div#message_details").hide()

      //host address and port via websocket connection
      var ws;
      var host = "wdan96.ddns.net"; //host IP  //90.254.160.246
      var port = "8888" //host receiving port
      var uri = "/ws"

      // websocket instance
      ws = new WebSocket("ws://" + host + ":" + port + uri);

      
      // on incoming message 
      ws.onmessage = function(evt) {
        evt.preventDefault();
        hidden = document.getElementById("hidden"); //remove loading bar
        hidden.style.display = "none";
        var sep = "\","; 
        reviews = evt.data.split(sep); //seperate incoming results on comma
        var numRev = reviews.length;
        clickHandler(); //clear popup.html table
        for (i = 0; i < reviews.length; i++) { //populate popup.html table
          var table = document.getElementById("table");
          var row = table.insertRow(i);
          var cell = row.insertCell(0);
          cell.innerHTML = reviews[i].replace(/["[]/g, ''); //replace unrequired symbols that were in the JSON file
}
 var info = document.getElementById("info");
info.innerHTML = numRev-1 + " reviews found.";        
if (numRev > 200)
{
   info.innerHTML = "Over 300 reviews found. Try narrowing your search with an additional keyterm or filter";
}
        

        
        

        var strings = $("#message").val(); //key-terms
        words = strings.toString();
        var array = words.split(" ");

        //highlighter - if selected
        var highlighter = document.getElementById("isHighlighted")
        if (highlighter.checked) {
        for (i = 0; i < array.length; i++) {
          $("table").highlight(array[i]);
        }
}

var highlighter = document.getElementById("isAdj")
if(highlighter.checked){

//"good" terms
        $("table").highlight(["good", "great", "nice", "thankful", "useful", "amazed", "amazing", "fantastic", "glad", "happy", "helpful", "pleased"], {
          className: 'good'
        });
        //"bad" terms
        $("table").highlight(["bad", "wrong", "awful", "terrible", "delightful", "dislike", "annoyed", "hopeless", "sad"], {
          className: 'bad'
        });
      ;}

  
}

        







      // close socket 
      ws.onclose = function(evt) {
        $("div#message_details").empty();
      };

      // on open
      ws.onopen = function(evt) {
        console.log("ws.onopen");
        $("div#message_details").show(); //show the controls
      };


      // on send clicked
      //get filter settings + key-terms
      $("#send").click(function(evt) {

      if (url.includes("www.amazon.co.uk") == false){
        var info = document.getElementById("info");
        info.innerHTML="please navigate to an Amazon product page to begin";
        return;
      }

      if ($("#message").val() == ""){
        var info = document.getElementById("info");
        info.innerHTML="please enter at least one keyword";
        return;
      }

      console.log("about to send");
      var ratings = document.getElementById("star")
      var rating = ratings.options[ratings.selectedIndex].value;
      var type = document.getElementById("verified")
      var chosenType = type.options[type.selectedIndex].value;
      var revlen = document.getElementById("revLength")
      var lenSet = "0";
      if (revlen.checked) lenSet = "1"
      ws.send($("#message").val() + "," + url + "," + rating + "," + chosenType + "," + lenSet); //concat message

      //set loading container active
       hidden = document.getElementById("hidden");
       hidden.style.display = "block";
      })
    });
  });
});
//table row clearer
function clickHandler() {
  table = document.getElementById("table");
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}

