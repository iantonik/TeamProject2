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

    $(".inactive").click(function () {
        var package = {
            inactive: false
        }
        updatePackage($(this).attr("name"), package)
    });

    $(".active").click(function () {
        var package = {
            inactive: true
        }
        updatePackage($(this).attr("name"), package)
    });

    function updatePackage(id, pkg) {
        $.ajax({
            method: "PUT",
            url: `/api/package/${id}`,
            data: pkg
        }).then(location.reload());
    }

    $(".delete-pkg").click(function(){
        var id = $(this).attr("name");
        deletePkg(id);

    });

    var deletePkg = function(id){
        $.ajax({
            method: "DELETE",
            url: `/api/package/${id}`
        }).then(location.reload())
    }

    $(".edit-pkg").click(function(){
        var id=$(this).attr("name");
        $(`.view-mode-${id}`).hide();
        $(`.edit-mode-${id}`).show();
    });

    $(".cancel-edit-pkg").click(function(){
        location.reload();
    });

    $(".save-pkg").click(function(){
        var id=$(this).attr("name");
        var pkgName = $(`#name-edit-${id}`).val(); 
        var pkgCount = $(`#count-edit-${id}`).val();
        var pkgPrice = $(`#price-edit-${id}`).val();

        var postObj = {
            name: pkgName,
            price: pkgPrice,
            count: pkgCount
        }
        updatePackage(id, postObj);
    });




});
