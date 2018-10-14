$.ajax({
    url: 'http://localhost:9000/voteQuest',
    type: "GET",
    success: function (response) {
        if (response) {
            let totalVote = response.yes + response.no;
            $("#totalvote").text(totalVote);
            $("#voteYes").text(response.yes / totalVote * 100);
            $("#voteNo").text(response.no / totalVote * 100);
            $("#questvote").text(response.questionContent);
        }
    },
    error: function (err) {
        console.log(err);
    }
})

$('#otherQuestion').on("click", function () {
    $.ajax({
        url: 'http://localhost:9000/result',
        type: 'GET',
        success: function (response) {
            if (response) {
                window.location.href = "/answer";
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
});
