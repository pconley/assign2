angular.module('assign')
.controller('InterpreterModalCtrl', ['$scope','$modalInstance','InterpreterService','OptionsService','interpreter','toastr',
function ($scope, $modalInstance, InterpreterService, OptionsService, interpreter, toastr) {
	
	$scope.interpreter = interpreter; // passed via resolve(s)
	
    $scope.genders = OptionsService.genders;
    $scope.interpreter.selectedGender = OptionsService.getGender(interpreter.gender);

    $scope.prefixes = OptionsService.prefixes;
    $scope.interpreter.selectedPrefix = OptionsService.getPrefix(interpreter.prefix);

    $scope.suffixes = OptionsService.suffixes;
    $scope.interpreter.selectedSuffix = OptionsService.getSuffix(interpreter.suffix);

	$scope.cancel = function () {
    	$modalInstance.close('cancel');
  	};
	
	$scope.add = function () {
		console.log('*** InterpreterModalCtrl add. interpreter... = '+$scope.interpreter);
		if(!$scope.interpreter.email || $scope.interpreter.email === '') { return; }
		copy_selections(interpreter);
		InterpreterService.create($scope.interpreter, success, failure );		
  	};
 	
  	$scope.update = function () {
		console.log('*** InterpreterModalCtrl update. interpreter...'+$scope.interpreter);
		if(!$scope.interpreter.email || $scope.interpreter.email === '') { return; }
		copy_selections(interpreter);
		interpreter.$update(success,failure);
  	};

	function copy_selections(record){
		record.gender = record.selectedGender.id;
		record.suffix = record.selectedSuffix.id;
		record.prefix = record.selectedPrefix.id;
	};
		
	function success(response){
		console.log("*** InterpreterModalCtrl: service success response...",response);
		toastr.success('Change worked.','Interpreter Users', {closeButton: true});
		$modalInstance.dismiss(response);
	};
	
  	function failure(response) {
		console.log("*** InterpreterModalCtrl: service failure response...",response);
		//console.log("*** $form...",$scope.form)
		angular.forEach(response.data.errors, function(errors, key) {
	  		angular.forEach(errors, function(e) {
		  		//console.log('*** key='+key+' e...',e);
	      		$scope.form[key].$dirty = true;
	      		$scope.form[key].$setValidity(e, false);
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

