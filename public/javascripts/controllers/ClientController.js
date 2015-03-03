/**
 * @author Jorge Guitard T. <jguitard@tie.cl>
 * 
 */

var NodeKanbanApp = (typeof NodeKanbanApp === undefined) ? undefined
		: NodeKanbanApp;

var ClientController = function($scope, $http, $window, $log, Task,
		ClassOfService, Swimlane) {

	$scope.getDate = function(str) {
		return (str !== undefined) ? new Date(
			str.split(
				'/').reverse().join(
				'/')) : '';
	};

	$scope.tasks = (function(Task) {
		var tasks = Task.query();
		return tasks;
	})(Task);

	$scope.classesOfService = (function(ClassOfService) {
		var classesOfService = ClassOfService.query();
		return classesOfService;
	})(ClassOfService);

	$scope.swimlanes = (function(Swimlane) {
		var swimlanes = Swimlane.query();
		return swimlanes;
	})(Swimlane);

	$scope.Date = new Date();
	$scope.Math = Math;
	// $scope.holidays = Holiday.query();
	$http
			.get(
				'http://www.google.com/calendar/feeds/cl__es%40holiday.calendar.google.com/public/basic?alt=json&orderby=starttime&max-results=366&singleevents=true')
			.success(
				function(data, status, headers, config) {
					$scope.holidays = data.feed.entry;
				}).error(
				function(data, status, headers, config) {
					// log error
				});

	$scope.editTask = function(id) {
		var task = Task.query(id);

	};

	$scope.pullTask = function(id) {

	};

	$scope.deleteTask = function(id) {

	};

};

// MetricsController.$inject = [ '$scope', '$http' ];
ClientController.$inject = [ '$scope', '$http', '$window', '$log' ];

NodeKanbanApp.controller(
	// 'MetricsController', [ '$scope', 'Task', 'Holiday', MetricsController ]);
	// 'MetricsController', [ '$scope', '$http', 'Task', MetricsController ]);
	'ClientController', [ '$scope', '$http', '$window', '$log', 'Task',
			'ClassOfService', 'Swimlane', ClientController ]);