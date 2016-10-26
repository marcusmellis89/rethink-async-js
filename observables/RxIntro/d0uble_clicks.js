const button = document.querySelector('.button');
const label = document.querySelector('h4');

let clickStream = Rx.Observable.fromEvent(button, 'click');

let doubleClickStream = clickStream
  //wait until 250ms of silence the return array of clicks
  .buffer(() => clickStream.throttle(250))
  .map(arr => arr.length)
  //filter the double clicks
  .filter(num => num === 2);

//outputs every time there is a double click
doubleClickStream.subcribe((evt) => {
  label.textContent = 'doubleClick';
})

//clears label every 1 second
doubleClickStream
  .throttle(1000)
  .subscribe(evt => {
    label.textContent = '-';
  });
