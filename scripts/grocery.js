var grocery = {} || grocery;
grocery.drawTable = function () {
    $.ajax({
        url: "http://localhost:3000/Items",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, v) {
                $('#tbGrocery').append(
                    "<tr>" +
                    "<td>" + v.id + "</td>" +
                    "<td>" + v.Items + "</td>" +
                    "<td><img src='" + v.Avatar + "'  width= '50px' height='60px'/></td>" +
                    "<td>" + v.DOM + "</td>" +
                    "<td>" + v.Price + "</td>" +
                    "<td>" + v.Producer + "</td>" +
                    "<td>" +
                    "<a href='javascript:;' title='Edit grocery' onclick='grocery.get(" + v.id + ")' ><i class='fa fa-edit'></i></a>" +
                    "<a href='javascript:;' title='Delete grocery' onclick='grocery.delete(" + v.id + ")' ><i class='fa fa-trash'></i></a>" +
                    "</td>" +
                    "</tr>"
                );
            });
        }
    });
};
grocery.openModal = function () {
    grocery.reset();
    $("#addEditGrocery").modal("show");
};
grocery.save = function () {
    if ($("#formAddEditGrocery").valid()) {
        if ($('#id').val() == 0) {
            var groceryObj = {};
            groceryObj.Items = $('#Items').val();
            groceryObj.Avatar = $('#Avatar').val();
            groceryObj.DOM = $('#DOM').val();
            groceryObj.Price = $('#Price').val();
            groceryObj.Producer = $('#Producer').val();
            $.ajax({
                url: "  http://localhost:3000/Items",
                method: "POST",
                dataType: "Json",
                contentType: "application/json",
                data: JSON.stringify(groceryObj),
                success: function (data) {
                    $("#addEditGrocery").modal("hide");
                    grocery.drawTable();
                }
            });
        }
        else {
            var groceryObj = {};
            groceryObj.Items = $('#Items').val();
            groceryObj.Avatar = $('#Avatar').val();
            groceryObj.DOM = $('#DOM').val();
            groceryObj.Price = $('#Price').val();
            groceryObj.Producer = $('#Producer').val();
            groceryObj.id = $('#id').val();
            $.ajax({
                url: "  http://localhost:3000/Items/" + groceryObj.id,
                method: "Put",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(groceryObj),
                success: function (data) {
                    $("#addEditGrocery").modal("hide");
                    grocery.drawTable();
                }
            });
        }
    };
};

grocery.delete = function (id) {
    bootbox.confirm({
        title: "Delete Grocery",
        message: "Do you want to delete this grocery?.",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "http://localhost:3000/Items/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function (data) {
                        grocery.drawTable();
                    }
                });
            }
        }
    });
};

grocery.get = function (id) {
    $.ajax({
        url: "http://localhost:3000/Items/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#Items').val(data.Items);
            $('#Avatar').val(data.Avatar);
            $('#DOM').val(data.DOM);
            $('#Price').val(data.Price);
            $('#Producer').val(data.Producer);
            $('#id').val(data.id);
            var validator = $("#formAddEditGrocery").validate();
            validator.resetForm();
            $("#addEditGrocery").modal("show");
        }
    });
};

grocery.reset = function () {
    $('#Items').val('');
    $('#Avatar').val('');
    $('#DOM').val('');
    $('#Price').val('');
    $('#Producer').val('');
    $('#id').val('0');
    var validator = $("#formAddEditGrocery").validate();
    validator.resetForm();
};
grocery.init = function () {
    grocery.drawTable();
};
$(document).ready(function () {
    grocery.init();
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#tbGrocery tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
});