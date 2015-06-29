angular.module('assign')
.controller('NavCtrl', ['$scope','$state','Auth','toastr',
	function($scope, $state, Auth, toastr){
      	$scope.signedIn = Auth.isAuthenticated;
	  	$scope.logout = function(){
			console.log("*** navCtrl: logout");
			Auth.logout();			
			$state.go('public');
		};
		
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
}]);
