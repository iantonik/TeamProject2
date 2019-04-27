$(document).ready(function () {

    $("#new-package").click(function () {
        var newPackage = {
            "workout_type": $("#workout").val().trim(),
            "session_count": $("#sessionCount").val().trim(),
            "price": $("#package-price").val().trim()
        }

       $.post("/api/package/new", newPackage);
       location.reload();
    });

    $(".inactive").click(function(){
        var package = {
            id: $(this).attr("id"),
            inactive: false
        }

        console.log(package)
        updatePackage(package)
        // $.put("/api/package", package);
    });
    
    $(".active").click(function(){
        var package = {
            id: $(this).attr("id"),
            inactive: true
        }

        console.log(package)
        updatePackage(package)
        // $.put("/api/package", package);
    });

    function updatePackage(package) {
        $.ajax({
          method: "PUT",
          url: "/api/package",
          data: package
        }).then(location.reload());
      }

});

