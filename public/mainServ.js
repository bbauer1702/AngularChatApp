angular.module("chatApp").service("mainServ", function($http){

// This will request gifs from teh Giphy api. "horrible" is prepended to the users' query to make the results more horrible.
this.getGiphy = function(query){
  return $http({
    method: "GET",
    url: "http://api.giphy.com/v1/gifs/search?q=horrible+" + query + "&api_key=dc6zaTOxFJmzC"
  }).then(function(response){
    return response.data;
  })
},

// Gets the most recent single entry from our gif database of users' queries. All users will see the most recent gif.
this.getCurrentGiphy = function(){
  return $http({
    method: "GET",
    url: "/gif"
  }).then(function(response){
    return response.data;
  })
},

// After a user has queried the giphy API and received a response, this function is used to post the data from Giphy's first response back to our database so that it can be shared with all other users.
this.postToCurrentGiphy = function(gifModel){
  return $http({
    method: "POST",
    url: "/gif",
    data: gifModel
  }).then(function(response){
  })
},

// Gets a current list of all chat messages ever. If this were expected to be used heavily I might need to reduce the number of chats coming back at once.
this.getChats = function(){
  return $http({
    method: "GET",
    url: "/chat"
  }).then(function(response){
    return response;
  })
},


// Posts a new chat message to the server
this.postChat = function(data){
  return $http({
    method: "POST",
    url: "/chat",
    data: data
  }).then(function(response){
    return response;
  })
}

});
