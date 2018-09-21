// Add new ToDo
$("input[type='text']").keypress(function(event){
    if(event.which === 13){ //13 = Enter key
        var todoText = $(this).val();
        $(this).val("");
        $("ul").append("<li> <span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    }
});

// Toggle Input on + Click
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});

// Toggle Check/Check Off Specific ToDo 
$("ul").on("click", "li", function(event){
    $(this).toggleClass("completed"); 
    event.stopPropagation();
});

// Remove ToDo on delete click
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(600, function(){
        $(this).remove();
    });
    event.stopPropagation();
});