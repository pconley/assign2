app.controller('CustomersMainCtrl', ['$scope','$controller','CustomerApiService','$modal','$filter','toastr',
	function($scope,$controller,CustomerApiService,$modal,$filter,toastr){
				
		$controller('BaseMainCtrl', {$scope: $scope, $modal: $modal, service: CustomerApiService}); 
	 		
		// CustomerApiService.query().$promise
		// 	      	.then(function(response) {
		// 		console.log('*** CustomersMainCtrl: load query returned '+response.length+' customers');
		// 		console.log('*** CustomersMainCtrl: customer[0]...',response[0]);
		// 	        	$scope.rowsCollection = response;
		// 	      	});

		$scope.openAddCustomer = function () {
		    var template = 'agency/customers/addCustomer.html';
			var modalctrl = 'CustomerModalCtrl';
			$scope.openAddResource(template,modalctrl);
		};

		$scope.openEditCustomer = function (customer) {
		    var template = 'agency/customers/editCustomer.html';
			var modalctrl = 'CustomerModalCtrl';
			$scope.openEditResource(template,modalctrl,customer);
		};
							
	}	
]);
