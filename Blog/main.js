$(document).ready(function() {
  $('.blogMonth').on('click', function() {
    $(this).next().next().slideToggle(600); 
  });
});
