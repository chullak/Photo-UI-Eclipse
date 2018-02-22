var MyApp=angular.module("myModule",["ngRoute"]);

MyApp.config(function ($routeProvider) {
    $routeProvider
    .when("/user", {
        templateUrl: "template/user/list.html",
        controller: "userListController"
    }).when("/user/:id", {
        templateUrl: "template/user/view.html",
        controller: "userViewController"
    }).when("/user/:id/edit", {
        templateUrl: "template/user/edit.html",
        controller: "userViewController"
    }).when("/user-new", {
        templateUrl: "template/user/new.html",
        controller: "userNewController"
    }).when("/album/:id", {
        templateUrl: "template/album/view.html",
        controller: "albumViewController"
    }).when("/album/:id/edit", {
        templateUrl: "template/album/edit.html",
        controller: "albumViewController"
    }).when("/user/:userId/album", {
        templateUrl: "template/album/new.html",
        controller: "albumNewController"
    }).when("/photo/:id", {
        templateUrl: "template/photo/view.html",
        controller: "photoViewController"
    }).when("/photo/:id/edit", {
        templateUrl: "template/photo/edit.html",
        controller: "photoViewController"
    }).when("/album/:albumId/photo", {
        templateUrl: "template/photo/new.html",
        controller: "photoNewController"
    })

});

MyApp.controller("userListController",function($scope,$http,$route,$rootScope){
	$http.get("http://localhost:8080/PhotoApp/user").then(function (response){
			$scope.users=response.data;
		
	});
	$scope.reload=function(){
		$scope.loading=true;
		$http.get("http://localhost:8080/PhotoApp/reload").then(function (response){
			$route.reload();
			$scope.loading=false;
		});
	}
	
}).controller("userViewController",function($scope,$http,$routeParams,$location,$route){
	
	$http.get("http://localhost:8080/PhotoApp/user/"+$routeParams.id).then(function (response){
		$scope.user=response.data;
	});
	
	$http.get("http://localhost:8080/PhotoApp/user/"+$routeParams.id+"/album").then(function (response){
		$scope.albums=response.data;
	});
	
	$scope.deleteAlbum= function(albumId){
		$http.delete("http://localhost:8080/PhotoApp/album/"+albumId).then(function (response){
			$route.reload();
		});
	};	

	$scope.update= function(){
		$http.put("http://localhost:8080/PhotoApp/user/"+$routeParams.id, $scope.user).then(function (response){
	    	$location.path('user/'+$routeParams.id).replace();
		});
	};	
	
}).controller("userNewController",function($scope,$http,$routeParams,$location){
			
	$scope.save= function(){
		$http.post("http://localhost:8080/PhotoApp/user", $scope.user).then(function (response){;
	    	$location.path('user').replace();
		});
	};	
	
});

MyApp.controller("albumListController",function($scope,$http){
	$http.get("http://localhost:8080/PhotoApp/album").then(function (response){
			$scope.albums=response.data;
		
	});
	
}).controller("albumViewController",function($scope,$http,$routeParams,$location,$route){
	
	$http.get("http://localhost:8080/PhotoApp/album/"+$routeParams.id).then(function (response){
		$scope.album=response.data;
	});
	$http.get("http://localhost:8080/PhotoApp/album/"+$routeParams.id+"/photo").then(function (response){
		$scope.photos=response.data;
	});

	$scope.deletePhoto= function(photoId){
		$http.delete("http://localhost:8080/PhotoApp/photo/"+photoId).then(function (response){
			$route.reload();
		});
	};	

	$scope.update= function(){
		$http.put("http://localhost:8080/PhotoApp/album/"+$routeParams.id, $scope.album).then(function (response){
	    	$location.path('album/'+$routeParams.id).replace();
		});
	};	
	
}).controller("albumNewController",function($scope,$http,$routeParams,$location){
			
	$scope.save= function(){
		$scope.album.userId=$routeParams.userId;
		$http.post("http://localhost:8080/PhotoApp/album", $scope.album).then(function (response){;
	    	$location.path('user/'+$routeParams.userId).replace();
		});
	};	
	
});

MyApp.controller("photoListController",function($scope,$http){
	$http.get("http://localhost:8080/PhotoApp/photo").then(function (response){
			$scope.photos=response.data;
		
	});
	
}).controller("photoViewController",function($scope,$http,$routeParams,$location){
	
	$http.get("http://localhost:8080/PhotoApp/photo/"+$routeParams.id).then(function (response){
		$scope.photo=response.data;
	});
	$scope.update= function(){
		$http.put("http://localhost:8080/PhotoApp/photo/"+$routeParams.id, $scope.photo).then(function (response){
	    	$location.path('photo/'+$routeParams.id).replace();
		});
	};	
	
}).controller("photoNewController",function($scope,$http,$routeParams,$location){
			
	$scope.save= function(){
		$scope.photo.albumId=$routeParams.albumId;
		
		$http.post("http://localhost:8080/PhotoApp/photo", $scope.photo).then(function (response){;
	    	$location.path('album/'+$routeParams.albumId).replace();
		});
	};	
	
});
