angular.module('assign')
.controller('LoginCtrl', ['$scope','$state','Auth','AccessService','toastr',
	function($scope, $state, Auth, AccessService, toastr){
		$scope.user = {};
		$scope.hasLocalError = false;
		$scope.emailErrorMessage = '';
		$scope.serverErrorMessage = '';
		$scope.passwordErrorMessage = '';
		$scope.login = function() {
			console.log('*** LoginCtrl#login');
			console.log('*** form...',$scope.form);
			$scope.hasLocalError = false;
			$scope.emailErrorMessage = '';
			$scope.serverErrorMessage = '';
			$scope.passwordErrorMessage = '';
			console.log('*** user...',$scope.user);
			console.log('*** email = '+$scope.user.email);
			if(!$scope.user.email || $scope.user.email === '') { 
	      		$scope.form.email.$dirty = true;
	      		$scope.form.email.$setValidity('xxx', false);
				$scope.emailErrorMessage = "email address required for login";
				$scope.hasLocalError = true;
			}
			if(!$scope.user.password || $scope.user.password === '') { 
				$scope.form.password.$dirty = true;
	      		$scope.form.password.$setValidity('zzz', false);
				$scope.passwordErrorMessage = "a password required for login";
				$scope.hasLocalError = true; 
			}
			if( $scope.hasLocalError ) return; // and display local errors
			
	    	Auth.login($scope.user).then(function(user){
		  		toastr.success('Login worked.','Authentication', {closeButton: true});
				console.log('*** user...',user)
				$state.go(AccessService.home(user));
	    	}, function(error) {
				// server authentication failed
				console.log('*** auth error = ',error.data.error)
				$scope.form.server.$dirty = true;
	      		$scope.form.server.$setValidity('zzz', false);
				$scope.serverErrorMessage = "server authentication failed";
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
