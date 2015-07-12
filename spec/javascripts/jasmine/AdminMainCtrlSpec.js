describe('A1::Admins::MainCtrl', function() {
    var $q,
        $rootScope,
        $scope,
        mockAdminService,
        mockQueryResponse;

	beforeEach(module('assign'));
	
	beforeEach(inject(function(_$q_, _$rootScope_) {
  		$q = _$q_;
  		$rootScope = _$rootScope_;
	}));
	
	beforeEach(inject(function($controller) {
	  $scope = $rootScope.$new();

	  mockAdminService = {
	    query: function() {
	      queryDeferred = $q.defer();
	      return {$promise: queryDeferred.promise};
	    }
	  }

	  spyOn(mockAdminService, 'query').and.callThrough();

	  $controller('AdminMainCtrl', {
	    '$scope': $scope,
	    'AdminService': mockAdminService
	  });
	}));
	
	describe('Initialization', function() {
	    beforeEach(function() {
			mockQueryResponse = [{a:1},{b:2},{c:3}];
	      	queryDeferred.resolve(mockQueryResponse);
	      	$rootScope.$apply();
	    });
		it('should query the AdminService', function() {
		    expect(mockAdminService.query).toHaveBeenCalled();
		});
		it('should set the displayCollection', function() {
		    expect($scope.displayCollection).toEqual(mockQueryResponse);
		});
		// it('should set $scope.somethingAfterBagelsLoad to true', function() {
		//     expect($scope.somethingAfterBagelsLoad).toBe(true);
		// });
	});
});
	
