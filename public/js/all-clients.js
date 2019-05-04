$(document).ready(function () {

    $("#new-Client").click(function () {
        var newClient = {
            "first_name": $("#firstName").val().trim(),
            "last_name": $("#lastName").val().trim(),
            "email": $("#Client-email").val().trim(),
            "address": $("#client-address").val().trim(),
            "phone_number": $("#phoneNumber").val().trim(),
            "gender": $("#client-gender").val().trim(),
            "age": $("#client-age").val().trim(),
            "weight": $("#client-weight").val().trim()
        }

        $.post("/api/clients/new", newClient);
        location.reload();
    });
    
    $(function () {
        console.log("Client View displayed");
        $(".client").on("click", function() {
            console.log("clicked");
            var id = $(this).data("id");
            console.log(id);
            location.href = `/clients/${id}`;
        });
    });


    $(".delete-client").click(function(){
        var id = $(this).attr("name");
        deleteClient(id);
    })

    var deleteClient = function(id){
        $.ajax({
            method: "DELETE",
            url: `/api/clients/${id}`
        }).then(() => {
            location.reload();
        });
    }

    function updateClient(id, updates) {
        $.ajax({
            method: "PUT",
            url: `/api/clients/${id}`,
            data: updates
        }).then(location.reload());
        console.log("AJAX: PUT > Client Updated")
    }

    //omar: toggle display of text-input fields in target display row to allow edits
    $(".edit-client").click(function(){
        console.log("Edit Client Mode: toggle")
        var id=$(this).attr("name");
        $(`.view-mode-${id}`).hide();
        $(`.edit-mode-${id}`).show();
    })

    $(".cancel-edit-client").click(function(){
        console.log("Edit Client: Cancelled Edit")
        location.reload();
    })


    $(".save-client").click(function(){
        console.log("Client View > Save Client");
        var id=$(this).attr("name");
        var fname = $(`#fname-edit-${id}`).val(); 
        var lname = $(`#lname-edit-${id}`).val();
        var email = $(`#email-edit-${id}`).val();
        var address = $(`#address-edit-${id}`).val();
        var phone = $(`#phone-edit-${id}`).val();
        var gender = $(`#gender-edit-${id}`).val();
        var age = $(`#age-edit-${id}`).val();
        var weight = $(`#weight-edit-${id}`).val();

        var clientUpdate = {
            first_name: fname,
            last_name: lname,
            email: email,
            address: address,
            phone_number: phone,
            gender: gender,
            age: age,
            weight: weight
        }
        updateClient(id, clientUpdate);

    })

    var addClient = function(id){
        $.ajax({
            method: "GET",
            url: `/api/client/${id}`
        }).then(location.reload())
    }

});