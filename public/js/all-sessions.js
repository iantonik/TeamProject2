$(function () {
    $(".edit-session").on("click", function() {
        var session = $(this).data("id");
        var calSelect = $(this).parent().append("<input class=\"cal-select\" type=>");
        $(this).hide();
        $(calSelect).flatpickr({
            enableTime: true,
            // inline: true,
            onChange: function(dateStr) {
                console.log(calSelect);
                calSelect.val(dateStr)
            }
        });
    });

    // $(".cal-select").on("click", function() {
    //     console.log("cal clicked");
    // });
});