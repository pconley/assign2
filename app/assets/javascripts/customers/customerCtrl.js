angular.module('ngTerpsys')
.controller('CustomerCtrl', ['$scope','customersService','currentCustomer',
	function($scope,customersService,currentCustomer){
		$scope.customer = currentCustomer; // see the app.js resolve
		$scope.customers = customersService.customers;
		
		$scope.addCustomer = function(){
		  if(!$scope.company_name || $scope.company_name === '') { return; }
		  console.log('*** addCustomer');
		  customersService.create({
		    company_name: $scope.company_name,
			contact_name: $scope.contact_name
		  });
		  $scope.company_name = '';
		  $scope.contact_name = '';
		};
		$scope.updateCustomer = function(){
		  console.log('*** updateCustomer');
		  customersService.update(currentCustomer);
		};
		$scope.deleteCustomer = function(customer){		
		  if (confirm("Are you sure you want to delete this customer?") == true) {
		  	var index = $scope.customers.indexOf(customer);
		  	console.log('*** deleteCustomer at index ='+index+' ...',customer);
		  	customersService.delete(customer);
		  }
		};
		$scope.removeCustomer = function() {
	      var dlg = dialogs.confirm('Please Confirm', 'Are you absolutely sure you want to delete?');
	      dlg.result.then(function () {
	        console.log("User has confirmed");
	      },function(){
	        console.log("User has cancelled");
	      });
	    };		
	}
]);