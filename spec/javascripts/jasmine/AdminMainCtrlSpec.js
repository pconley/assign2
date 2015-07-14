describe('A1::Admins::TestCtrl', function() {
    var $rootScope, $scope;
	var $httpBackend, service;

	beforeEach(module('assign'));
	
	beforeEach(inject(function(_$rootScope_,_$httpBackend_, AdminService) {
  		$rootScope = _$rootScope_;
    	$httpBackend = _$httpBackend_;
    	service = AdminService;
	}));
		
	beforeEach(inject(function($controller) {
	  $scope = $rootScope.$new();
	  $controller('AdminMainCtrl', {
	    '$scope': $scope,
	    'AdminService': service
	  });
	}));
	
	var rec1 = {id:91, a:1};
	var rec2 = {id:92, b:2};
	var rec3 = {id:93, c:3};
	var sample = [rec1,rec2,rec3];
	
	beforeEach(function() {
		$httpBackend.whenGET('/a1/admins').respond(sample);
		$httpBackend.flush(); // the initial query
    });

	describe('Initialization', function() {
		it('should query the AdminService', function() {
			$httpBackend.expectGET('/a1/admins');
			expect(1).toEqual(1);
		});
		it('should set the adminsCollection', function() {
		    expect($scope.adminsCollection.length).toEqual(3);
		});
	});
	describe('deleteAdmin', function() {
		beforeEach(function(){
			var id = rec1.id;
			$httpBackend.whenDELETE('/a1/admins/'+id).respond({});
			$httpBackend.expectDELETE('/a1/admins/'+id);
		})
		it('should remove the record', function() {
			var row1 = $scope.adminsCollection[0];
			$scope.deleteAdmin(row1);
			$httpBackend.flush();
			expect($scope.adminsCollection.length).toEqual(2);		
		});
	});
	
});
	
