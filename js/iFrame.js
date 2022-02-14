// set initial size
$(window).on('load', function() {
  SetIframeSize();
  var url = window.location.href;
  const hashtag = url.split("#");
  if(hashtag[1] == "register"){
    document.getElementById('external').src = 'https://newyorkmep.org/wiser-registration/';
  }
});

// resize on window resize
$(window).on('resize', function() {
  SetIframeSize();
});
  
function SetIframeSize() {
  if($(window).width() <= 600 ){
      $("#external").width($(window).width() - 50);
      // console.log("q1");
  }
  else{
      $("#external").width($(window).width() * 0.85);
      // console.log($(window).width());
  }
  $("#external").height($(window).height() - 200);
}