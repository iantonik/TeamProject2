$(function () {
    $(".edit-session").on("click", function() {
        var editButton = $(this);
        var sessionID = $(this).data("id");
        var inputID = sessionID + "-input";
        var saveID = sessionID + "-save";
        var calSelect = $(this).parent().append(`<input id=${inputID} class=\"cal-select\">`);
        var saveButton = $(this).parent().append(`<button id=${saveID} class=\"cal-select\">Save</button>`);
        $(this).hide();

        $(calSelect).flatpickr({
            enableTime: true,
            onChange: function(dateStr) {
                console.log(calSelect);
                $(`#${inputID}`).val(dateStr),
                $(`#${inputID}`).hide()
            }
        });

        $(saveButton).on("click", function() {
            console.log(saveButton);
            console.log(calSelect);
            // $(editButton).show();
            console.log("saved");
        })
    });
});