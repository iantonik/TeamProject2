$(function () {
    $(".edit-session").on("click", function() {
        var editButton = $(this);
        var sessionID = $(this).data("id");
        var inputID = sessionID + "-input";
        var saveID = sessionID + "-save";
        var calSelect = $(`<input id=${inputID} class=\"cal-select\">`);
        $(this).parent().append(calSelect);
        var saveButton = $(`<button id=${saveID} class=\"save-button\">Save</button>`);
        $(this).parent().append(saveButton);
        $(this).hide();

        $(`#${inputID}`).flatpickr({
            enableTime: true,
            onChange: function(dateStr) {
                console.log("clicked");
                $(`#${inputID}`).val(dateStr)
                // $(`#${inputID}`).hide()
            }
        });


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
                console.log(data);
            });
        })
    });
});