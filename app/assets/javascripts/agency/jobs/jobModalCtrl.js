app.controller('JobModalCtrl', 
['$scope','$filter','$modalInstance','JobApiService','CustomerApiService','OptionsService','job','toastr',
function ($scope, $filter, $modalInstance, JobApiService, CustomerApiService, OptionsService, job, toastr) {
	
	$scope.job = job; // passed via resolve(s)
	
	$scope.customers = [];
	CustomerApiService.query().$promise
      	.then(function(response) {
			console.log('*** JobModalCtrl: load query returned '+response.length+' customers');
			console.log('*** JobModalCtrl: customer[0]...',response[0]);
        	$scope.customers = response;
      	});

    $scope.job.starts_at = new Date(2015, 7, 10);
    $scope.job.start_time = new Date(1970, 0, 1, 14);
    $scope.job.duration = 60; // minutes
	$scope.job.description = 'meet with lawyer';
	
	$scope.cancel = function () {
    	$modalInstance.close('cancel');
  	};

	$scope.changedCustomer = function(id){
		console.log("*** selected customer changed. new id = "+id);
		var x = $filter('filter')($scope.customers, {id: id})[0];
		//console.log("*** x...",x);
		$scope.job.requested_by_name = x.contact_name;
		$scope.job.requested_by_email = x.contact_email;
		$scope.job.requested_by_phone = x.contact_phone;
	}
	
	$scope.add = function () {
		console.log('*** JobModalCtrl add. job...',$scope.job);
		console.log('*** JobModalCtrl add. job customer...',$scope.job.customer);
		//if(!$scope.job.company_name || $scope.job.company_name === '') { return; }
		JobApiService.create($scope.job, success, failure );		
  	};
 	
  	$scope.update = function () {
		console.log('*** JobModalCtrl update. job...'+$scope.job);
		//if(!$scope.job.company_name || $scope.job.company_name === '') { return; }
		job.$update(success,failure);
  	};
		
	function success(response){
		console.log("*** JobModalCtrl: service success response...",response);
		toastr.success('Change worked.','Jobs', {closeButton: true});
		$modalInstance.dismiss(response);
	};
	
  	function failure(response) {
		console.log("*** JobModalCtrl: service failure response...",response);
		//console.log("*** form...",$scope.form)
		$scope.form.$setPristine(); // clear previous error msgs
		angular.forEach(response.data.errors, function(errors, key) {
	  		angular.forEach(errors, function(e) {
				if( $scope.form[key] ){
	      			$scope.form[key].$dirty = true;
	      			$scope.form[key].$setValidity(e, false);
				} else {
					console.log('*** missing key='+key+' e...',e);
				}
	  		});
    	});
  	};

	$scope.error = function(name) {
	    var s = $scope.form[name];
		if( s == null ){
			return ''
		} else {
	    	return s.$invalid && s.$dirty ? "has-error" : "";
		}
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

}]);

