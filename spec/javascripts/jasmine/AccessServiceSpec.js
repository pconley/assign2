describe('AccessService:: ', function () {
	var user = null;	
	
	beforeEach(module('assign'));
	beforeEach(inject(function (AccessService,Auth) {
    	service = AccessService;
		auth = Auth;
	}));
		
  	describe('with null user', function () {	
		beforeEach(function(){
			user = null;
		})
	  	it('xxx role requires a login', function () {
	        result = service.access(user,'xxx')
		    expect(result).toEqual(service.retval.required);
	  	});
    	it('admin role should require login', function() {
        	result = service.access(user,'admin')
	        expect(result).toEqual(service.retval.required);
    	});
    	it('blank role should allow access', function() {
        	result = service.access(user,'')
	        expect(result).toEqual(service.retval.allowed);
    	});
    	it('null role should allow access', function() {
        	result = service.access(user,null)
	        expect(result).toEqual(service.retval.allowed);
    	});
	});
	
	describe('with admin user', function () {
		beforeEach(function(){
			user = { role: 'admin' };
		})
    	it('xxx role should allow access', function() {
			// admin can act in any role
        	result = service.access(user, 'xxx')
	        expect(result).toEqual(service.retval.allowed);
    	});
    	it('admin role should allow access', function() {
        	result = service.access(user, 'admin')
	        expect(result).toEqual(service.retval.allowed);
    	});
	});
	
	describe('with ppp user in', function () {
		beforeEach(function(){
			user = { role: 'ppp' };
		})
    	it('xxx role should deny access', function() {
        	result = service.access(user, 'xxx')
	        expect(result).toEqual(service.retval.denied);
    	});
    	it('admin role should deny access', function() {
        	result = service.access(user, 'admin')
	        expect(result).toEqual(service.retval.denied);
    	});
    	it('ppp role should allow access', function() {
        	result = service.access(user, 'ppp')
	        expect(result).toEqual(service.retval.allowed);
    	});
	});
});