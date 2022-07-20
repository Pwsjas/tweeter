/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  // Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  const loadTweets = function(newTweet) {
    $.ajax('http://localhost:8080/tweets')
    .then(function (tweetsArr) {
      if (newTweet){
        renderTweets([tweetsArr[tweetsArr.length - 1]]);
      } else {
        renderTweets(tweetsArr);
      }
    })
  };

  //Create appropriate HTML structure for a new tweet using passed Object 
  const createTweetElement = function(tweetObj) {
    const $tweet = $(`
    <article class="display-tweet">
      <h2>Tweet</h2>
        <header>
          <div>
            <img src=${tweetObj.user.avatars}>
            <output>${tweetObj.user.name}</output>
          </div>
          <output id="faded">${tweetObj.user.handle}</output>
        </header>
        <label>${tweetObj.content.text}</label>
        <footer>
          <output>${timeago.format(tweetObj.created_at)}</output>
          <output>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </output>
        </footer>
  </article>
    `)
  return $tweet;
  };

  //AJAX POST request for new-tweet form submission
  const $tweetForm = $('.tweet-form');
  $tweetForm.submit((event) => {

    event.preventDefault();
    const serializedForm = $tweetForm.serialize();

    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: serializedForm,

      success: (response) => {
        loadTweets('new');
      }
    
    })
  });

  //Read array of tweet objects and append HTML elements to main page (index.html)
  const renderTweets = function (tweetsArr) {
    for (const tweetObj of tweetsArr) {
      const $tweet = createTweetElement(tweetObj);
      $('.tweets-container').append($tweet);
    }
  };
//Testing
  //renderTweets(loadTweets());
  //console.log(loadTweets());
  loadTweets();
});
