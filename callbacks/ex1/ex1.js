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
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		handleResponse(file,text);
	});
}


const handleResponse = (filename, contents) => {

	if(!(filename in responses)){
		responses[filename] = contents;
	}

	let arr = ["file1","file2","file3"];

	for(let i =0; i < arr.length; i++){
		if(arr[i] in responses){
			if(typeof responses[arr[i]] == 'string'){
				output(responses[arr[i]]);
				responses[arr[i]] = false;
			}
		}else{
			return;
		}
	}

	output('complete');

}

let responses = {};
// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
