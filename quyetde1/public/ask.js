const maxLength = 200;

$("#questionContent").on("input",function(){
    var remainChar = maxLength - $("#questionContent").val().length;
    $("$remain").text(remainChar);
})