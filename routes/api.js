var express = require('express');
var Datastore = require('nedb');
var merge = require('merge');

var router = express.Router();

var users = new Datastore(
	{
		filename : '../storage/users.db',
		autoload : true
	});

var tasks = new Datastore(
	{
		filename : '../storage/tasks.db',
		autoload : true
	});

var swimlanes = new Datastore(
	{
		filename : '../storage/swimlanes.db',
		autoload : true
	});

var stages = new Datastore(
	{
		filename : '../storage/stages.db',
		autoload : true
	});

var classesOfService = new Datastore(
	{
		filename : '../storage/classes-of-service.db',
		autoload : true
	});

// temporary storage
var temp = {};
temp.users = {};
temp.tasks = [];

router.use(function(req, res, next) {

	var auth = (req.connection._peername.address == '::1' ||
			req.connection._peername.address == '127.0.0.1' ||
			req.connection._peername.address == 'localhost');
	auth = true;
	if (auth)
		next();
	else
		res.status(401).send('No autorizado');
});

router.get(
	'/users', function(req, res) {
		users.find({}, function(err, docs) {
			res.status(200).send(docs);
		});
	});

router.get(
	'/users/:id_user', function(req, res) {
		users.findOne({ _id: req.params.id_user }, function(err, doc) {
			switch(doc) {
				case undefined:
					res.status(404).send('No encontrado');
					break;
				default:
					res.status(200).send(doc);
			}
		});
	});

router.put(
	'/users/:id_user', function(req, res) {
		users.update({ _id: req.params.id_user }, { $set: req.body }, { upsert: true }, function(err, numReplaced, newDoc) {
			if (numReplaced == 1 && newDoc != undefined)
				res.status(201).send(newDoc);
			else if (numReplaced == 1 && newDoc == undefined)
				res.status(204).send('Modificado');
			else if (err != null)
				res.status(400).send('Error 400');
		});
	});

router.delete(
	'/users/:id_user', function(req, res) {
		users.remove({ _id: req.params.id_user }, {}, function(err, numRemoved) {
			if (err == null && numRemoved == 1)
				res.status(204).send('Eliminado');
			else if (err == null && numRemoved == 0)
				res.status(404).send('No encontrado');
			else
				res.status(400).send('Error 400');
				
		});
	});

router.get(
	'/tasks', function(req, res) {
		tasks.find({}, function(err, docs) {
			res.status(200).send(docs);
		});
	});

router.post(
	'/tasks', function(req, res) {
		tasks.find({}).sort({ _id: -1 }).limit(1).exec(function(err, docs) {
			var autoIncrement = (docs.length > 0)? docs[0]._id + 1 : 1;
			var items = req.body.items;
			var newItems = [];
			for(var i = 0; i < items.length; i++)
				newItems.push({ name: items[i], done: false });
			req.body.items = newItems;
			tasks.insert(merge({ _id: autoIncrement }, req.body), function(err, newDoc) {
				if (err == null)
					res.status(201).send(newDoc);
			});
		});
	});

router.get(
	'/tasks/:id_task', function(req, res) {
		tasks.findOne({ _id: parseInt(req.params.id_task) }, function(err, doc) {
			switch(doc) {
				case null:
					res.status(404).send('No encontrado');
					break;
				default:
					res.status(200).send(doc);
			}
		});
	});

router.put(
	'/tasks/:id_task', function(req, res) {
		tasks.update({ _id: parseInt(req.params.id_task) }, { $set: req.body }, { upsert: false }, function(err, numReplaced, newDoc) {
			if (err == undefined && numReplaced == 1)
				res.status(204).send('Modificado');
			else if (err == undefined && numReplaced == 0)
				res.status(404).send('No encontrado');
		});
	});

router.delete(
	'/tasks/:id_task', function(req, res) {
		tasks.remove({ _id: parseInt(req.params.id_task) }, {}, function(err, numRemoved) {
			if (err == null && numRemoved == 1)
				res.status(204).send('Eliminado');
			else if (err == null && numRemoved == 0)
				res.status(404).send('No encontrado');
			else
				res.status(400).send('Error 400');
				
		});
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
	'/tasks/:id_task/users', function(req, res) {
		res.status(200).json(temp.tasks);
	});

router.put(
	'/tasks/:id_task/users/:id-user', function(req, res) {
		res.send('respond with a resource');
	});

router.delete(
	'/tasks/:id_task/users/:id-user', function(req, res) {
		res.send('respond with a resource');
	});

router.get(
	'/swimlanes', function(req, res) {
		swimlanes.find({}, function(err, docs) {
			res.status(200).send(docs);
		});
	});

router.post(
	'/swimlanes', function(req, res) {
		swimlanes.insert(req.body, function(err, newDoc) {
			if (err == null)
				res.status(201).send(newDoc);
		});
	});

router.get(
	'/swimlanes/:id_swimlane', function(req, res) {
		swimlanes.findOne({ _id: req.params.id_swimlane }, function(err, doc) {
			switch(doc) {
				case null:
					res.status(404).send('No encontrado');
					break;
				default:
					res.status(200).send(doc);
			}
		});
	});

router.put(
	'/swimlane/:id_swimlane', function(req, res) {
		swimlanes.update({ _id: req.params.id_swimlane }, { $set: req.body }, { upsert: false }, function(err, numReplaced, newDoc) {
			if (err == undefined && numReplaced == 1)
				res.status(204).send('Modificado');
			else if (err == undefined && numReplaced == 0)
				res.status(404).send('No encontrado');
		});
	});

router.delete(
	'/swimlanes/:id_swimlane', function(req, res) {
		swimlanes.remove({ _id: req.params.id_swimlane }, {}, function(err, numRemoved) {
			if (err == null && numRemoved == 1)
				res.status(204).send('Eliminado');
			else if (err == null && numRemoved == 0)
				res.status(404).send('No encontrado');
			else
				res.status(400).send('Error 400');
				
		});
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
		stages.find({}, function(err, docs) {
			res.status(200).send(docs);
		});
	});

/*
 * router.post( '/stages', function(req, res) { stages.insert(req.body,
 * function(err, newDoc) { if (err == null) res.status(201).send(newDoc); });
 * });
 */

router.post(
	'/stages', function(req, res) {
		stages.find({}).sort({ _id: -1 }).limit(1).exec(function(err, docs) {
			var autoIncrement = (docs.length > 0)? docs[0]._id + 1 : 1;
			stages.insert(merge({ _id: autoIncrement }, req.body), function(err, newDoc) {
				if (err == null)
					res.status(201).send(newDoc);
			});
		});
	});

router.get(
	'/stages/:id_stage', function(req, res) {
		stages.findOne({ _id: req.params.id_stage }, function(err, doc) {
			switch(doc) {
				case null:
					res.status(404).send('No encontrado');
					break;
				default:
					res.status(200).send(doc);
			}
		});
	});

router.put(
	'/stages/:id_stage', function(req, res) {
		stages.update({ _id: req.params.id_stage }, { $set: req.body }, { upsert: false }, function(err, numReplaced, newDoc) {
			if (err == undefined && numReplaced == 1)
				res.status(204).send('Modificado');
			else if (err == undefined && numReplaced == 0)
				res.status(404).send('No encontrado');
		});
	});

router.delete(
	'/stages/:id_stage', function(req, res) {
		stages.remove({ _id: req.params.id_stage }, {}, function(err, numRemoved) {
			if (err == null && numRemoved == 1)
				res.status(204).send('Eliminado');
			else if (err == null && numRemoved == 0)
				res.status(404).send('No encontrado');
			else
				res.status(400).send('Error 400');
				
		});
	});

router.get(
	'/classes-of-service', function(req, res) {
		classesOfService.find({}, function(err, docs) {
			res.status(200).send(docs);
		});
	});

/*
 * router.post( '/classes-of-service', function(req, res) {
 * classesOfService.insert(req.body, function(err, newDoc) { if (err == null)
 * res.status(201).send(newDoc); }); });
 */

router.post(
	'/classes-of-service', function(req, res) {
		classesOfService.find({}).sort({ _id: -1 }).limit(1).exec(function(err, docs) {
			var autoIncrement = (docs.length > 0)? docs[0]._id + 1 : 1;
			classesOfService.insert(merge({ _id: autoIncrement }, req.body), function(err, newDoc) {
				if (err == null)
					res.status(201).send(newDoc);
			});
		});
	});

router.get(
	'/classes-of-service/:id_cos', function(req, res) {
		classesOfService.findOne({ _id: req.params.id_cos }, function(err, doc) {
			switch(doc) {
				case null:
					res.status(404).send('No encontrado');
					break;
				default:
					res.status(200).send(doc);
			}
		});
	});

router.put(
	'/classes-of-service/:id_cos', function(req, res) {
		classesOfService.update({ _id: req.params.id_cos }, { $set: req.body }, { upsert: false }, function(err, numReplaced, newDoc) {
			if (err == undefined && numReplaced == 1)
				res.status(204).send('Modificado');
			else if (err == undefined && numReplaced == 0)
				res.status(404).send('No encontrado');
		});
	});

router.delete(
	'/classes-of-service/:id_cos', function(req, res) {
		swimlanes.remove({ _id: req.params.id_cos }, {}, function(err, numRemoved) {
			if (err == null && numRemoved == 1)
				res.status(204).send('Eliminado');
			else if (err == null && numRemoved == 0)
				res.status(404).send('No encontrado');
			else
				res.status(400).send('Error 400');
				
		});
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
