$(document).ready(function(){

    $(".buy-package").click(async () => {
        var data = await getPackageList();
        var $dropdown = $('#selPkg');
        $.each(data, function() {
            if (!this.inactive)
            {
                $dropdown.append($("<option />").val(this.id).text(`${this.workout_type}, Session count: ${this.session_count}, Price: $${this.price}`));
            }
        });
        console.log(data);
    })


    var getPackageList = async () => {
        return new Promise((resolve, reject) => {
            $.get('/api/package/all', function(data){
                resolve(data);
            }).fail((err) => {
                reject(err);
            });
        });

    }

});
