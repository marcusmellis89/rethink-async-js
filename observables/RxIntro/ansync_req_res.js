let refreshButton = document.querySelector(".refresh");
let closeButton1 = document.querySelector(".close1");
let closeButton2 = document.querySelector(".close2");
let closeButton3 = document.querySelector(".close3");



let refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

let close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click');
let close2Clicks = Rx.Observable.fromEvent(closeButton2, 'click');
let close3Clicks = Rx.Observable.fromEvent(closeButton3, 'click');



let startUpRequestStream = Rx.Observable.just("http://api.github.com/users");

let requestOnRefreshStream = refreshClickStream
  .map(evt => {
  const randomOffset = Math.floor(Math.random()*500);
  return "http://api.github.com/users?offset=" + randomOffset;
})


//creates a metastream
let responseStream =
  requestOnRefreshStream
  //merging with stream that does initial request
  .merge(startUpRequestStream)
  //using flatMap inorder to flatten metastream
  .flatMap((requestURL) => Rx.Observable.fromPromise(fetch(requestURL));)
  .shareReplay(1);

responseStream.subscribe( (response) => {
  console.log(response);
})


const getRandomUser = (list) => {
  list[Math.floor(Math.random()*list.length)]
};

//creates a mapped response stream that emits one random user
let createSuggestionStream = (stream, closeStream) => {

  return stream
   .map(getRandomUser)
   .startWith(null)
   .merge(refreshClickStream.map(evt => null))
   .merge(closeStream.withLatestFrom(stream, (closeEvt,userList) => getRandomUser(userList)));
};

let suggestion1Stream = createSuggestionStream(responseStream, close1Clicks);
let suggestion2Stream = createSuggestionStream(responseStream, close2Clicks);
let suggestion3Stream = createSuggestionStream(responseStream, close3Clicks);

//render 'emitted' user to the DOM
const renderSuggestion = (userdata, selector) => {
  if (userdata === null) {
    selector.style.visibility = 'hidden';
  } else {
    selector.style.visibility = 'visible';
    const element = document.getElementById(selector);
    const usernameEl = element.querySelector('.username');

    usernameEl.href = userdata.html_url;
    usernameEl.textContent = userdata.login;

    const imageEl = element.querySelector('img');
    imageEl.src = userdata.avatar_url;
  }

}

suggestion1Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion1');
});

suggestion2Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion2');
})

suggestion3Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion2');
})
