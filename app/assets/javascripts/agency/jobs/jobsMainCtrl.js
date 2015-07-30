app.controller('JobsMainCtrl', ['$scope','JobApiService','$modal','$filter','toastr',
	function($scope,JobApiService,$modal,$filter,toastr){
		
		JobApiService.query().$promise
	      	.then(function(response) {
				console.log('*** JobsMainCtrl: load query returned '+response.length+' jobs');
				console.log('*** JobsMainCtrl: job[0]..',response[0]);
	        	$scope.jobsCollection = response;
	      	});
				
		$scope.deleteJob = function(job){
			console.log('*** delete job. job...',job);
			job.$delete(function(job) {
				console.log('*** back from delete');
				var index = $scope.jobsCollection.indexOf(job);
			  	$scope.jobsCollection.splice(index, 1);
			}); 
		}
		
		$scope.openAddJob = function () {
			console.log('*** openAddJob');
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these settings
			    templateUrl: 'agency/jobs/addJob.html',
				controller: 'JobModalCtrl',
				// modal controller expects some job provider
				// but just an empty record for the add function
			    resolve: { job: function () { return {}; } }
			});
			modalInstance.result.then(
				function (returnValue) {
					// this function is triggered if modal's close function is used
					console.log('*** openAddJob modal function#1 returned...',returnValue);
				}, function (returnValue) {
					// this function is triggered if modal's dismiss function is used
					console.log('*** openAddJob modal function#2 returned...',returnValue);
					if( typeof returnValue === 'object' ){
						// return value is the newly added job record
						$scope.jobsCollection.push(returnValue)
					}				
				}
			);
		};
		
		$scope.openEditJob = function (job) {
			console.log('*** openEditJob. job...',job);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'agency/jobs/editJob.html',
				controller: 'JobModalCtrl',
				// pass the job on to the modal via resolve
			    resolve: { job: function () { return job; } }			    
			});
			modalInstance.result.then(
				function (returnValue) {
					// this function is triggered if modal's close function is used
					console.log('*** openEditJob: modal returned = '+returnValue);
				}, function (returnValue) {
					console.log('*** openEditJob: modal returned...',returnValue);
					// this function is triggered if modal's dismiss function is used
					// return value is the (potentially) changed job record
				}
			);
		};
	}	
]);
