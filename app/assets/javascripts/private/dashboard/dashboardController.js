angular.module('assign')
.controller('DashboardController', ['$scope','customersService','toastr',
	function($scope,customersService,toastr){
				
		$scope.customers = customersService.customers;	
								
		$scope.loadCustomers = function(){
		  console.log('*** loadCustomers');
		  return customersService.getAll();
		};
		
		$scope.loadCustomers();
			
	}
]);
