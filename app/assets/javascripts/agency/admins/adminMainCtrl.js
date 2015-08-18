app.controller('AdminMainCtrl', ['$scope','$controller','AdminService','$modal','$filter','toastr',
	function($scope,$controller,AdminService,$modal,$filter,toastr){
		
		$controller('BaseMainCtrl', {$scope: $scope, service: AdminService});
	    
		$scope.openAddAdmin = function () {
			    var template = 'agency/admins/addAdmin.html';
				var modalctrl = 'AdminModalCtrl';
				$scope.openAddResource(template,modalctrl);
		};
		
		$scope.openEditAdmin = function (admin) {
		    var template = 'agency/admins/editAdmin.html';
			var modalctrl = 'AdminModalCtrl';
			$scope.openEditResource(template,modalctrl,admin);
		};
		
	}	
]);
