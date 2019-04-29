// $(function () {
//     console.log("this is running");
//     $(".client").on("click", function() {
//         console.log("clicked");
//         var id = $(this).data("id");
//         console.log(id);
//         location.href = `/clients/${id}`;
//     });
// });


$(document).ready(function () {

    $("#current-client").click(function () {
        var client = {
            first_name: $("#firstName").val().trim(),
            "last_name": $("#lastName").val().trim(),
            "email": $("#email").val().trim(),
            "address": $("#address").val().trim(),
            "phone_number": $("#phoneNumber").val().trim(),
            "gender": $("#gender").val().trim(),
            "age": $("#age").val().trim(),
            "weight": $("#weight").val().trim()
            
        }

        $.get("/api/clients", client);
        location.reload();

      });  $.post("/api/clients/new", newClient);
        location.reload();
    
    
    function updateClient(client) {
        $.ajax({
          method: "PUT",
          url: "/api/clients/edit/:id",
          data: client
        }).then(location.reload());
      }
    });