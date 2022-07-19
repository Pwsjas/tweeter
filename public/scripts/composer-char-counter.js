$(document).ready(function() {
  const textArea = document.getElementById('tweet-text');

  //Update character counter on input (.counter)
  $( textArea ).on('input', function() {
    const counter = $(this).next().find('.counter')
    $(counter).html(140 - $(this).val().length);
    if ($(this).next().find('.counter').val() < 0) {
      $(counter).css('color','red');
    } else {
      $(counter).css('color','#545149');
    }
  })
});