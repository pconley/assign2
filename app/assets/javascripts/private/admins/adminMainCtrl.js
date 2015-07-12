app.controller('AdminMainCtrl', ['$scope','AdminService','$modal','$filter','toastr',
	function($scope,AdminService,$modal,$filter,toastr){
				
		AdminService.query().$promise
	      	.then(function(adminsResponse) {
				console.log('*** adminsResponse...',adminsResponse);
	        	$scope.adminsCollection = adminsResponse;
		    	$scope.displayCollection = adminsResponse;
				angular.forEach($scope.displayCollection, function(record) {
					// adds a display name to each record for the view
					record.display_name = build_display_name(record);
				});
	      	});
	    	
		$scope.deleteAdmin = function(admin){
			console.log('*** delete admin. admin...',admin);
			admin.$delete(function(admin) {
				console.log('*** back in controller');
				var n1 = $scope.adminsCollection.indexOf(admin);
			  	$scope.adminsCollection.splice(n1, 1);
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
				// but just an empty record for the add function
			    resolve: { admin: function () { return {}; } }
			});
			console.log('--- modal instance...',modalInstance);
			modalInstance.result.then(
				function (returnValue) {
					// this function is triggered if modal's close function is used
					console.log('*** openAddAdmin modal function#1 returned...',returnValue);
				}, function (returnValue) {
					// this function is triggered if modal's dismiss function is used
					console.log('*** openAddAdmin modal function#2 returned...',returnValue);
					if( typeof returnValue === 'object' ){
						// return value is the newly added admin record
						$scope.adminsCollection.push(returnValue)
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
			modalInstance.result.then(
				function (returnValue) {
					// this function is triggered if modal's close function is used
					console.log('*** openEditAdmin: modal returned = '+returnValue);
				}, function (returnValue) {
					console.log('*** openEditAdmin: modal returned...',returnValue);
					// this function is triggered if modal's dismiss function is used
					// return value is the (potentially) changed admin record
					// so, in case the name changed, update the display name
					returnValue.display_name = build_display_name(returnValue);
				}
			);
		};
	}	
]);
