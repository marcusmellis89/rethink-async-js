var promise = new Promise(function(resolve,reject){
    resolve('PROMISE VALUE');
});

promise.then(
  function onFulfilled(msg){
  console.log(msg);
},
  function onRejected(err){
    console.log(err.message);
  }
);

console.log('MAIN PROGRAM');


//alternatively
promise = Promise.resolve('PROMISE VALUE');

promise.then(/*same cb as above*/ );

//another syntax variation

Promise
  .resolve('PROMISE VALUE')
  .then(/*same cb as above*/);
