/**
 * @author Jorge Guitard T. <jguitard@tie.cl>
 * 
 */

var NodeKanbanApp = (typeof NodeKanbanApp === undefined) ? undefined
		: NodeKanbanApp;

// var MetricsController = function($scope, Task, Holiday) {
// var MetricsController = function($scope, $http, Task) {
var MetricsController = function($scope, $http, $window, $log, Task) {
	// var _this = this;

	$scope.getDate = function(str) {
		return (str !== undefined) ? new Date(
			str.split(
				'/').reverse().join(
				'/')) : '';
	};

	$scope.sum = function(collection, property) {
		var total = 0;
		for (var i = 0; i < collection.length; i++) {
			total += (collection[i][property] !== undefined) ? collection[i][property]
					: 0;
		}
		return total;
	};

	$scope.avg = function(collection, property1, property2) {
		var result;
		if (collection.length > 0) {
			if (property2 === undefined) {
				result = $scope.sum(
					collection, property1) / collection.length;
			} else {
				var sum = 0;
				for (var i = 0; i < collection.length; i++) {
					sum += collection[i][property1] / collection[i][property2];
				}
				result = sum / collection.length;
			}
		}
		return result;
	};

	$scope.variance = function(collection, property1, property2) {
		var avg = $scope.avg(
			collection, property1, property2);
		var sumvar = 0;
		for (var i = 0; i < collection.length; i++) {
			if (property2 === undefined) {
				sumvar += Math
						.pow(
							(((collection[i][property1] !== undefined) ? collection[i][property1]
									: 0) - avg), 2);
			} else {
				var prop1val = (collection[i][property1] !== undefined) ? collection[i][property1]
						: 0;
				var prop2val = (collection[i][property2] !== undefined) ? collection[i][property2]
						: 0;
				sumvar += Math.pow(
					(prop1val / prop2val) - avg, 2);
			}

		}
		return sumvar / collection.length;
	};

	$scope.stddev = function(collection, property1, property2) {
		return Math.sqrt($scope.variance(
			collection, property1, property2));
	};

	$scope.tasks = (function(Task) {
		var tasks = Task.query();
		for (var i = 0; i < tasks.length; i++) {
			try {
				// Al lead_time se le deben restar los días hábiles
				tasks[i].lead_time = Math
						.floor((tasks[i].dates.delivery - tasks[i].dates.request) /
							(60 * 60 * 24 * 1000));
			} catch (e) {
				tasks[i].lead_time = undefined;
			}

			try {
				// Al cycle_time se le deben restar los días hábiles
				tasks[i].cycle_time = Math
						.floor((tasks[i].dates.delivery - tasks[i].dates.start) /
							(60 * 60 * 24 * 1000));
			} catch (e) {
				tasks[i].cycle_time = undefined;
			}

			try {
				tasks[i].touch_time = (Math.floor(tasks[i].cycle_time)) -
					((tasks[i].idle_time !== undefined) ? tasks[i].idle_time
							: 0);
			} catch (e) {
				tasks[i].touch_time = undefined;
			}
		}
		return tasks;
	})(Task);

	var _getMetrics = function(tasks) {
		return {
			avg : {
				lead_time : (function(collection) {
					return $scope.avg(
						collection, 'lead_time');
				})(tasks),
				cycle_time : (function(collection) {
					return $scope.avg(
						collection, 'cycle_time');
				})(tasks),
				touch_time : (function(collection) {
					return $scope.avg(
						collection, 'touch_time');
				})(tasks),
				t_c_time : (function(collection) {
					return $scope.avg(
						collection, 'touch_time', 'cycle_time');
				})(tasks),
				c_l_time : (function(collection) {
					return $scope.avg(
						collection, 'cycle_time', 'lead_time');
				})(tasks)
			},
			stddev : {
				lead_time : (function(collection) {
					return $scope.stddev(
						collection, 'lead_time');
				})(tasks),
				cycle_time : (function(collection) {
					return $scope.stddev(
						collection, 'cycle_time');
				})(tasks),
				touch_time : (function(collection) {
					return $scope.stddev(
						collection, 'touch_time');
				})(tasks),
				t_c_time : (function(collection) {
					return $scope.stddev(
						collection, 'touch_time', 'cycle_time');
				})(tasks),
				c_l_time : (function(collection) {
					return $scope.stddev(
						collection, 'cycle_time', 'lead_time');
				})(tasks)
			}
		};
	};

	$scope.metrics = _getMetrics($scope.tasks);

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

	$scope.fetch = function() {
		// $scope.$apply();
		var tasks = [];
		for (var i = 0; i < $scope.tasks.length; i++) {
			try {
				if (new Date(
					$scope.tasks[i].dates.delivery) >= (new Date(
					$scope.dateFrom.split(
						'/').reverse().join(
						'/'))) && new Date(
					$scope.tasks[i].dates.delivery) <= (new Date(
					$scope.dateTo.split(
						'/').reverse().join(
						'/')))) {
					tasks.push($scope.tasks[i]);
				}
			} catch (e) {
				// $log.error(e);
			}
		}

		// Revisar métricas (ver si se toma en cuenta el filtro de fechas dentro
		// de esta función)
		$scope.metrics = _getMetrics(tasks);
	};

};

// MetricsController.$inject = [ '$scope', '$http' ];
MetricsController.$inject = [ '$scope', '$http', '$window', '$log' ];

NodeKanbanApp.controller(
	// 'MetricsController', [ '$scope', 'Task', 'Holiday', MetricsController ]);
	// 'MetricsController', [ '$scope', '$http', 'Task', MetricsController ]);
	'MetricsController', [ '$scope', '$http', '$window', '$log', 'Task',
			MetricsController ]);

NodeKanbanApp.filter(
	'betweenDates', function() {
		return function(tasks, from, to) {
			var filtered;
			filtered = [];
			if (from !== '' || to !== '') {
				for (var i = 0; i < tasks.length; i++) {
					var task = tasks[i];
					if (task.dates !== undefined) {
						if (task.dates.delivery >= from &&
							task.dates.delivery <= to) {
							filtered.push(task);
						}
					}
				}
			}
			return filtered;
		};
	});