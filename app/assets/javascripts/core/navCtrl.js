angular.module('ngTerpsys')
.controller('NavCtrl', ['$scope','Auth','toastr',
	function($scope, Auth, toastr){
      $scope.signedIn = Auth.isAuthenticated;
	  $scope.logout = Auth.logout;
	
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
