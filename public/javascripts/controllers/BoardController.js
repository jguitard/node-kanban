/**
 * @author Jorge Guitard T. <jguitard@tie.cl>
 * 
 */

var NodeKanbanApp = (typeof NodeKanbanApp === undefined) ? undefined
		: NodeKanbanApp;

var BoardController = function($scope, Stage, Swimlane, Task, ClassOfService) {
	// var _this = this;

	$scope.stages = Stage.query();
	$scope.swimlanes = Swimlane.query();
	$scope.tasks = (function(Task) {
		var tasks = Task.query();
		for (var i = 0; i < tasks.length; i++) {
			try {
				tasks[i].lead_time = Math
						.floor((tasks[i].dates.delivery - tasks[i].dates.request) /
							(60 * 60 * 24 * 1000));
			} catch (e) {
				tasks[i].lead_time = undefined;
			}

			try {
				tasks[i].cycle_time = Math
						.floor((tasks[i].dates.delivery - tasks[i].dates.start) /
							(60 * 60 * 24 * 1000));
			} catch (e) {
				tasks[i].cycle_time = undefined;
			}

			try {
				tasks[i].touch_time = (Math
						.floor((tasks[i].dates.delivery - tasks[i].dates.request) /
							(60 * 60 * 24 * 1000))) -
					((tasks[i].idle_time !== undefined) ? tasks[i].idle_time
							: 0);
			} catch (e) {
				tasks[i].touch_time = undefined;
			}
		}
		return tasks;
	})(Task);
	$scope.classes_of_service = ClassOfService.query();

};

BoardController.$inject = [ '$scope' ];

NodeKanbanApp.controller(
	'BoardController', [ '$scope', 'Stage', 'Swimlane', 'Task',
			'ClassOfService', BoardController ]);