
var $frame = $('#frame');
var $input = $('#input');

function youtubeVideoUrl(str) {
  // accepts c/p urls: https://www.youtube.com/watch?v=*
  // accepts embeds: https://www.youtube.com/embed/*
  // accepts shortened: https://youtu.be/*
  var id = str.split('/').pop().split('=').pop();
  if(!id) return null;
  return "https://www.youtube.com/embed/"+id;
}

function fitFrame() {
  $frame.attr('width', $(window).innerWidth());
  $frame.attr('height', $(window).innerHeight());
}

function loadFrame(url) {
  $frame.attr('src', url);
}

$input.on('submit', function(e) {
  e.preventDefault();

  var $link = $('.link', $input);
  var url = youtubeVideoUrl($link.val());

  if(!url) {
    var $warn = $('.warn', $input);
    $warn.text('Not a valid Youtube video URL');
  } else {
    $frame.removeClass('hidden');
    $(window).on('resize', fitFrame);
    fitFrame();
    loadFrame(url);
  }
});

if(window.location.hash) {
  var id = window.location.hash.slice(1);
  $frame.removeClass('hidden');
  $(window).on('resize', fitFrame);
  fitFrame();
  loadFrame("https://www.youtube.com/embed/"+id);
}


