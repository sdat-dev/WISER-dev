// set initial size
$(document).ready(function() {
    SetIframeSize();
  });
  
  // resize on window resize
  $(window).on('resize', function() {
    SetIframeSize();
  });
  
  function SetIframeSize() {
    if($("#external").width($(window).width()) <= 600 ){
        $("#external").width($(window).width() - 50);
    }
    else{
        $("#external").width($(window).width() * 0.85);
    }
    //$("#external").height($(window).height() - 200);
}