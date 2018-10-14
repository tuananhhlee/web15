// const maxLength = 200;
// const questionContentElem = document.getElementById('questionContent');
// const remainCharElem = document.getElementById('remain');

// document.getElementById('questionContent').addEventListener(
//     'input',
//     function(){
//     var remainChar = maxLength - questionContentElem.value.length;
//     remainCharElem.innerText=remainChar;
// })

// axios.get("http://localhost:3000/randomquestion")
// .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })



function getRandomQuestion(){
    $.ajax({
        url: "http://localhost:3000/randomquestion",
        type: "GET",
        success: function(response){
            if(response){
                $("#questionContent").text(response.questionContent);
                $("#answer_btn").data("questionid",response.id);
            }
        },
        error: function(response){
            console.log(err);
        }
    });
}

getRandomQuestion();

$("#otherQuestion").on("click",function(){
    getRandomQuestion();
})

$("#answer_btn").on("click", function(){
    console.log($(this).data())
	$.ajax({
		url: "http://localhost:3000/answer",
		type: "POST",
		data: $(this).data(),
		success: function(response) {
			if(response.success) {
				window.location.href = "/";
			}
		},
		error: function(err) {
			console.log(err);
			window.location.href = "https://google.com/search?q=site:stackoverflow.com why my code didn't run";
		}
	})
})