angular.module('assign')
.controller('MainCtrl', ['$rootScope','$scope','$state','Auth','toastr',
	function($rootScope, $scope, $state, Auth, toastr){
				
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
			// console.log('=== state changed');
			// console.log('=== event...', event);
			// console.log('=== toState...', toState);
			// console.log('=== toState.data...', toState.data);
			// console.log('=== toParams...', toParams);
			// console.log('=== fromState...', fromState);
			var required = toState.data !== undefined && toState.data.requireLogin
			// console.log('requires login = '+required);
			// console.log('is authenticated = '+Auth.isAuthenticated());				
			if(required && !Auth.isAuthenticated()) {
				$state.go('public');
				event.preventDefault();
				return;
			}	
		});
				
		$scope.signedIn = Auth.isAuthenticated;
	  	//$scope.logout = Auth.logout;
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