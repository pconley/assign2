angular.module('assign')
.controller('AdminCtrl', ['$scope','Admin','$modal','$filter','toastr',
	function($scope,Admin,$modal,$filter,toastr){
				
		$scope.admins = Admin.query(function() { 
			// after the query finished...
			console.log('*** retrieved admins. count='+$scope.admins.length);
		});
				
		$scope.deleteAdmin = function(admin){
			console.log('*** delete admin. admin...',admin);
		}
		
		$scope.openEditAdmin = function (admin) {
			console.log('*** openEditAdmin. admin...',admin);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'private/admins/editAdmin.html',
				controller: 'EditAdminCtrl',
				// pass the admin on to the modal via resolve
			    resolve: { admin: function () { return admin; } }			    
			});
			console.log('--- modal instance...',modalInstance);
			modalInstance.result.then(
				function (returnValue) {
					console.log('*** modal instance promise. returned...',returnValue);
					true;
				}, function (returnValue) {
					console.log('*** modal instance promise2. returned...',returnValue);
				    console.log('*** modal instance promise2. dismissed at: ' + new Date());
			});
		};
	}	
]);
