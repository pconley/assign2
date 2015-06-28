"use strict";

describe('Customers::CustomerCtrl', function() {
  var $scope, ctrl, $timeout, $httpBackend;
  var screenSize, $log, $modal, $filter;
  
  var mockCurrentCustomer;
  var c1 = { id: 111, name: 'pat' };
  var c2 = { id: 222, name: 'dan' };
  var c3 = { id: 333, name: 'jim' };
  var c4 = { id: 444, name: 'tom' };
  var c5 = { id: 555, name: 'mike' };
  var c6 = { id: 666, name: 'elaine' };
  var c7 = { id: 777, name: 'ted' };
  var c8 = { id: 888, name: 'tim' };
  var stub_customers = [c1,c2,c3,c3,c4,c5,c6,c7,c8];
  // var stub_success = function(){ console.log('stub success'); }
  // var stub_failure = function(){ console.log('stub failure'); }

  beforeEach(function (){
	module('assign');
    mockCurrentCustomer = c3;
    inject(function($rootScope, _$httpBackend_, $controller, $q, _screenSize_, _$modal_, _$filter_ ) {
	
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      screenSize = _screenSize_;
      $filter = _$filter_;
      $modal = _$modal_;
      
      ctrl = $controller('CustomerCtrl', {
        $scope: $scope,
		currentCustomer: mockCurrentCustomer,
		screenSize: screenSize,
		$log: $log,
		$modal: $modal,
		$filter: $filter
      });
    });
  });
 
  it('should start with no error message', function() {
    expect($scope.error_message).toEqual('');
  });
  it('should start with desktop', function() {
    expect($scope.mobile).toEqual(false);
    expect($scope.desktop).toEqual(true);
  });  
  it('should start empty customers', function() {
    expect($scope.customers).toEqual([]);
  });
  it('after load has customers', function() {
	$httpBackend.whenGET('/a1/customers.json').respond(stub_customers);
	$scope.loadCustomers().then(function(response) {
		expect($httpBackend.whenGET).toHaveBeenCalled();
		expect($scope.customers).toEqual(stub_customers);
    });
	expect(true).toEqual(true);
  });  
  it('calls the update service', function (){
	var id = mockCurrentCustomer.id;
	var expect_url = '/a1/customers/'+id+'.json';
	$httpBackend.whenPUT(expect_url).respond();
    $scope.updateCustomer(mockCurrentCustomer).then(function(response){
	    expect($httpBackend.whenPUT).toHaveBeenCalledWith(expect_url);	
	});
	expect(true).toEqual(true);
  });
  it('supports paging', function (){
	expect($scope.currentPage).toEqual(1)
	expect($scope.numPerPage).toEqual(3)
	$httpBackend.whenGET('/a1/customers.json').respond(stub_customers);
	$scope.loadCustomers().then(function(response) {
		$scope.$apply(); // to trigger the $watch.
		expect($scope.pagedCustomers).toEqual([c1,c2,c3])	
	    $scope.currentPage = 2;
	    $scope.$apply(); // to trigger the $watch.
		expect($scope.pagedCustomers).toEqual([c4,c5,c6])
    });
  });
});