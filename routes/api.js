var express = require('express');
var router = express.Router();

// temporary storage
var temp = {};
temp.users = {};
temp.tasks = [];

router.use(function(req, res, next) {
	var auth = (req.connection._peername.address == '::1' ||
			req.connection._peername.address == '127.0.0.1');
	if (auth)
		next();
	else
		res.status(401).send('No autorizado');
});

router.get(
	'/users', function(req, res) {
		res.status(200).json(temp.users);
	});

router.get(
	'/users/:id_user', function(req, res) {
		switch(temp.users[req.params.id_user]) {
			case undefined:
				res.status(404).send('No encontrado');
				break;
			default:
				res.status(200).json(temp.users[req.params.id_user]);
		}
	});

router.put(
	'/users/:id_user', function(req, res) {
		switch(temp.users[req.params.id_user]) {
			case undefined:
				temp.users[req.params.id_user] = req.body;
				res.status(201).send('Creado');
				break;
			default:
				temp.users[req.params.id_user] = req.body;
				res.status(204).send('Modificado');
		}
	});

router.delete(
	'/users/:id_user', function(req, res) {
		switch (temp.users[req.params.id_user]) {
			case undefined:
				res.status(404).send('No encontrado');
				break;
			default:
				temp.users[req.params.id_user] = undefined;
				res.status(204).send('Eliminado');
		}
	});

router.get(
	'/tasks', function(req, res) {
		res.status(200).json(temp.tasks);
	});

router.post(
	'/tasks', function(req, res) {
		var length = temp.tasks.push(req.body);
		res.status(201).json(temp.tasks[length - 1]);
	});

router.get(
	'/tasks/:id_task', function(req, res) {
		switch(temp.tasks[req.params.id_task]) {
			case undefined:
				res.status(404).send('No encontrado');
				break;
			default:
				res.status(200).json(temp.tasks[req.params.id_task]);
		}
	});

router.put(
	'/tasks/:id_task', function(req, res) {
		switch(temp.tasks[req.params.id_user]) {
			case undefined:
				temp.tasks[req.params.id_tasks] = req.body;
				res.status(201).send('Creado');
				break;
			default:
				temp.tasks[req.params.id_task] = req.body;
				res.status(204).send('Modificado');
		}
	});

router.delete(
	'/tasks/:id_task', function(req, res) {
		switch (temp.users[req.params.id_task]) {
			case undefined:
				res.status(404).send('No encontrado');
				break;
			default:
				temp.tasks[req.params.id_task] = undefined;
				res.status(204).send('Eliminado');
		}
	});

router.post(
	'/tasks/:id_task/pull', function(req, res) {
		switch (temp.users[req.params.id_task]) {
			case undefined:
				res.status(404).send('No encontrado');
				break;
			default:
				res.status(204).send('Tarea movida');
		}
	});

router.get(
	'/tasks/:id-task/users', function(req, res) {
		res.status(200).json(temp.tasks);
	});

router.put(
	'/tasks/:id-task/users/:id-user', function(req, res) {
		res.send('respond with a resource');
	});

router.delete(
	'/tasks/:id-task/users/:id-user', function(req, res) {
		res.send('respond with a resource');
	});

router.get(
	'/swimlanes', function(req, res) {
		res.send('respond with a resource');
	});

router.post(
	'/swimlanes', function(req, res) {
		res.send('respond with a resource');
	});

router.get(
	'/swimlanes/:id-swimlane', function(req, res) {
		res.send('respond with a resource');
	});

router.put(
	'/swimlanes/:id-swimlane', function(req, res) {
		res.send('respond with a resource');
	});

router.delete(
	'/swimlanes/:id-swimlane', function(req, res) {
		res.send('respond with a resource');
	});

router.get(
	'/swimlanes/:id-swimlane/tasks', function(req, res) {
		res.send('respond with a resource');
	});

router.put(
	'/swimlanes/:id-swimlane/tasks/:id-task', function(req, res) {
		res.send('respond with a resource');
	});

router.get(
	'/stages', function(req, res) {
		res.send('respond with a resource');
	});

router.post(
	'/stages', function(req, res) {
		res.send('respond with a resource');
	});

router.get(
	'/stages/:id-stage', function(req, res) {
		res.send('respond with a resource');
	});

router.put(
	'/stages/:id-stage', function(req, res) {
		res.send('respond with a resource');
	});


router.delete(
	'/stages/:id-stage', function(req, res) {
		res.send('respond with a resource');
	});

router.get(
	'/classes-of-service', function(req, res) {
		res.send('respond with a resource');
	});

router.post(
	'/classes-of-service', function(req, res) {
		res.send('respond with a resource');
	});

router.get(
	'/classes-of-service/:id-cos', function(req, res) {
		res.send('respond with a resource');
	});

router.put(
	'/classes-of-service/:id-cos', function(req, res) {
		res.send('respond with a resource');
	});


router.delete(
	'/classes-of-service/:id-cos', function(req, res) {
		res.send('respond with a resource');
	});

router.get(
	'/classes-of-service/:id-cos/tasks', function(req, res) {
		res.send('respond with a resource');
	});

router.put(
	'/classes-of-service/:id-cos/tasks/:id-task', function(req, res) {
		res.send('respond with a resource');
	});


module.exports = router;
