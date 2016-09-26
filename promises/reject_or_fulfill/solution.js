var promise = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve('I FIRED');
    reject(new Error('I DID NOT FIRE'));
  },300);
});

promise.then(
  function onFulfilled(msg){
  console.log(msg);
},
  function onRejected(err){
    console.log(err.message);
  });

//official solution

var promise = new Promise(function (fulfill, reject) {
      fulfill('I FIRED');
      reject(new Error('I DID NOT FIRE'));
    });

    function onReject(error) {
      console.log(error.message);
    }

    promise.then(console.log, onReject);
