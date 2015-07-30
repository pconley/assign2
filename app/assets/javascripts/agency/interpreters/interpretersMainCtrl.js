app.controller('InterpretersMainCtrl', ['$scope','InterpreterService','$modal','$filter','toastr',
	function($scope,InterpreterService,$modal,$filter,toastr){
		
		InterpreterService.query().$promise
	      	.then(function(response) {
				console.log('*** InterpretersMainCtrl. query loaded '+response.length+' interpreters');
	        	$scope.interpretersCollection = response;
		    	$scope.displayCollection = response;
				angular.forEach($scope.displayCollection, function(record) {
					// adds a display name to each record for the view
					record.display_name = build_display_name(record);
				});
	      	});
				
		$scope.deleteInterpreter = function(interpreter){
			console.log('*** delete interpreter. interpreter...',interpreter);
			interpreter.$delete(function(interpreter) {
				console.log('*** back in controller');
				var n1 = $scope.interpretersCollection.indexOf(interpreter);
			  	$scope.interpretersCollection.splice(n1, 1);
				var n2 = $scope.displayCollection.indexOf(interpreter);
			  	$scope.displayCollection.splice(n2, 1);
			}); 
		}
		
		$scope.openAddInterpreter = function () {
			console.log('*** openAddInterpreter');
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these settings
			    templateUrl: 'agency/interpreters/addInterpreter.html',
				controller: 'InterpreterModalCtrl',
				// modal controller expects some interpreter provider
				// but just an empty record for the add function
			    resolve: { interpreter: function () { return {}; } }
			});
			console.log('--- modal instance...',modalInstance);
			modalInstance.result.then(
				function (returnValue) {
					// this function is triggered if modal's close function is used
					console.log('*** openAddInterpreter modal function#1 returned...',returnValue);
				}, function (returnValue) {
					// this function is triggered if modal's dismiss function is used
					console.log('*** openAddInterpreter modal function#2 returned...',returnValue);
					if( typeof returnValue === 'object' ){
						// return value is the newly added interpreter record
						$scope.interpretersCollection.push(returnValue)
						returnValue.display_name = build_display_name(returnValue);
						$scope.displayCollection.push(returnValue)
					}				
				}
			);
		};
		
		$scope.openEditInterpreter = function (interpreter) {
			console.log('*** openEditInterpreter. interpreter...',interpreter);
			var modalInstance = $modal.open({
				backdrop: true,   // the combination of a backdrop and animate is
			    animation: false, // failing to release backdrop so these setting
			    templateUrl: 'agency/interpreters/editInterpreter.html',
				controller: 'InterpreterModalCtrl',
				// pass the interpreter on to the modal via resolve
			    resolve: { interpreter: function () { return interpreter; } }			    
			});
			modalInstance.result.then(
				function (returnValue) {
					// this function is triggered if modal's close function is used
					console.log('*** openEditInterpreter: modal returned = '+returnValue);
				}, function (returnValue) {
					console.log('*** openEditInterpreter: modal returned...',returnValue);
					// this function is triggered if modal's dismiss function is used
					// return value is the (potentially) changed interpreter record
					// so, in case the name changed, update the display name
					returnValue.display_name = build_display_name(returnValue);
				}
			);
		};
	}	
]);
