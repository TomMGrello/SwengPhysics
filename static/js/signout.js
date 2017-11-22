$(function() {
  $('#signout').click(function() {
    $.getJSON('/signout',{},
      function(data){
        window.location = "/";
      });
    return false;
  });
});
