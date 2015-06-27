angular.module('assign')
.controller('AuthCtrl', ['$scope','$state','Auth','toastr',
	function($scope, $state, Auth, toastr){
	  $scope.login = function() {
		console.log('AuthCtrl#login');
	    Auth.login($scope.user).then(function(){
		  toastr.success('Login worked.','Authentication', {closeButton: true});
	      $state.go('home');
	    });
	  };

	  $scope.register = function() {
	    Auth.register($scope.user).then(function(){
	      $state.go('home');
	    });
	  };
	}]
);
