app.controller('CustomersMainCtrl', ['$scope','CustomerApiService','$modal','$filter','toastr',
	function($scope,CustomerApiService,$modal,$filter,toastr){
		
		CustomerApiService.query().$promise
	      	.then(function(response) {
				console.log('*** customers query response...',response);
	        	$scope.customersCollection = response;
		    	$scope.displayCollection = response;
	      	});
				
		$scope.deleteCustomer = function(customer){
			console.log('*** delete customer. customer...',customer);
			customer.$delete(function(customer) {
				console.log('*** back from delete');
				var index = $scope.customersCollection.indexOf(customer);
			  	$scope.customersCollection.splice(index, 1);
			}); 
		}
		
		$scope.openAddCustomer = function () {
			console.log('*** openAddCustomer');
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these settings
			    templateUrl: 'private/customers/addCustomer.html',
				controller: 'CustomerModalCtrl',
				// modal controller expects some customer provider
				// but just an empty record for the add function
			    resolve: { customer: function () { return {}; } }
			});
			modalInstance.result.then(
				function (returnValue) {
					// this function is triggered if modal's close function is used
					console.log('*** openAddCustomer modal function#1 returned...',returnValue);
				}, function (returnValue) {
					// this function is triggered if modal's dismiss function is used
					console.log('*** openAddCustomer modal function#2 returned...',returnValue);
					if( typeof returnValue === 'object' ){
						// return value is the newly added customer record
						$scope.customersCollection.push(returnValue)
						//$scope.displayCollection.push(returnValue)
					}				
				}
			);
		};
		
		$scope.openEditCustomer = function (customer) {
			console.log('*** openEditCustomer. customer...',customer);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'private/customers/editCustomer.html',
				controller: 'CustomerModalCtrl',
				// pass the customer on to the modal via resolve
			    resolve: { customer: function () { return customer; } }			    
			});
			modalInstance.result.then(
				function (returnValue) {
					// this function is triggered if modal's close function is used
					console.log('*** openEditCustomer: modal returned = '+returnValue);
				}, function (returnValue) {
					console.log('*** openEditCustomer: modal returned...',returnValue);
					// this function is triggered if modal's dismiss function is used
					// return value is the (potentially) changed customer record
				}
			);
		};
	}	
]);
