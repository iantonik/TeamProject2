$(document).ready(function () {

    $(".buy-package").click(async (e) => {
        var data = await getPackageList();
        var $dropdown = $('#selPkg');
        $.each(data, function () {
            if (!this.inactive) {
                $dropdown.append($("<option />").val(this.id).text(`${this.workout_type}, Session count: ${this.session_count}, Price: $${this.price}`));
            }
        });

        var clientID = e.target.getAttribute('name');
        $("#purchasing-clientID").attr("value", clientID);
    })


    var getPackageList = async () => {
        return new Promise((resolve, reject) => {
            $.get('/api/package/all', function (data) {
                resolve(data);
            }).fail((err) => {
                reject(err);
            });
        });

    }

    $("#btn-purchase-package").click(function () {
        var clientID =  $("#purchasing-clientID").val();
        var pkgId = $('#selPkg').val();
        console.log("client ID is", clientID);
        console.log("pkg ID is", pkgId);
        updateClient(clientID, pkgId);
    });


    var updateClient = function (id, pkgId) {
        $.ajax({
            method: "PUT",
            url: `/api/clients/${id}`,
            data: {packageId: pkgId}
        }).then(location.reload());
    }

});
