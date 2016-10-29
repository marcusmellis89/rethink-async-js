//observer pattern
const subscribe = (observerPattern) => {
  observer.next(42);
  observer.next(3);
  observer.next(500);
  observer.error(new Error('blah'));
  observer.complete();

  return usubscribe(){
    //TBD
  }
}
//observer object passed into subscribe function
let observer = {
  next(x) => { console.log('next value: ', x); },
  error(err) => {console.log('error ' + err); },
  complete() => { console.log('done'); }
}
//equivalent Rx.Observable.create(subscribe)
foo = new Rx.Observable(subscribe);
let unsubscribe = foo.subscribe(observer)
