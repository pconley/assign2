angular.module('assign')
.controller('NavCtrl', ['$scope','$rootScope','$state','Auth','toastr',
	function($scope, $rootScope, $state, Auth, toastr){
      	$scope.signedIn = Auth.isAuthenticated;
	  	$scope.logout = function(){
			console.log("*** navCtrl: logout");
			Auth.logout();			
			$state.go('public');
		};
		
		$rootScope.sidebarVisible = true;
		// using root scope because this controller is used (created) twice in header and sidebar
	    $scope.toggleSidebar = function(){ $rootScope.sidebarVisible = !$rootScope.sidebarVisible;};
	    $rootScope.$on("escapePressed", _toggle); // a non-agular event requires $apply
	    function _toggle() {
			console.log('_toggle');
	        $scope.$apply(function() {
				$rootScope.sidebarVisible = false;
	            //$scope.toggleSidebar(); 
	        });
	    }
			
		$scope.navbarCollapsed = true;
		
		$scope.openItemKey = '';
		$scope.toggle = function(key){
			console.log('toggle: key='+key+' start='+$scope.openItemKey);
			$scope.openItemKey = $scope.openItemKey == key ? '' : key;
		};
		$scope.isOpenItem = function(key){ return key == $scope.openItemKey }
}]);
