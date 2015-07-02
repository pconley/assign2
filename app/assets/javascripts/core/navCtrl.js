angular.module('assign')
.controller('NavCtrl', ['$scope','$state','Auth','toastr',
	function($scope, $state, Auth, toastr){
      	$scope.signedIn = Auth.isAuthenticated;
	  	$scope.logout = function(){
			console.log("*** navCtrl: logout");
			Auth.logout();			
			$state.go('public');
		};
		
		$scope.openItemKey = '';
		$scope.toggle = function(key){
			console.log('toggle: key='+key+' start='+$scope.openItemKey);
			$scope.openItemKey = $scope.openItemKey == key ? '' : key;
		};
		$scope.isOpenItem = function(key){ return key == $scope.openItemKey }
}]);
