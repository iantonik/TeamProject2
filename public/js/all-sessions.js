$(function () {
    console.log("this is running");
    $(".session").on("click", function() {
        console.log("clicked");
        var id = $(this).data("id");
        console.log(id);
        location.href = `/sessions/${id}`;
    });
});