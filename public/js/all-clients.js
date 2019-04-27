$(function () {
    console.log("this is running");
    $(".client").on("click", function() {
        console.log("clicked");
        var id = $(this).data("id");
        console.log(id);
        location.href = `/clients/${id}`;
    });
});