//Client side JS logic
$(document).ready(function() {

  //Load all tweets from server using an AJAX GET request
  //Call renderTweets to display as HTML
  //Parameter required to display a new tweet (truthy value)
  const loadTweets = function(newTweet) {
    $.ajax('http://localhost:8080/tweets')
      .then(function(tweetsArr) {
        if (newTweet) {
          renderTweets([tweetsArr[tweetsArr.length - 1]]);
        } else {
          renderTweets(tweetsArr);
        }
      });
  };

  //Create appropriate HTML structure for a new tweet using passed Object
  const createTweetElement = function(tweetObj) {
    const $tweet = $(`
    <article class="display-tweet">
      <h2>Tweet</h2>
        <header>
          <div>
            <img src=${tweetObj.user.avatars}>
            <output>${escape(tweetObj.user.name)}</output>
          </div>
          <output id="faded">${escape(tweetObj.user.handle)}</output>
        </header>
        <label>${escape(tweetObj.content.text)}</label>
        <footer>
          <output>${timeago.format(tweetObj.created_at)}</output>
          <output>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </output>
        </footer>
  </article>
    `);
    return $tweet;
  };

  //Convert HTML to a string
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //AJAX POST request for new-tweet form submission
  const $tweetForm = $('.tweet-form');
  $tweetForm.submit((event) => {

    event.preventDefault();
    input = $tweetForm.find('#tweet-text').val();
    if (input.length < 1) {
      displayError('Your tweet has no content!');
    } else if (input.length > 140) {
      displayError('Your Tweet is too long! (must be less than 140 characters)');
    } else {
      displayError();
      const serializedForm = $tweetForm.serialize();

      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: serializedForm,

        success: (response) => {
          loadTweets('new');
          $('#tweet-text').val('');
          $('.counter').val('140');
        }
      });
    }
  });

  //Display or Hide new-tweet error box
  const displayError = function(err) {
    if (err) {
      $('#error-content').text(err);
      $('#error').slideDown('slow');
    } else {
      $('#error').slideUp('slow');
      $('#error-content').text('');
    }
  };

  //Read array of tweet objects and append HTML elements to main page (index.html)
  const renderTweets = function(tweetsArr) {
    for (const tweetObj of tweetsArr) {
      const $tweet = createTweetElement(tweetObj);
      $('.tweets-container').prepend($tweet);
    }
  };

  //Load tweets upon initial document load
  loadTweets();
});
