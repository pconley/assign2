angular.module('assign')
.controller('HomeCtrl', ['$scope','postsService', 'customersService','Auth',
	function($scope,postService,custService,authService){
		$scope.signedIn  = authService.isAuthenticated;
		$scope.posts     = postService.posts;
		$scope.customers = custService.customers;
	}
]);