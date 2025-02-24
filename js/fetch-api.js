;(function () {
  //
  // More recently, browsers have adopted the Fetch API in order to make AJAX easier
  // to work with without requiring an external library like jQuery.
  //
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  //
  // The Fetch API uses Promises, so we will be learning something new in addition
  // to this new AJAX technique. Promises can be a complex topic, so we will try
  // and keep to the basics for these exercises.
  //
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
  // https://developers.google.com/web/fundamentals/primers/promises
  //
  // From MDN:
  // The Promise object represents the eventual completion (or failure) of an asynchronous
  // operation, and its resulting value.
  //
  // This is a good fit for AJAX since you never really know when an AJAX request will "finish".
  // It may take just a few milliseconds and return as you expect.
  // It may take minutes and return something you were not expecting (ie: bad data).
  // It may never return (fail) because someone unplugged your Internet connection.
  //
  // Promises help to deal with the uncertainty inherent in making HTTP requests
  // over a network.
  //
  // Let's see our jumbotron example using the Fetch API:
  //

  const btnEl = document.getElementById('loadBtn3')
  btnEl.addEventListener('click', clickBtn)

  function clickBtn () {
    // The result of .fetch() is a Promise object, which has a .then() method.
    // The argument to .then() is a function that will be called once the Promise resolves.
    // In this case, the promise resolves once the AJAX request completes.
    // Promise objects can be "chained" together like below.
    console.info('Sending the AJAX request now using fetch()!')
    fetch('jumbotron.html') // <-- fetch() returns a Promise object
      .then(extractText)
      .then(setJumbotron)
  }

  // The response object that is passed into this function is the result of the AJAX call above.
  // That object has a method called .text() that returns *another* promise object, which allows it
  // to be "chained" as above.
  function extractText (response) {
    console.log('The AJAX request finished. I am the callback from the first Promise object.')
    return response.text() // <-- returns a new Promise object
  }

  // The responseTxt passed into this function is the result of the second Promise resolving (extractText).
  // Finally we have the raw response text from our AJAX request.
  // Like before, we put it into the DOM via innerHTML and hide the button.
  function setJumbotron (responseTxt) {
    console.log('response.text() has resolved. I am the callback from the second Promise object.')
    const containerEl = document.getElementById('jumbotronContainer3')
    containerEl.innerHTML = responseTxt

    btnEl.remove()
  }

  //
  // We can see that using fetch() is simpler than XMLHttpRequest, but Promises can be tricky initially.
  // I strongly recommend naming your promise callback functions instead of using anonymous functions;
  // it greatly helps with readability and understanding code "flow".
  //
  // Now let's put the fetch() API to work on something more interesting: cat pictures!
  //
  // 1) Sign up for an API key for TheCatAPI: https://thecatapi.com/
  //    They will send you an email with your API key.
  //
  // 2) Browse the API and see what kinds of calls you can make:
  //    https://documenter.getpostman.com/view/5578104/RWgqUxxh
  //
  //    Note that the 'x-api-key' http header is required for most calls to work correctly.
  //
  // 3) Using the Fetch API, repeat the exercise from the jQuery page where you click on
  //    "Generate Cat" and a random cat image appears inside <div id="catContainer">
  //
  //    This URL will return a single, random cat:
  //    https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg&format=json&has_breeds=1&order=RANDOM&page=0&limit=1
  //
  //    Note that you will need to add your API key to the HTTP headers in order for that URL to return results.
  //    You may need to read some documentation on how to send custom headers with fetch():
  //    https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api#custom_headers
  //    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Headers
  //
  //    Don't forget to disable the button while the AJAX request is active, and re-enable
  //    it once done.
  //

  // TODO: your code goes here :)
  
  var catHeaders = new Headers({
    'x-api-key': '6a665bbc-959d-422f-abdf-919890680373',
    'Content-Type': 'application/json'
  });

  const generateCatBtnEl = document.getElementById('generateCatBtn')
  generateCatBtnEl.addEventListener('click', clickCatBtn)

  function clickCatBtn(){
    console.info('Fetching cat picture')
    generateCatBtnEl.innerHTML = "Generating cat..."
    $("#generateCatBtn").prop("disabled", true)
    fetch('https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg&format=json&has_breeds=1&order=RANDOM&page=0&limit=1', {
      headers: catHeaders
    })
      .then(catResponseTxt)
      .then(setCatPic)
      .then(reenableCatBtn)
  }

  function catResponseTxt(response) {
    console.log('AJAX request finished, this is the callback from the first promise object')
    return response.json()
  }

  function setCatPic(ajaxResponse) {
    console.log('ajax response:')
    console.log(ajaxResponse)
    console.log('~~~~~~~~~~~')
    const catContainerEl = document.getElementById('catContainer')
    console.dir(ajaxResponse[0].url)
    let catURL = ajaxResponse[0].url
    catContainerEl.innerHTML = `<img width="500" src="${catURL}">`
  }

  function reenableCatBtn() {
    generateCatBtnEl.innerHTML = "Generate cat"
    $("#generateCatBtn").prop("disabled", false)
    console.log("cat generation complete!")
  }

  //
  // What else can you build with your new AJAX knowledge?
  //
  // How about a cats vs dogs contest where the user clicks a button to load a random dog and random cat.
  // Then they have to vote for which one they like. Keep track of the votes.
  //
  // How about a picture gallery of cats and dogs with search functionality?
  //
  // Wikipedia has an extensive API: https://en.wikipedia.org/api/rest_v1/
  // What could you build on top of that using AJAX?
  //
  // Build something fun below using your favorite AJAX techniques.
  //

  // TODO: your code goes here :)

  const catVsDogBtnEl = document.getElementById('catVsDogBtn')
  catVsDogBtnEl.addEventListener('click', clickVsBtn)

  const dogVsContainerEl = document.getElementById('dogVsContainer')
  const catVsContainerEl = document.getElementById('catVsContainer')
  const dogScoreEl = document.getElementById('dogScore')
  const catScoreEl = document.getElementById('catScore')

  var dogVotes = 0
  var catVotes = 0

  function clickVsBtn () {
    console.log('clicked vs button, beginning fetch process...')
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    catVsDogBtnEl.innerHTML = "Generating images..."
    $("#catVsDogBtn").prop("disabled", true)

    let fetchDogPromise = fetchDog()
    let fetchCatPromise = fetchCat()

    Promise.all([fetchDogPromise, fetchCatPromise]).then(function(values) {
      console.log(".then final promise array:")
      console.log(values)
      dogVsContainerEl.innerHTML = values[0]
      catVsContainerEl.innerHTML = values[1]
      const dogImageEl = document.getElementById('dogImage')
      const catImageEl = document.getElementById('catImage')
      dogImageEl.addEventListener('click', voteDog)
      catImageEl.addEventListener('click', voteCat)
      catVsDogBtnEl.innerHTML = "Generate new images"
      $("#catVsDogBtn").prop("disabled", false)
    })}

    function voteDog() {
      dogVotes++
      dogScoreEl.innerHTML = dogVotes.toString()
      catVsContainerEl.innerHTML = ""
      setTimeout(function() {
        dogVsContainerEl.innerHTML = ""
      }, 2000)
    }

    function voteCat() {
      catVotes++
      catScoreEl.innerHTML = catVotes.toString()
      dogVsContainerEl.innerHTML = ""
      setTimeout(function() {
        catVsContainerEl.innerHTML = ""
      }, 2000)
    }

  function fetchDog () {
    return fetch('https://dog.ceo/api/breeds/image/random')
      .then(dogFetchResponse)
      .then(dogFetchGetImageURL)
      .then(buildDogImageHTML)
  }

  function dogFetchResponse (response) {
    console.log('dog fetch request finished, this is the callback from the first promise object')
    console.log(response)
    return response.json()
  }

  function dogFetchGetImageURL (ajaxResponse) {
    console.log('second dog promise object starting')
    let dogImageURL = ajaxResponse.message
    console.log("dog image url: " + dogImageURL)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    return dogImageURL
  }

  function buildDogImageHTML (dogImageURL) {
    let dogImageHTML = `
    <img class="dogImage" id="dogImage" src="${dogImageURL}" alt="Dog image">
    `
    return dogImageHTML;
  }

  function fetchCat() {
    return fetch('https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg&format=json&has_breeds=1&order=RANDOM&page=0&limit=1', {
      headers: catHeaders
    })
      .then(catFetchResponse)
      .then(catFetchGetImageURL)
      .then(buildCatImageHTML)
  }

  function catFetchResponse (response) {
    console.log('cat fetch request finished, this is the callback from the first promise object')
    console.log('response')
    return response.json()
  }

  function catFetchGetImageURL (ajaxResponse) {
    console.log('second cat promise object starting')
    let catImageURL = ajaxResponse[0].url
    console.log(catImageURL)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    return catImageURL
  }

  function buildCatImageHTML (catImageURL) {
    let catImageHTML = `
    <img class="catImage" id="catImage" src="${catImageURL}" alt="Cat image">    
    `
    return catImageHTML
  }

  //
  // Be sure to check out the axios project for another example of a Promise-based
  // AJAX library: https://github.com/axios/axios
  //
  // Congratulations! You are now an AJAX master.
  //
})()


