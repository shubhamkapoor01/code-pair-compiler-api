const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compiler = require('compilex');

const app = express();
app.use(bodyParser());

const option = {stats: true};
compiler.init(option);

app.get('/', (req, res) => {
	return res.json({message: 'Please Mention a Language'});
});

app.post('/run', (req, res) => {
	const usesInput = req.body.usesInput;
	const language = req.body.language;
	const input = req.body.input;
	const code = req.body.code;

	if (language === 'C' || language === 'C++') {
		if (usesInput) {
			const envData = { OS: "linux", cmd: "g++", options: {timeout: 1000} };
			compiler.compileCPPWithInput(envData, code, input, (data) => {
				res.send(data);
			});
		} else {
			const envData = { OS: "linux", cmd: "g++", options: {timeout: 1000} };
			compiler.compileCPPWithInput(envData, code, (data) => {
				res.send(data);
			});
		}

	} else if (language === 'Python') {
		if (usesInput) {
			var envData = { OS: "linux" };
			compiler.compilePythonWithInput(envData, code, input, (data) => {
				res.send(data);
			});
		} else {
			var envData = { OS: "linux" };
			compiler.compilePythonWithInput(envData, code, (data) => {
				res.send(data);
			});
		}
	}
});

app.get('/fullStat', (req, res) => {
	compiler.fullStat((data) => {
		res.send(data);
	});
});;

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

compiler.flush(() => {
	console.log("Temporary files flushed!");
});