angular.module("chatApp").controller("mainCtrl", function($scope, mainServ){

  // Declare and set default values for chats and current Gif
  $scope.allPostedChats = "Loading chat data!";     // This will hold the chat message array. The string will display until array is loaded.
  $scope.currentGif = {                             // This object will hold the current gif image on display for everyone.
    url: "http://i.giphy.com/pJuWoH6laWXN6.gif",
    query: "terrible default orca legs image",
    date: new Date
  };

  // Function that creates/prepares a chat object to be saved in the database and passes it to the function that performs the POST
  $scope.postChat = function(chatString){
    var chat = {};                        // initialize the object
    chat.currentGifQuery = $scope.currentGif.query // So we can recalll what the user was commenting on
    chat.currentGifUrl = $scope.currentGif.url     // Enables us to recall the image for context after currentGif has changed
    chat.body = chatString;               // holds the chat string
    chat.date = new Date;                 // sets the date
    chat.date = chat.date.toDateString(); // formats the date for humans
    mainServ.postChat(chat)               // This function POSTs the new message
    .then(function(){
      mainServ.getChats()                 // Then we'lll get new chats to update the list
      .then(function(response){
        $scope.allPostedChats = response.data;
      });
    });
  },

 // this function calls giphy api with users search query, then saves the first response in the database and updates the currentGif.
  $scope.postNewGif = function(gifQuery){
    mainServ.getGiphy(gifQuery)               // request gif from giphy api
    .then(function(response){
      var gifObject = {};                     // create new object to save in database for all to access
      gifObject.url = response.data[0].images.original.url // We are only using the first item from Giphy's response, can probly get API to only send one later
      gifObject.date = new Date;              // Timestamp
      gifObject.query = gifQuery;             // Saves the query to give context to chat comments on this image as the current gif continues to change
      mainServ.postToCurrentGiphy(gifObject); // Sends gifObject to the database so it can be shared with all viewers.
      $scope.currentGif = gifObject;          // Saves gif object to currentGif rather than call the server for the image we just sent.
    });
  },

  $scope.update = function(){                     // this function loads the currentGif when page loads
    mainServ.getCurrentGiphy()                  // get current gif from server
      .then(function(response){
        console.log("getCurrentGiphy completed", response);
        if(response[0]){                      // We want to leave the default gif settings intact if there is no data (no query yet submitted)
          $scope.currentGif = response[0];    // Save current gif data to variable that can be used on the page
          console.log("$scope.currrentGif", $scope.currentGif)
        }
    });
    mainServ.getChats()                         // Get chat messages from server
      .then(function(response){
        console.log('getChats completed', response)
        $scope.allPostedChats = response.data;  // Set response from server to variable that can be displayed
    });
  },

  $scope.update();                                // calling the function that loads the initial data


});
