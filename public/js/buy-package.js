$(document).ready(function () {

    $(".buy-package").click(async (e) => {
        var data = await getPackageList();
        var $dropdown = $('#selPkg');
        $.each(data, function () {
            if (!this.inactive) {
                $dropdown.append($("<option />").val(`${this.id}, ${this.session_count}`).text(`${this.workout_type}, Session count: ${this.session_count}, Price: $${this.price}`));
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

    $("#btn-purchase-package").click(function () {
        var clientID = $("#purchasing-clientID").val();
        var pkgInfo =$('#selPkg').val();
        pkgInfo = pkgInfo.split(",");
        var pkgId = pkgInfo[0];
        var sessionCount=pkgInfo[1];
        console.log("client ID is", clientID);
        console.log("pkg ID is", pkgId);
        console.log("Session Count: ", + sessionCount);
        
        addSessions(clientID, pkgId, sessionCount)
        updateClient(clientID, pkgId);
    });


    var updateClient = function (id, pkgId) {
        $.ajax({
            method: "PUT",
            url: `/api/clients/${id}`,
            data: { packageId: pkgId }
        }).then(location.reload());
    }

    var addSessions = function(id, pkgId, sessionCount){
        var newSessions=[];
        
        var temp = {
            "ClientId": id,
            "PackageId": pkgId
        }

        for(var i=0; i < sessionCount; i++){
            newSessions.push(temp);
        }

        $.post("/api/sessions/new", {data: newSessions});
    }

});