angular.module('assign')
.controller('CustomerCtrl', ['$scope','customersService','currentCustomer','screenSize','$modal','$filter','toastr',
	function($scope,customersService,currentCustomer,screenSize,$modal,$filter,toastr){
				
		$scope.error_message = '';
		$scope.customer = currentCustomer; // see the app.js resolve
		$scope.customers = customersService.customers;		
		$scope.totalCustomersCount = $scope.customers.length;
		
		//****** sort, filter and paging **********
		$scope.sortType = '';
		$scope.sortCount = 0;
		$scope.sortReverse = false;
		$scope.setOrder = function(type) {
        	$scope.sortReverse = ($scope.sortType === type) ? !$scope.sortReverse : false;
        	$scope.sortType = type;
      	};
		$scope.$watch("sortType + sortReverse + customers", function() {
			//console.log('sorting: '+$scope.sortType+' : '+$scope.sortReverse);
			var orderBy = $filter('orderBy');			
			$scope.customers = orderBy($scope.customers, $scope.sortType, $scope.sortReverse)
			$scope.sortCount += 1; // indicated a sort change occured
	  	});
		$scope.query = '';
		$scope.filterCount = true
		$scope.$watch("query + sortCount", function() {
			//console.log('filtering: '+$scope.query);
			var filter = $filter('filter');			
			$scope.filteredCustomers = filter($scope.customers, $scope.searchFilter) 
			$scope.filteredCustomersCount = $scope.filteredCustomers.length
			$scope.filterCount += 1; // indicates a filter change occured
	  	});	 
	  	$scope.currentPage = 1;
		$scope.numPerPage  = 3;   
		$scope.$watch("currentPage + numPerPage + filterCount", function() {
			//console.log('paging: '+$scope.currentPage);
	    	var begin = (($scope.currentPage - 1) * $scope.numPerPage);
	    	var end = begin + $scope.numPerPage;
	    	$scope.pagedCustomers = $scope.filteredCustomers.slice(begin, end);
			$scope.pageCount = $scope.filteredCustomers.length / $scope.numPerPage
	  	});
		$scope.searchFilter = function (obj) {
			// function used to limit the filter to specific fields
			if( $scope.query === '' ) return true
		    var re = new RegExp($scope.query, 'i');
		    return re.test(obj.company_name) || re.test(obj.contact_name);
		};
		//****** pagination **********		
		
		
	  	$scope.openAddCustomer = function (size) {
			console.log('*** openAddCustomer. size='+size);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'private/customers/_addCustomer.html',
				controller: 'CustomerModalInstanceCtrl',
			});
			console.log('--- modal instance...',modalInstance);
			modalInstance.result.then(
				function (returnValue) {
					console.log('*** modal instance promise. returned...',returnValue);
					true;
				}, function (returnValue) {
					console.log('*** modal instance promise2. returned...',returnValue);
				    console.log('*** modal instance promise2. dismissed at: ' + new Date());
			});
		};
		
		$scope.loadCustomers = function(){
		  console.log('*** loadCustomers');
		  return customersService.getAll();
		};
		
		$scope.back = function(){ window.history.back(); };
					
		$scope.updateCustomer = function(customer){
			function success(response){
				console.log("*** update success. response...",response);
				toastr.success('Update worked.','Customers', {closeButton: true});	
			};
			function failure(response) {
				console.log("*** update failure. response...",response);
				toastr.success('Update failed.','Customers', {closeButton: true});		
				angular.forEach(response, function(errors, key) {
			  		angular.forEach(errors, function(e) {
				  		console.log('<<< '+key+' '+e);
			      		$scope.form[key].$dirty = true;
			      		$scope.form[key].$setValidity(e, false);
			  		});
		    	});
		  	};
		  	console.log('*** update customer...',customer);
		  	return customersService.update(customer,success,failure);
		};
		
		$scope.deleteCustomer = function(customer){	
			function success(response){
				$scope.customers = customersService.customers;
				toastr.success('Delete worked.','Customers', {closeButton: true});	
			};
			function failure(response) {
				console.log("*** delete failure. response...",response);
				toastr.success('Deletes failed.','Customers', {closeButton: true});	
		  	};				
		  	if (confirm("Are you sure you want to delete this customer?") == true) {
		  		customersService.delete(customer,success,failure);
		  	}
		};
	}
]);

// Note that $modalInstance represents a modal window (instance) 
// dependency. It is not the same as the $modal service used above.
angular.module('assign')
.controller('CustomerModalInstanceCtrl', ['$scope','$modalInstance','customersService', 
function ($scope, $modalInstance, customersService) {

	$scope.ok = function () {
    	$modalInstance.close('ok');
  	};

	$scope.errorMessage = function(name) {
	  	result = [];
	    var s = $scope.form[name];
		if( s == null ){
			return ''
		} else {
	  		angular.forEach(s.$error, function(key, value) {
	      		result.push(value);
	  		});
	  		return result.join(", ");
		}
	};
	
	$scope.error = function(name) {
	    var s = $scope.form[name];
	    return s.$invalid && s.$dirty ? "has-error" : "";
	};
	
	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};

  	$scope.add = function () {
		if(!$scope.company_name || $scope.company_name === '') { return; }
		console.log('*** addCustomer');
		customersService.create({
	    	company_name: $scope.company_name,
			contact_name: $scope.contact_name
		}, success, failure );
  	};

	function success(response){
		console.log("*** modal: success response...",response);
		$modalInstance.dismiss('success');
	};

  	function failure(response) {
		console.log("*** modal: failure response...",response);
		console.log("*** form = "+form)
		angular.forEach(response, function(errors, key) {
	  		angular.forEach(errors, function(e) {
		  		console.log('*** '+key+' '+e);
	      		$scope.form[key].$dirty = true;
	      		$scope.form[key].$setValidity(e, false);
	  		});
    	});
  	};

}]);
