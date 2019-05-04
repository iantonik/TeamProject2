$(function () {

    $(".edit-session").on("click", function() {
        // create & track all buttons
        var editButton = $(this);
        var sessionID = $(this).data("id");
        var inputID = sessionID + "-input";
        var saveID = sessionID + "-save";
        var calSelect = $(`<input id=${inputID} class=\"cal-select\">`);
        var title = ""
        $(this).parent().append(calSelect);
        // var saveButton = $(`<button id=${saveID} class=\"save-button\">Save</button>`);
        var saveButton = $(`<a href=\"#\" class=\"save-button ml-1\" id=${saveID}><i class=\"far fa-calendar-check\" data-toggle=\"tooltip\" data-html=\"true\" title=\'Save Session\'></i></a>`);

        $(this).parent().append(saveButton);
        $(this).hide();


        // use flatpickr library to select date
        $(`#${inputID}`).flatpickr({
            enableTime: true,
            onChange: function(dateStr) {
                $(`#${inputID}`).val(dateStr)
            }
        });


        // manage button/input display. Put new scheduled time and reload page
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
        });
    });

    $(".mark-session-done").on("click", function() {
        var sessionID = $(this).data("id");
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        $.ajax({
            type: "PUT",
            url: `/api/sessions`,
            data: {
                id: sessionID,
                executed_Date: dateTime
            }
        }).then(function(data) {
            location.reload();
        });;
    });
});