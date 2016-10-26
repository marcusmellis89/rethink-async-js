let requestStream = Rx.Observable.just("http://www.api.github.com/users");


//creates a metastream
let responseStream = requestStream
  //using flatMap inorder to flatten metastream
  .flatMap((requestURL) => Rx.Observable.fromPromis(fetch(requestURL)););

responseStream.subscribe( (response) => {
  console.log(response);
})
