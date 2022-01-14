$( document ).ready(function() {
    SetIframeSize();
});

// resize on window resize
$(window).on('resize', function(){
      SetIframeSize();
});

function SetIframeSize(){
    $("#external").width($(window).width() - 200);
    $("#external").height($(window).height() - 200);
}