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

// function getFile(file) {
//
// }

// request all files at once in "parallel"
// ???

//make the thunk
var makeThunk = function(fn){
	var args = [].slice.call(arguments,1);

	return function(cb){
		args.push(cb);
		fn.apply(null,args);
	};
};

//creating async thunks for each ajax call
var getFileOne = makeThunk(fakeAjax, 'file1');
var getFileTwo = makeThunk(fakeAjax, 'file2');
var getFileThree = makeThunk(fakeAjax, 'file3');


//requesting all files in order
var request = function(){

	getFileOne(function(response){
		output(response);
		getFileTwo(function(data){
			output(data);
			getFileThree(function(reply){
				output(reply);
			});
		});
	});

}

request();
