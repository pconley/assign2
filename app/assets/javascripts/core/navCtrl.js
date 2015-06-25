angular.module('ngTerpsys')
.controller('NavCtrl', ['$scope','Auth','toastr',
	function($scope, Auth, toastr){
      $scope.signedIn = Auth.isAuthenticated;
	  $scope.logout = Auth.logout;
		
	$scope.active = {};
	$scope.toggle = function(key){
		start = $scope.active[key] 
		console.log('toggle key='+key+' value='+start);
		if( start == false ){
			// we are turing ON this item so turn off ALL active
			for( var k in $scope.active ){ $scope.active[k] = false; };
		}
		$scope.active[key] = !start;
	};
	
	  Auth.currentUser().then(function (user){
	    $scope.user = user;
	  });
	  $scope.$on('devise:new-registration', function (e, user){
	    $scope.user = user;
	  });
	  $scope.$on('devise:login', function (e, user){
	    $scope.user = user;
	  });
	  $scope.$on('devise:logout', function (e, user){
		toastr.success('Logout worked.','Authentication', {closeButton: true});
	    $scope.user = {};
	  });
	}]
);
