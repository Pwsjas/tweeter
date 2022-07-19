$(document).ready(function() {
  const textArea = document.querySelector('#tweet-text');
  //Update character counter on input (.counter)
  //Change counter colour to red when displaying a negative number
  $( textArea ).on('input', function() {
    const counter = $(this).next().find('.counter')
    $(counter).html(140 - $(this).val().length);
    if ($(this).next().find('.counter').val() < 0) {
      $(counter).css('color','red');
    } else {
      $(counter).css('color','#545149');
    }
  });
});