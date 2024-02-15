function getAllProjects() {
    $.ajax({
        url: "/api/projects/list",
        type: "GET",
        dataType: "json",
        success: function (response) {
            let projectTable = $("#project-table");
            projectTable.empty();
            console.log(response);
            response.forEach(content => {
                $.ajax({
                    url: "/api/projects/" + content.id,
                    type: "GET",
                    dataType: "json",
                    success: function (project) {
                        projectTable.append(
                            `
                                <tr id="${content.id}">
                                    <td>${project.nameProject}</td>
                                    <td>${content.totalHours}</td>
                                    <td>${content.remarks}</td>
                                    <td>${content.status}</td>
                                    <td><button class="btn btn-primary" onclick=""><i class="fa fa-pen"></i> Edit</button></td>
                                    <td><button class="btn btn-danger" onclick=""><i class="fa fa-trash-alt"></i> Delete</button></td>
                                </tr>
                                `
                        );
                    },
                    error: function (xhr, status, error) {
                        console.log(status + ": " + error);
                    }
                });

            });
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

getAllProjects();