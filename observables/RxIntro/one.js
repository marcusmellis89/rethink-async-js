/*
created an observable that ouputs integers
at an interval of 500ms and maps each output
as an index to an array with is then logged to the console
*/

var source = ['jason','billy', 'zack', 'trini', 'kimberly', 'tommy'];

var stream = Rx.Observable

var result = stream
.interval(500)
.take(5)
.map((i) => source[i]);

result.subscribe((evt) => {
  console.log(evt);
})
