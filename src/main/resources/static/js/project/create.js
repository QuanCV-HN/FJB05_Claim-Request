function getStaffSelectInput(staffList) {
    let selectElement = "<select class='form-control'>"
    staffList.forEach(staff => {
        let option = `
                <option value="${staff.id}">${staff.name}</option>
            `
        selectElement += option;
    })
    return selectElement + "</select>";
}

function staffTable(staffList) {
    let roleSelect = `
        <select class="form-control select-role">
            <option value="PM">PM</option>
            <option value="QA">QA</option>
            <option value="Dev">Dev</option>
            <option value="Test">Test</option>
            <option value="BA">BA</option>
        </select>`

    $('[data-toggle="tooltip"]').tooltip();
    // Append table with add row form on add new button click
    $(".add-new").click(function () {
        $(this).attr("disabled", "disabled");
        let row = `
            <tr>
                <td class="select-staff">
                    ${getStaffSelectInput(staffList)}
                </td>
        
                <td class="select-role">
                    ${roleSelect}
                </td>
        
                <td class="work-start">
                    <input type="date" class="form-control">
                </td>
                
                <td class="work-end">
                    <input type="date" class="form-control">
                </td>
                
                <td>
                    <div>
                        <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                        <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                        <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                    </div>
                </td>
            </tr>
        `;
        $("tbody").append(row);

        let index = $("table tbody tr:last-child").index();
        $("table tbody tr").eq(index).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });


// Add row on add button click
    $(document).on("click", ".add", function () {
        var empty = false;
        var input = $(this).parents("tr").find('td:not(:last-child) > *');
        input.each(function () {
            if (!$(this).val()) {
                $(this).addClass("error");
                empty = true;
            } else {
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();

        if (!empty) {
            input.each(function () {
                let tdElement = $(this).parent("td");
                if (tdElement.attr('class') === 'select-staff' | tdElement.attr('class') === 'select-role') {
                    let selectedOption = $(this).find(':selected').text();
                    tdElement.html(selectedOption);
                    tdElement.attr('id', $(this).val());
                }
                else {
                    tdElement.html($(this).val());
                }
            });
            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");
        }
    });

// Edit row on edit button click
    $(document).on("click", ".edit", function () {
        let tdList = $(this).parents("tr").find("td:not(:last-child)");
        tdList.each(function () {
            let tdClass = $(this).attr('class');
            let tdId = $(this).attr('id');

            if (tdClass === "select-staff") {
                $(this).html(getStaffSelectInput(staffList));
                $(this).find('select').val(tdId);
            } else if (tdClass === "select-role") {
                $(this).html(roleSelect);
                $(this).find('select').val(tdId);
            } else {
                $(this).html('<input type="date" class="form-control" value="' + $(this).text() + '">');
            }

        });

        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").attr("disabled", "disabled");
    });
// Delete row on delete button click
    $(document).on("click", ".delete", function () {
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
    });
}


function getStaffList() {
    $.ajax({
        url: "/api/staff/list",
        type: "GET",
        dataType: "json",
        success: function (response) {
            staffTable(response);
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });

}

getStaffList();

$(".save-project button").click(function () {
    let staffsData = [];

    let staffRows = $("tbody tr");
    staffRows.each(function () {
        let id = $(this).find(".select-staff").attr('id');
        let role = $(this).find(".select-role").attr('id');
        let start = $(this).find(".work-start").text();
        let end = $(this).find(".work-end").text();


        let staff = {
            staffId: id,
            roleStaff: role,
            startDate: start,
            endDate: end
        }

        staffsData.push(staff);
    });
    let projectData = {
        project: {
            nameProject: $("#project-name").val(),
            projectCode: $("#project-code").val(),
            startDate: $("#project-start").val(),
            endDate: $("#project-end").val()
        },

        staffs: staffsData
    }

    $.ajax({
        url: "http://localhost:8080/api/projects/create",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(projectData),
        success: function (response) {
            alert("Save thành công!");
            window.location.href = "/projects/list";
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi từ server
        }
    });
});



