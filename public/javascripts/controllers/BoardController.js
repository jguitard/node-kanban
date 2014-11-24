/**
 * @author Jorge Guitard T. <jguitard@tie.cl>
 * 
 */
var BoardController = function($scope, Stage, Swimlane, Task, ClassOfService) {
	var _this = this;

	$scope.stages = Stage.query();
	$scope.swimlanes = Swimlane.query();
	$scope.tasks = Task.query();
	$scope.classes_of_service = ClassOfService.query();

};

BoardController.$inject = [ '$scope' ]; //$NON-NLS-1$

NodeKanbanApp
		.controller(
				'BoardController', [ '$scope', 'Stage', 'Swimlane', 'Task', 'ClassOfService', BoardController ]); //$NON-NLS-1$