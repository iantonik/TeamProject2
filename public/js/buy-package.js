$(document).ready(function () {

    $(".buy-package").click(async (e) => {
        if ($('#selPkg > option').length) return [];
        var data = await getPackageList();
        var $dropdown = $('#selPkg');
        $.each(data, function () {
            if (!this.inactive) {
                $dropdown.append($("<option />").val(`${this.id}`).text(`${this.workout_type}, Session count: ${this.session_count}, Price: $${this.price}`));
            }
        });

        var clientID = e.target.getAttribute('name');
        $("#purchasing-clientID").attr("value", clientID);
    });


    var getPackageList = async () => {
        return new Promise((resolve, reject) => {
            $.get('/api/package/all', function (data) {
                resolve(data);
            }).fail((err) => {
                reject(err);
            });
        });

    }

    $("#btn-purchase-package").click(async () => {
        var clientID = $("#purchasing-clientID").val();
        var pkgId = $('#selPkg').val();
        var data = await getPackageInfo(pkgId);

        var newPurchase ={
            "workout_type": data[0].workout_type,
            "session_count": data[0].session_count,
            "price": data[0].price,
            "ClientId": clientID
        }
        purchasePackage(newPurchase);

    });

    var getPackageInfo = async (pkgId) => {
        return new Promise((resolve, reject) => {
            var id = pkgId;
            $.get(`/api/package/${id}`,function(data){
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    var purchasePackage = function (pkg) {
        $.post("/api/purchase/new", pkg).then(location.reload());

    }

});