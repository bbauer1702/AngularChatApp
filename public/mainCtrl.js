angular.module("chatApp").controller("mainCtrl", function($scope, mainServ){


  $scope.allPostedChats = "zippers";

  // Function that creates/prepares a chat object to be saved in the database and passes it to the function that performs the POST
  $scope.postChat = function(chatString){
    var chat = {};                        // initialize the object
    chat.body = chatString;               // holds the chat string
    chat.date = new Date;                 // sets the date
    chat.date = chat.date.toDateString(); // formats the date for humans
    mainServ.postChat(chat)
    .then(function(){
      mainServ.getChats()
      .then(function(response){
        $scope.allPostedChats = response.data;
      });
    });              // This function POSTs the new message
  }
});
