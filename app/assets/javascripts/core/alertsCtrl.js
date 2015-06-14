angular.module('ngTerpsys')
.controller('AlertsCtrl', ['$scope', 'alertsService', function ($scope,alertsService) {
  $scope.alerts = alertsService.alerts

  $scope.addAlert = function(message) {
    alertsService.create({msg: message});
  };

  $scope.closeAlert = function(index) {
    alertsService.delete(index);
  };
}])
