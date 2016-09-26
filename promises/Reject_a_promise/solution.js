var promise = new Promise(function(resolve,reject){
  setTimeout(function(){
    var error = new Error('REJECTED!');
    reject(error);
  },300);
});

promise.then(
  function onFulfilled(msg){
  console.log(msg);
  },
  function onRejected(err){
    console.log(err.message);
  });
