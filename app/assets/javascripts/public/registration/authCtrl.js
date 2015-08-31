angular.module('assign')
.controller('AuthCtrl', ['$scope','$state','Auth','AccessService','toastr',
	function($scope, $state, Auth, AccessService, toastr){
		$scope.user = {};
		$scope.hasLocalError = false;
		$scope.emailErrorMessage = '';
		$scope.serverErrorMessage = '';
		$scope.passwordErrorMessage = '';

	  	$scope.register = function() {
	    	Auth.register($scope.user).then(function(){
	      		$state.go('home'); // TODO: registration
	    	});
	  	};
	
		$scope.error = function(name) {
		    var s = $scope.form[name];
			if( s == null ){
				return ''
			} else {
		    	return s.$invalid && s.$dirty ? "has-error" : "";
			}
		};	
	}]
);
