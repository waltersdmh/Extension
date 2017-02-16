
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









document.addEventListener('DOMContentLoaded', function () {

document.getElementById('deletestuff').addEventListener('click', clickHandler);

getCurrentTabUrl(function(url) {
    
    
  
  console.log(url);
  
      // log function
      log = function(data){
        $("div#terminal").prepend("</br>" +data);
        console.log(data);
      };
 
      $(document).ready(function () {
        $("div#message_details").hide()
 
        var ws;
 
        $("#open").click(function(evt) {
          evt.preventDefault();
 
          var host = "localhost";
          var port = "8888"
          var uri = "/ws"
 
          // create websocket instance
          ws = new WebSocket("ws://" + host + ":" + port + uri);
           
          // Handle incoming websocket message callback
          ws.onmessage = function(evt) {
            
     //       log("Message Received: " + evt.data)
            var sep = "\",";
            reviews = evt.data.split(sep)
            clickHandler();
            for (i = 0; i < reviews.length; i++){
      //        var para = document.createElement("tr");
       //       var t = document.createTextNode(reviews[i]);     
      //        para.appendChild(t);     

var table = document.getElementById("table");
           var row = table.insertRow(i);
           var cell = row.insertCell(0);
           cell.innerHTML = reviews[i];
     //      $("table").highlight(["watch", "good", "bad"]);

    //      console.log(strings);

         
                                          // Append the text to <p>
           //   document.getElementById("test").appendChild(para);
          //    var span = $("test");
         //     span.html(span.html().replace(/#camera/g, '<span style="color: red">$&</span>'));
              
            }

            var strings = $("#message").val();
            words = strings.toString();
            var array = words.split(" ");


             for (i = 0; i < array.length; i++){
           $("table").highlight(array[i]);  
          }


          $("table").highlight("good", { className: 'good' });
          $("table").highlight("bad", { className: 'bad' });
                                   // Create a <p> element
       // Create a text node

          



            };
 
          // Close Websocket callback
          ws.onclose = function(evt) {
            log("***Connection Closed***");
            alert("Connection close");
            $("#host").css("background", "#ff0000"); 
            $("#port").css("background", "#ff0000"); 
            $("#uri").css("background",  "#ff0000");
            $("div#message_details").empty();
 
            };
 
          // Open Websocket callback
          ws.onopen = function(evt) { 
            $("#host").css("background", "#00ff00"); 
            $("#port").css("background", "#00ff00"); 
            $("#uri").css("background", "#00ff00");
            $("div#message_details").show();
            log("***Connection Opened***");
          };
        });
 
        // Send websocket message function
        $("#send").click(function(evt) {
            log("Sending Message: "+$("#message").val());
            ws.send($("#message").val()+","+url);
            
        });
 
      });
});


});

function clickHandler() {
  table = document.getElementById("table");
  while(table.rows.length > 0) {
  table.deleteRow(0);
}
}


/*

function renderURL() {
  var statusText = getCurrentTabUrl();
  var n = statusText.indexOf("/dp/");
  n = n +4;
  console.log(n);
  var asin = statusText.substring(n,n+10);
  callback(asin)
}

function getProdPageAmazon() {
  var asin = renderURL();
  var urlx = "https://www.amazon.co.uk/product-reviews/" + asin + "/ref=cm_cr_dp_see_all_summary?ie=UTF8&reviewerType=all_reviews&showViewpoints=1&sortBy=helpful"
  $.get(urlx, function( source ) {
    console.log(source);
});

}





//occurs on document load.
document.addEventListener('DOMContentLoaded', function() {
  console.log("popup.js loaded");
  getProdPageAmazon();

});*/