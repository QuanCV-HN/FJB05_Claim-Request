function getAllStaff() {
    $.ajax({
        url: "/api/staff/list",
        type: "GET",
        dataType: "json",
        success: function (staffList) {
            let staffTable = $("#staff-table");
            staffTable.empty();
            staffList.forEach(staff => {
                staffTable.append(
                    `
                        <tr>
                            <td>${staff.name}</td>
                            <td>${staff.department}</td>
                            <td>${staff.rank}</td>
                            <td>${staff.salary}</td>
                            <td>
                                <a class="edit"  data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a class="delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>
                    `
                );
            });
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}


getAllStaff();
