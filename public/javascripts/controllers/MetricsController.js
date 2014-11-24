/**
 * @author Jorge Guitard T. <jguitard@tie.cl>
 * 
 */
var MetricsController = function($scope, Task, Holiday) {
	var _this = this;

	$scope.tasks = Task.query();
	$scope.Date = new Date;
	$scope.Math = Math;
	$scope.holidays = Holiday.query();

};

MetricsController.$inject = [ '$scope' ]; //$NON-NLS-1$

NodeKanbanApp
		.controller(
				'MetricsController', [ '$scope', 'Task', 'Holiday', MetricsController ]); //$NON-NLS-1$