let refreshButton = document.querySelector(".refresh");

let refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

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
  .flatMap((requestURL) => Rx.Observable.fromPromise(fetch(requestURL)););

responseStream.subscribe( (response) => {
  console.log(response);
})


//creates a mapped response stream that emits one random user
let createSuggestionStream = (stream) => {
   return stream
   .map(userList =>
    userList[Math.floor(Math.random()*userList.length)]
  )
  .startWith(null)
  .merge(refreshClickStream.map(evt => null));
  ;
};

let suggestion1Stream = createSuggestionStream(responseStream);
let suggestion2Stream = createSuggestionStream(responseStream);
let suggestion3Stream = createSuggestionStream(responseStream);

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
