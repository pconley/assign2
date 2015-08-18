angular.module('assign')
.controller('NavCtrl', ['$scope','$rootScope','$state','Auth','toastr',
	function($scope, $rootScope, $state, Auth, toastr){
      	$scope.signedIn = Auth.isAuthenticated;
	  	$scope.logout = function(){
			console.log("*** navCtrl: logout");
			Auth.logout();			
			$state.go('public');
		};
		
		// NOTE: there are two things that i do not understand in this code section.  first, the
		// visible value used in the ng-show seems reveresed. second the escape pressed seems to 
		// be broadcast twice on one key press
		$rootScope.sidebarVisible = true;
		// using root scope because this controller is used (created) twice in header and sidebar
	    $scope.toggleSidebar = function(){ $rootScope.sidebarVisible = !$rootScope.sidebarVisible;};
	    $rootScope.$on("escapePressed", _hidebar);   // a non-agular event requires $apply
	    $rootScope.$on("documentClicked", _hidebar); // a non-agular event requires $apply
	    function _hidebar() {
	        $scope.$apply(function() {
				$rootScope.sidebarVisible = true;
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
