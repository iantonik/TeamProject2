$(document).ready(function () {

    $(".add-session").click(async (e) => {
        var dataClient = await getClientList();
        var $dropdownClient = $('#skdClient');
        $.each(dataClient, function () {
            if (!this.inactive) {
                $dropdownClient.append($("<option />").val(`${this.id}`).text(`${this.first_name} ${this.last_name}`));
            }
        });
        if (dataClient.length) {
            await populateAvailPkg(dataClient[0].id);
        }
    });

    $(`#skdClient`).change(async () => {
        var clientId = $(`#skdClient`).val();
        await populateAvailPkg(clientId);
    });

    var populateAvailPkg = async (clientID) => {
        var dataAvailPkg = await getAvailPkg(clientID);
        var $dropdownAvailPkg = $('#avail-pkg');
        $.each(dataAvailPkg, function () {
            $dropdownAvailPkg.append($("<option/>").val(`${this.id}`).text(`${this.workout_type}, ${this.session_count}`));
        })
    }


    var getClientList = async () => {
        return new Promise((resolve, reject) => {
            $.get('/api/clients', function (data) {
                resolve(data);
            }).fail((err) => {
                reject(err);
            });
        });

    }

    var getAvailPkg = async (clientId) => {
        return new Promise((resolve, reject) => {
            $.get(`/api/purchase/${clientId}`, function (data) {
                resolve(data);
            }).fail((err) => {
                reject(err);
            });
        });

    }


    $("#btn-skd-session").click(async () => {
        var clientId = $(`#skdClient`).val();
        var pkgId = $('#avail-pkg').val();
        var sessionTime = $('#session-time').val();

        var newSession ={
            "schedule_date": sessionTime,
            "ClientId": clientId,
            "PurchaseId": pkgId,
        }

        scheduleSession(newSession)

    });

    var scheduleSession = function (newSession) {
        $.post("/api/sessions/new", newSession).then(location.reload());

    }

});