/**
 * @author Jorge Guitard T. <jguitard@tie.cl>
 * 
 */
var BoardController = function($scope, Stage, Swimlane) {
	var _this = this;

	$scope.stages = Stage.query();
	$scope.swimlanes = Swimlane.query();

};

BoardController.$inject = [ '$scope' ]; //$NON-NLS-1$

KioskUIApp.controller(
		'BoardController', [ '$scope', 'Stage', 'Swimlane', BoardController ]); //$NON-NLS-1$