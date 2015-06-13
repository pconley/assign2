angular.module('ngTerpsys')
.factory('alertsService', [function(){
	  var o = {
	    alerts: [
		    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
		    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
		]
	  };	
	  o.create = function(alert) {
	    o.alerts.push(alert);
	  };
	  o.delete = function(index) {
		o.alerts.splice(index, 1);     
	  };
	  return o;
	}
]);