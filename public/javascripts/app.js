/**
 * @ngdoc overview
 * @name KioskUIApp
 */

var KioskUIApp = angular.module('KioskUIApp', [ 'ngResource' ]); //$NON-NLS-1$ $NON-NLS-2$

KioskUIApp.factory('Stage', function($resource) { //$NON-NLS-1$
	// return $resource('/api/stages/:id"');
	return {
		query : function() {
			return [ {
				name : "Desarrollo", //$NON-NLS-1$
				priority : 1,
				wip : {
					pre : 2,
					task : 3,
					post : 3
				}
			}, {
				name : "Testing", //$NON-NLS-1$
				priority : 2,
				wip : {
					task : 2,
					post : 3
				}
			}, ];
		}
	};

});

KioskUIApp.factory('Swimlane', function($resource) { //$NON-NLS-1$
	// return $resource('/api/swimlanes/:id"');
	return {
		query : function() {
			return [ {
				name : "Proyecto 1" //$NON-NLS-1$
			}, {
				name : "Proyecto 2" //$NON-NLS-1$
			}, {
				name : "Expedito", //$NON-NLS-1$
				only_stages : {
					pre : [],
					main : [ "Desarrollo", "Testing" ], //$NON-NLS-1$ $NON-NLS-2$
					post : [ "Testing" ] //$NON-NLS-1$
				},
				single_wip : true
			}, ];
		}
	};
});