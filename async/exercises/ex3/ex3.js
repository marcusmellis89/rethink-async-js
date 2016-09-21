function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	return new Promise(
		function(resolve, reject){
			//do some stuff
			fakeAjax(file, resolve)

			//if successful, call resolve()
			//otherwise, call reject(error)
		}
	);
}

// request all files at once in "parallel"
// ???

getFile('file1')
	.then((reply1) => {
		output(reply1);
		return getFile('file2');
	})
	.then((reply2) => {
		output(reply2);
		return getFile('file3');
	})
	.then((reply3) => {
		output(reply3)
	});

//above solution was incorrect because ajax calls were not made
//in parallel

//2nd attempt
let r1 = getFile('file1');
let r2 = getFile('file2');
let r3 = getFile('file3');

r1
	.then((reply1) => {
		output(reply1);
		return r2;
	})
	.then((reply2) => {
		output(reply2);
		return r3;
	})
	.then((reply3) => {
		output(reply3)
	});

//The above is a valid solution but it is not as promise chain oriented
//I'm going to refactor below so the steps are explicitly separate

let r1 = getFile('file1');
let r2 = getFile('file2');
let r3 = getFile('file3');

r1
.then(output)
.then(() => {
	return r2;
})
.then(output)
.then(() => {
	return r3;
})
.then(output)
.then(() => {
	output('completed');
});
