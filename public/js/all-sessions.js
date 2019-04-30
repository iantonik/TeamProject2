$(function () {
    $(".edit-session").on("click", function() {
        // create & track all buttons
        var editButton = $(this);
        var sessionID = $(this).data("id");
        var inputID = sessionID + "-input";
        var saveID = sessionID + "-save";
        var calSelect = $(`<input id=${inputID} class=\"cal-select\">`);
        $(this).parent().append(calSelect);
        var saveButton = $(`<button id=${saveID} class=\"save-button\">Save</button>`);
        $(this).parent().append(saveButton);
        $(this).hide();


        // use flatpickr library to select date
        $(`#${inputID}`).flatpickr({
            enableTime: true,
            onChange: function(dateStr) {
                $(`#${inputID}`).val(dateStr)
            }
        });


        // manage butt/input display. Put new scheduled time and reload page
        $(saveButton).on("click", function() {
            $(editButton).show();
            $(saveButton).hide();
            $(calSelect).hide();
            var scheduledTime = $(calSelect).val();
            $.ajax({
                type: "PUT",
                url: `/api/sessions`,
                data: {
                    id: sessionID,
                    schedule_date: scheduledTime
                }
            }).then(function(data) {
                location.reload();
            });
        })
    });
});