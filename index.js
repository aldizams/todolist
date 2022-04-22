var express = require('express');
var app = express();

app.use(express.json());

var data = {};

app.get('/api/todos', function (req, res) {
	res.send(data);
});

app.post('/api/todos', function (req, res) {
	const body = req.body;
	const text = req.body.text;
	if (text == '' || text == undefined || body == '' || body == undefined) {
		res.status(400).send('Error: text is empty');
		return;
	}
	const id = Math.floor(Math.random() * 100 + 1);
	data[id] = {
		text: text,
		done: false,
	};

	res.send('Success: todo added');
});

app.put('/api/todos/:id', function (req, res) {
	const body = req.body;
	const id = req.params.id;
	if (id in data) {
		if (body.text != null || body.done != null) {
			if (body.text == undefined || body.text == '') {
				data[id].done = body.done;
				res.send('Success: done data updated');
				return;
			} else if (body.done == undefined || body.done == '') {
				data[id].text = body.text;
				res.send('Success: text data updated');
				return;
			} else {
				data[id].done = body.done;
				data[id].text = body.text;
				res.send('Success: data updated');
				return;
			}
		}
		res.status(400).send('Error: Nothing to update');
	}
	res.status(400).send('Error: ID not found');
});

app.delete('/api/todos/:id', function (req, res) {
	const id = req.params.id;
	if (id in data) {
		delete data[id];
		res.send('data deleted');
		return;
	}
	res.status(400).send('Error: ID not found');
});

app.listen(3000, () => {
	console.log('Success: Server Running');
});
