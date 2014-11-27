/**
 * @author Jorge Guitard T. <jguitard@tie.cl>
 * 
 */
// var MetricsController = function($scope, Task, Holiday) {
var MetricsController = function($scope, $http, Task) {
	var _this = this;

	$scope.tasks = Task.query();
	$scope.Date = new Date;
	$scope.Math = Math;
	// $scope.holidays = Holiday.query();
	$http
			.get(
					'http://www.google.com/calendar/feeds/cl__es%40holiday.calendar.google.com/public/basic?alt=json&orderby=starttime&max-results=366&singleevents=true')
			.success(function(data, status, headers, config) {
				$scope.holidays = data.feed.entry;
			}).error(function(data, status, headers, config) {
				// log error
			});

};

MetricsController.$inject = [ '$scope', '$http' ]; //$NON-NLS-1$

NodeKanbanApp.controller(// 'MetricsController', [ '$scope', 'Task',
// 'Holiday', MetricsController ]); //$NON-NLS-1$
'MetricsController', [ '$scope', '$http', 'Task', MetricsController ]); //$NON-NLS-1$