let requestStream = Rx.Observable.just("http://www.api.github.com/users");


//creates a metastream
let responseStream = requestStream
  //using flatMap inorder to flatten metastream
  .flatMap((requestURL) => Rx.Observable.fromPromis(fetch(requestURL)););

responseStream.subscribe( (response) => {
  console.log(response);
})


//creates a mapped response stream that emits one random user
let createSuggestionStream = (stream) => {
   return stream.map(userList =>
    userList[Math.floor(Math.random()*userList.length)]
  );
};

let suggestion1Stream = createSuggestionStream(responseStream);
let suggestion2Stream = createSuggestionStream(responseStream);
let suggestion3Stream = createSuggestionStream(responseStream);

//render 'emitted' user to the DOM
const renderSuggestion = (userdata, selector) => {
  const element = document.getElementById(selector);
  const usernameEl = element.querySelector('.username');

  usernameEl.href = userdata.html_url;
  usernameEl.textContent = userdata.login;

  const imageEl = element.querySelector('img');
  imageEl.src = userdata.avatar_url;

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
