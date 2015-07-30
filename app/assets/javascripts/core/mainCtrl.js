angular.module('assign')
.controller('MainCtrl', ['$rootScope','$scope','$state','Auth','toastr','screenSize',
	function($rootScope, $scope, $state, Auth, toastr, screenSize){

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
			var requiredRole = toState.data !== undefined && toState.data.requiredRole
			console.log('==> state change to '+toState.name+' requires role = '+requiredRole);
			//console.log('=== to state...',toState);
			//console.log('=== from state...',fromState);
			if( requiredRole == null ) return; // access ok
			
			Auth.currentUser().then(function (user){
				$scope.user = user; // user or null
				console.log('*** MainCtrl: state check. user...',user);
				if( !user ){
					console.log('*** no server auth: redirecting to public');
					toastr.warning(requiredRole+' login is required.','Access Failure', {closeButton: true});
					$state.go('public');
					event.preventDefault();
				} else if ( user.role === 'admin' ) {
					// an admin is authorized for any transition
					console.log('*** state change authorized for '+user.role);
				} else if ( user.role === requiredRole ) {
					// user is authorized for this transition
					console.log('*** state change authorized for '+user.role);
				} else {
					console.log('user role = '+user.role);
					console.log('reqd role = '+requiredRole);
					console.log('*** not a role match: redirecting to public');
					toastr.warning(requiredRole+' login is required.','Access Failure', {closeButton: true});
					$state.go('public');
					event.preventDefault();
				}
			}, function(error) {
				console.log('*** redirect to public. unauthenticated error...',error);
				$state.go('public');
			});
		});
		
		$scope.desktop = screenSize.on('sm, md, lg', function(match){
		    $scope.desktop = match;
		});
		$scope.mobile = screenSize.on('xs', function(match){
		    $scope.mobile = match;
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