angular.module("chatApp").service("mainServ", function($http){


this.getChats = function(){
  return $http({
    method: "GET",
    url: "/chat"
  }).then(function(response){
    console.log('got chats', response);
    return response;
  })
},

this.postChat = function(data){
  return $http({
    method: "POST",
    url: "/chat",
    data: data
  }).then(function(response){
    console.log("postChat response", response);
    return response;
  })
}

});
