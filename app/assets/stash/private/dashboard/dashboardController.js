angular.module('assign')
.controller('DashboardController', ['$scope','CustomerApiService','toastr',
	function($scope,customerApiService,toastr){
						
		customerApiService.query().$promise.then(function(response) { $scope.customers = response; });			
	}
]);
