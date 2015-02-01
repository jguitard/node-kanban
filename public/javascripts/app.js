/**
 * @ngdoc overview
 * @name NodeKanbanApp
 */

// testing
var desarrollo = {
	name : "Desarrollo", //$NON-NLS-1$
	priority : 1,
	wip : {
		task : 2,
		post : 3
	}
};
var testing = {
	name : "Testing", //$NON-NLS-1$
	priority : 2,
	wip : {
		pre : 4,
		task : 5,
		post : 6
	}
};

var NodeKanbanApp = angular.module(
	'NodeKanbanApp', [ 'ngResource' ]);
NodeKanbanApp.factory(
	'Stage', function($resource) {
		// return $resource('/api/stages/:id"');
		return {
			query : function() {
				return [ desarrollo, testing ];
			}
		};

	});

NodeKanbanApp.factory(
	'Swimlane', function($resource) {
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
						task : [ desarrollo.name, testing.name ],
						post : [ testing.name ]
					//$NON-NLS-1$
					},
					/*
					 * only_stages : { pre : [], main : [ { name : "Desarrollo" }, {
					 * name : "Testing" } ], post : [ { name : "Testing" } ] },
					 */
					single_wip : true
				}, ];
			}
		};
	});

NodeKanbanApp
		.factory(
			'Task',
			function($resource) {
				// return $resource('/api/tasks/:id"');
				return {
					query : function() {
						return [
								{
									id : 840,
									name : "Tarea 1",
									swimlane : "Proyecto 1",
									stage : "Desarrollo",
									wip : "task",
									cos : 1,
									dates : {
										request : new Date(
											"November 10, 2014 09:00:00"),
										start : new Date(
											"November 18, 2014 13:00:00"),
										delivery : new Date(
											"November 24, 2014 19:00:00")

									},
									idle_time : 3,
									items : [ {
										name : 'Interfaz',
										done : true
									}, {
										name : 'Base de datos',
										done : false
									}, {
										name : 'API',
										done : false
									} ],
									users : [
											{
												name : 'Usuario 1',
												picture : 'http://api.randomuser.me/portraits/med/men/31.jpg'
											},
											{
												name : 'Usuario 2',
												picture : 'http://api.randomuser.me/portraits/med/men/32.jpg'
											},
											{
												name : 'Usuario 3',
												picture : 'http://api.randomuser.me/portraits/med/men/33.jpg'
											},
											{
												name : 'Usuario 4',
												picture : 'http://api.randomuser.me/portraits/med/men/31.jpg'
											},
											{
												name : 'Usuario 5',
												picture : 'http://api.randomuser.me/portraits/med/men/32s.jpg'
											} ]

								},
								{
									id : 841,
									name : "Tarea 2",
									swimlane : "Proyecto 2",
									stage : "",
									wip : "pre",
									cos : 2,
									dates : {
										request : new Date(
											"November 19, 2014 12:00:00"),
										start : new Date(
											"November 20, 2014 18:00:00"),
										delivery : new Date(
											"November 22, 2014 19:00:00")

									},
									items : [ {
										name : 'Interfaz',
										done : false
									}, {
										name : 'Base de datos',
										done : false
									}, {
										name : 'API',
										done : false
									} ],
									users : [
											{
												name : 'Usuario 1',
												picture : 'http://api.randomuser.me/portraits/med/men/41.jpg'
											},
											{
												name : 'Usuario 2',
												picture : 'http://api.randomuser.me/portraits/med/men/42.jpg'
											},
											{
												name : 'Usuario 3',
												picture : 'http://api.randomuser.me/portraits/med/men/43.jpg'
											},
											{
												name : 'Usuario 4',
												picture : 'http://api.randomuser.me/portraits/med/men/41.jpg'
											},
											{
												name : 'Usuario 5',
												picture : 'http://api.randomuser.me/portraits/med/men/42.jpg'
											},
											{
												name : 'Usuario 6',
												picture : 'http://api.randomuser.me/portraits/med/men/43.jpg'
											} ]
								},
								{
									id : 842,
									name : "Tarea 3",
									swimlane : "Expedito",
									stage : "Testing",
									wip : "post",
									cos : 3,
									idle_time : 4,
									dates : {
										request : new Date(
											"October 17, 2014 10:00:00"),
										start : new Date(
											"November 10, 2014 14:30:00"),
										delivery : new Date(
											"November 16, 2014 16:00:00")

									},
									items : [ {
										name : 'Interfaz',
										done : true
									}, {
										name : 'Base de datos',
										done : false
									}, {
										name : 'API',
										done : false
									} ],
									users : [
											{
												name : 'Usuario 1',
												picture : 'http://api.randomuser.me/portraits/med/men/51.jpg'
											},
											{
												name : 'Usuario 2',
												picture : 'http://api.randomuser.me/portraits/med/men/52.jpg'
											},
											{
												name : 'Usuario 3',
												picture : 'http://api.randomuser.me/portraits/med/men/53.jpg'
											},
											{
												name : 'Usuario 4',
												picture : 'http://api.randomuser.me/portraits/med/men/51.jpg'
											} ]
								},
								{
									id : 843,
									name : "Tarea 4",
									swimlane : "Proyecto 2",
									stage : "",
									wip : "post",
									cos : 4,
									items : [ {
										name : 'Interfaz',
										done : true
									}, {
										name : 'Base de datos',
										done : true
									}, {
										name : 'API',
										done : true
									} ],
									users : [
											{
												name : 'Usuario 1',
												picture : 'http://api.randomuser.me/portraits/med/men/61.jpg'
											},
											{
												name : 'Usuario 2',
												picture : 'http://api.randomuser.me/portraits/med/men/62.jpg'
											},
											{
												name : 'Usuario 3',
												picture : 'http://api.randomuser.me/portraits/med/men/63.jpg'
											} ]
								}, ];
					}
				};
			});

NodeKanbanApp.factory(
	'ClassOfService', function($resource) {
		// return $resource('/api/classes-of-service/:id"');
		return {
			query : function() {
				return [ {
					priority : 1,
					name : "Normal"
				}, {
					priority : 2,
					name : "Prioritario"
				}, {
					priority : 3,
					name : "Fecha fija",
				}, {
					priority : 4,
					name : "Intangible"
				} ];
			}
		};
	});

/*
 * NodeKanbanApp .factory( 'Holiday', function($resource) { return
 * $resource('http://www.google.com/calendar/feeds/cl__es%40holiday.calendar.google.com/public/basic?alt=json&orderby=starttime&max-results=366&singleevents=true');
 * });
 */