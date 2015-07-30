app.controller('AdminMainCtrl', ['$scope','$controller','AdminService','$modal','$filter','toastr',
	function($scope,$controller,AdminService,$modal,$filter,toastr){
		
		$controller('BaseMainCtrl', {$scope: $scope, service: AdminService}); // import base functions
				
		AdminService.query().$promise
	      	.then(function(response) {
				console.log('*** AdminMainCtrl: query loaded '+response.length+' admins');
				console.log('*** AdminMainCtrl: admin[0]...',response[0]);
	        	$scope.rowsCollection = response;
				angular.forEach($scope.rowsCollection, function(record) {
					// adds a display name to each record for the view
					record.display_name = build_display_name(record);
				});
	      	});
	    			
		$scope.openAddAdmin = function () {
			console.log('*** openAddAdmin');
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these settings
			    templateUrl: 'agency/admins/addAdmin.html',
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
						$scope.rowsCollection.push(returnValue)
						returnValue.display_name = build_display_name(returnValue);
					}				
				}
			);
		};
		
		$scope.openEditAdmin = function (admin) {
			console.log('*** openEditAdmin. admin...',admin);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'agency/admins/editAdmin.html',
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
