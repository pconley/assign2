angular.module('assign')
.controller('DashboardController', ['$scope','CustomerApiService','toastr',
	function($scope,CustomerApiService,toastr){
				
		CustomerApiService.query().$promise
	      	.then(function(response) {
				console.log('*** DashboardController: query returned '+response.length+ 'customers');
	        	$scope.customers = response;
	      	});			
	}
]);
