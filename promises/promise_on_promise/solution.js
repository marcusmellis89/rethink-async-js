first()
.then(function onFulfilled(value){
  return second(value)
})
.then(function onFulfilled(value_two){
  console.log(value_two);
})

//alternatively

var firstPromise = first();

   var secondPromise = firstPromise.then(function (val) {
     return second(val);
   });

   secondPromise.then(console.log);
