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
      var host = "82.20.252.21"; //host IP
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
        clickHandler(); //clear popup.html table
        for (i = 0; i < reviews.length; i++) { //populate popup.html table
          var table = document.getElementById("table");
          var row = table.insertRow(i);
          var cell = row.insertCell(0);
          cell.innerHTML = reviews[i].replace(/["[]/g, ''); //replace unrequired symbols that were in the JSON file
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
        //"good" terms
        $("table").highlight(["good", "great", "nice", "thankful", "useful", "amazed", "amazing", "fantastic", "glad", "happy", "helpful", "pleased"], {
          className: 'good'
        });
        //"bad" terms
        $("table").highlight(["bad", "wrong", "awful", "terrible", "delightful", "dislike", "annoyed", "hopeless", "sad"], {
          className: 'bad'
        });
      };}

      // close socket 
      ws.onclose = function(evt) {
        $("div#message_details").empty();
      };

      // on open
      ws.onopen = function(evt) {
        $("div#message_details").show(); //show the controls
      };


      // on send clicked
      //get filter settings + key-terms
      $("#send").click(function(evt) {
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

