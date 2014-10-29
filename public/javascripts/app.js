/**
 * @ngdoc overview
 * @name KioskUIApp
 */

var KioskUIApp = angular.module('KioskUIApp', [ 'ngResource' ]); //$NON-NLS-1$

KioskUIApp.factory('Stage', function($resource) {
	// return $resource('/api/stages/:id"');
	return {
		query : function() {
			return [ {
				name : "Desarrollo",
				priority : 1,
				wip : {
					pre : 2,
					task : 3,
					post : 3
				}
			}, {
				name : "Testing",
				priority : 2,
				wip : {
					task : 2,
					post : 3
				}
			}, ];
		}
	}

});

KioskUIApp.factory('Swimlane', function($resource) {
	// return $resource('/api/swimlanes/:id"');
	return {
		query : function() {
			return [ {
				name : "Proyecto 1"
			}, {
				name : "Proyecto 2"
			}, {
				name : "Expedito",
				only_stages : {
					pre : [],
					main : [ "Desarrollo", "Testing" ],
					post : [ "Testing" ]
				},
				single_wip : true
			}, ];
		}
	};
});