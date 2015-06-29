angular.module('assign')
.factory('customersService', ['$http','alertsService','toastr',
	function($http, alertsService, toastr){
		var o = {
	    	customers: [],
	        getCustromer : function () { return o.customers; }
	  	};
	  o.getAll = function() {
		console.log('>>> get all customers');
	    return $http.get('/a1/customers.json').success(function(data){
		  console.log('>>> real getAll. data...',data);
		  console.log('>>> back from customer.getAll. count =',data.length);
	      angular.copy(data, o.customers);
	    })
		.error(function(x) {
		  console.log(">>> Failed to get customers. x...",x);
		});
	  };
	  o.create = function(customer, success, failure) {
		console.log('>>> customersService: create. customer...', customer)
	    return $http.post('/a1/customers.json', customer)
			.success(function(data){ 
				console.log('>>> pushing data...',data)
				o.customers.push(data); 
				success(); // callback
			})
			.error(function(response){ 
				console.log('<<< create error. response...',response); 			  
				failure(response.errors); // callback
			});
	  };
	  o.delete = function(customer, success, failure) {
		console.log('>>> delete customer #', customer.id);
	    return $http.delete('/a1/customers/'+customer.id+'.json').success(function(data){
		  	var index = o.customers.indexOf(customer);
		  	console.log('<<< customer count1 = '+o.customers.length);
		  	o.customers.splice(index, 1);
		  	console.log('<<< customer count2 = '+o.customers.length);
		    console.log('<<< delete customer at index ='+index+' ...',customer);	
			success(); // callback
	    }).error(function(data){
		  	console.log('<<< delete error');
			failure(); // callback
	    });
	  };
	  o.update = function(customer,success,failure) {
		console.log('customersService: update. customer...', customer)
	    return $http.put('/a1/customers/'+customer.id+'.json', customer)
			.success(function(data){ 
				console.log('<<< update success. data...',data)
				success(); // callback
			})
			.error(function(response){ 
				console.log('<<< update error. response...',response); 			  
				failure(response.errors); // callback
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