describe('A1::Admin::Service', function () {
	var httpBackend, service; 
	beforeEach(module('assign'));
	beforeEach(inject(function (_$httpBackend_, AdminService) {
    	httpBackend = _$httpBackend_;
    	service = AdminService;
	}));
	var sample = [{id:99,a:1},{b:2},{c:3}];
  	describe('query', function () {
    	it('should return data', function() {
        	httpBackend.whenGET('/a1/admins').respond(sample);
        	service.query().$promise.then(function(result) {
				console.log('+++ result...',result)
	        	expect(result.length).toEqual(3);
        	});
        	expect(1).toEqual(1);
        	httpBackend.flush();
    	});
  	});
  	describe('create', function () {
      	it('should add a record', function() {
        	var result = {};
        	httpBackend.whenPOST('/a1/admins').respond({});
			httpBackend.expectPOST('/a1/admins');
        	var x = service.create({a:44},function(){},function(){});
        	expect(1).toEqual(1);
        	httpBackend.flush();
    	});
  	});
  	describe('$delete', function () {
      	it('will invoke http', function() {
        	var result = {};
        	httpBackend.whenGET('/a1/admins').respond(sample);
        	httpBackend.whenDELETE('/a1/admins/99').respond({});
        	service.query().$promise.then(function(result) {
				console.log('+++ result...',result);
				console.log('+++ result[0]...',result[0]);
				httpBackend.expectDELETE('/a1/admins/99');
				var rec1 = result[0]; 
				var delres = rec1.$delete(function(){});
				console.log('+++ delres...',delres);
        	});
        	expect(1).toEqual(1);
        	httpBackend.flush();
    	});
  	});


});