angular.module('ngTerpsys')
.factory('customersService', ['$http',
	function($http){
	  var o = {
	    customers: []
	  };
	  o.getAll = function() {
	    return $http.get('/a1/customers.json').success(function(data){
		  console.log('back from customer.getAll. count =',data.length)
	      angular.copy(data, o.customers);
	    })
		.error(function(x) {
		  console.log("Failed to get customers. x...",x);
		});
	  };
	  o.create = function(customer) {
		console.log('customersService: create. customer...', customer)
	    return $http.post('/a1/customers.json', customer).success(function(data){
	      o.customers.push(data);
	    });
	  };
	  o.update = function(customer) {
		console.log('customersService: update. customer...', customer)
	    return $http.put('/a1/customers/'+customer.id+'.json', customer).success(function(data){
		  // Note that rails return 204 (no data) on a put so the record in not returned
		  // you must do a subsequent get if you expect that other fields had ripple change
		  console.log('--- update success');
	    });
	  };
	  o.get = function(id) {
	    return $http.get('/a1/customers/' + id + '.json').then(function(res){
	      return res.data;
	    });
	  };
	  return o;
	}
]);