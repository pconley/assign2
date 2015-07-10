angular.module('assign')
.controller('AdminsCtrl', ['$scope','AdminService','$modal','$filter','toastr',
	function($scope,AdminService,$modal,$filter,toastr){
		
		$scope.rowCollection = [];
		$scope.displayCollection = [];
						
		$scope.admins = AdminService.query(function() { 
			// after the query finished...
			console.log('*** retrieved admins. count='+$scope.admins.length);
		    // copy the references (you could clone ie angular.copy but then 
			// have to go through a dirty checking for the matches)
		    $scope.rowCollection = [].concat($scope.admins);
		    $scope.displayedCollection = [].concat($scope.admins);
			angular.forEach($scope.displayedCollection, function(record) {
				// adds a display name to each record for the view
				record.display_name = build_display_name(record);
			});
		});
				
		$scope.deleteAdmin = function(admin){
			console.log('*** delete admin. admin...',admin);
			admin.$delete(function(admin) {
				console.log('*** back in controller');
				var n1 = $scope.rowCollection.indexOf(admin);
			  	$scope.rowCollection.splice(n1, 1);
				var n2 = $scope.displayCollection.indexOf(admin);
			  	$scope.displayCollection.splice(n2, 1);
			}); 
		}
		
		$scope.openAddAdmin = function () {
			console.log('*** openAddAdmin');
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these settings
			    templateUrl: 'private/admins/addAdmin.html',
				controller: 'AdminModalCtrl',
				// modal controller expects some admin provider
				// but just an empy record for the add function
			    resolve: { admin: function () { return {}; } }
			});
			console.log('--- modal instance...',modalInstance);
			modalInstance.result.then(
				function (returnValue) {
					// i am not sure when, if ever this function is triggered
					console.log('*** openAddAdmin modal function#1 returned...',returnValue);
					alert('modal instance finction 1 triggered');
					true; // or why this?
				}, function (returnValue) {
					console.log('*** openAddAdmin modal function#2 returned...',returnValue);
					if( typeof returnValue === 'object' ){
						// return value is the newly added admin
						$scope.rowCollection.push(returnValue)
						returnValue.display_name = build_display_name(returnValue);
						$scope.displayCollection.push(returnValue)
						
					}				
				}
			);
		};
		
		$scope.openEditAdmin = function (admin) {
			console.log('*** openEditAdmin. admin...',admin);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'private/admins/editAdmin.html',
				controller: 'AdminModalCtrl',
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
					// in case the name changed, update the display name
					returnValue.display_name = build_display_name(returnValue);
			});
		};
	}	
]);
