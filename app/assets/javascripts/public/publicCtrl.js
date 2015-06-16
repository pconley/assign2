angular.module('ngTerpsys')
.controller('PublicCtrl', ['$scope','Auth',
	function($scope,authService){
		$scope.signedIn  = authService.isAuthenticated;
	}
]);