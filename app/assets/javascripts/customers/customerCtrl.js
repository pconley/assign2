angular.module('ngTerpsys')
.controller('CustomerCtrl', ['$scope','customersService','currentCustomer',
	function($scope,customersService,currentCustomer){
		$scope.customer = currentCustomer; // see the app.js resolve
		$scope.customers = customersService.customers;
		$scope.addCustomer = function(){
		  if(!$scope.company_name || $scope.company_name === '') { return; }
		  console.log('*** addCustomer')
		  customersService.create({
		    company_name: $scope.company_name,
			contact_name: $scope.contact_name
		  });
		  $scope.company_name = '';
		  $scope.contact_name = '';
		};
		$scope.updateCustomer = function(){
		  console.log('*** updateCustomer')
		  customersService.update(currentCustomer);
		};
	}
]);