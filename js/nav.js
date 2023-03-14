$(function() {
  $("#nav-placeholder").load("/html/nav.html", function() {
    $(".nav-bar-link").each(function() { 
       if($(this).text() == $('title').text()){
        $(this).addClass("active-nav");
       }
      });
  });
});