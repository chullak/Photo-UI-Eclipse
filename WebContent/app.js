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
    }).when("/album", {
        templateUrl: "template/album/list.html",
        controller: "albumListController"
    }).when("/album/:id", {
        templateUrl: "template/album/view.html",
        controller: "albumViewController"
    }).when("/album/:id/edit", {
        templateUrl: "template/album/edit.html",
        controller: "albumViewController"
    }).when("/album-new", {
        templateUrl: "template/album/new.html",
        controller: "albumNewController"
    }).when("/photo", {
        templateUrl: "template/photo/list.html",
        controller: "photoListController"
    }).when("/photo/:id", {
        templateUrl: "template/photo/view.html",
        controller: "photoViewController"
    }).when("/photo/:id/edit", {
        templateUrl: "template/photo/edit.html",
        controller: "photoViewController"
    }).when("/photo-new", {
        templateUrl: "template/photo/new.html",
        controller: "photoNewController"
    })

});

MyApp.controller("userListController",function($scope,$http){
	$http.get("http://localhost:8080/PhotoApp/user").then(function (response){
			$scope.users=response.data;
		
	});
	
}).controller("userViewController",function($scope,$http,$routeParams,$location){
	
	$http.get("http://localhost:8080/PhotoApp/user/"+$routeParams.id).then(function (response){
		$scope.user=response.data;
	});
	
	$http.get("http://localhost:8080/PhotoApp/user/"+$routeParams.id+"/album").then(function (response){
		$scope.albums=response.data;
	});
	
	
	$scope.update= function(){
		$http.put("http://localhost:8080/PhotoApp/user/"+$routeParams.id, $scope.user).then(function (response){
	    	$location.path('user').replace();
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
	
}).controller("albumViewController",function($scope,$http,$routeParams,$location){
	
	$http.get("http://localhost:8080/PhotoApp/album/"+$routeParams.id).then(function (response){
		$scope.album=response.data;
	});
	$http.get("http://localhost:8080/PhotoApp/album/"+$routeParams.id+"/photo").then(function (response){
		$scope.photos=response.data;
	});
	$scope.update= function(){
		$http.put("http://localhost:8080/PhotoApp/album/"+$routeParams.id, $scope.album).then(function (response){
	    	$location.path('album').replace();
		});
	};	
	
}).controller("albumNewController",function($scope,$http,$routeParams,$location){
			
	$scope.save= function(){
		$http.post("http://localhost:8080/PhotoApp/album", $scope.album).then(function (response){;
	    	$location.path('album').replace();
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
	    	$location.path('photo').replace();
		});
	};	
	
}).controller("photoNewController",function($scope,$http,$routeParams,$location){
			
	$scope.save= function(){
		$http.post("http://localhost:8080/PhotoApp/photo", $scope.photo).then(function (response){;
	    	$location.path('photo').replace();
		});
	};	
	
});