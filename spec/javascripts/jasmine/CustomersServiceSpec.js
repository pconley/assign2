"use strict";

describe("Customers::Service", function () {
  var customersService, httpBackend;

  beforeEach(module("assign"));

  beforeEach(inject(function (_customersService_, $httpBackend) {
    customersService = _customersService_;
    httpBackend = $httpBackend;
  }));

  afterEach(function () {httpBackend.flush();});

  var c1 = { id:555, company_name: 'beechwood' }
  var c2 = { id:666, company_name: 'amcad' }
  var c3 = { id:777, company_name: 'nortel' }
  var stub_success = function(){ console.log('stub success'); }
  var stub_failure = function(){ console.log('stub failure'); }

  it("getAll sets customers", function () {
	var stub_customers = [c1,c2,c3]
    httpBackend.whenGET('/a1/customers.json').respond(stub_customers);
    customersService.getAll().then(function(response) {
	  	//console.log('response...',response);
      	expect(response.status).toEqual(200);
      	expect(response.data.length).toEqual(stub_customers.length);
      	expect(response.data).toEqual(stub_customers);
		// this is the real expectation... that customers is set
	  	expect(customersService.customers).toEqual(stub_customers)
    });
  });

  it("get returns one customer", function () {
	var id = 999;
    httpBackend.whenGET('/a1/customers/' + id + '.json').respond(c1);
    customersService.get(id).then(function(response) {
	  	console.log('response...',response);
      	//expect(response.status).toEqual(200);
      	expect(response).toEqual(c1);
		// this is the real expectation... that customers is set
	  	//expect(customersService.customers).toEqual(stub_customers)
    });
    //httpBackend.flush();
  });

  it("create adds result to customers", function () {
    httpBackend.whenPOST('/a1/customers.json').respond(c1);
    customersService.create(c1,stub_success,stub_failure).then(function(response) {
	  	console.log('response...',response);
      	expect(response.status).toEqual(200);
      	//expect(response).toEqual(c1);
		// this is the real expectation... that customers is set
	  	expect(customersService.customers).toEqual([c1])
    });
    //httpBackend.flush();
  });

  it("delete removes customer from customers", function () {
	customersService.customers = [c1,c2,c3];
    httpBackend.whenDELETE('/a1/customers/'+c1.id+'.json').respond(c1);
    customersService.delete(c1,stub_success,stub_failure).then(function(response) {
      	expect(response.status).toEqual(200);
	  	expect(customersService.customers).toEqual([c2,c3])
    });
  });

  it("update does not change any data", function () {
	customersService.customers = [c1,c2,c3];
    httpBackend.whenPUT('/a1/customers/'+c1.id+'.json').respond();
	var new_c1 = { id:555, company_name: 'beach party' };
    customersService.update(new_c1,stub_success,stub_failure).then(function(response) {
      	expect(response.status).toEqual(200);
		// do NOT expect to see the change in the customers
	  	expect(customersService.customers).toEqual([c1,c2,c3])
    });
  });

});