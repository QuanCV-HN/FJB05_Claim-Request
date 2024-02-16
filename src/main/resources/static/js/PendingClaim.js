jQuery(function ($) {
    $(".sidebar-submenu").hide();

    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
                .parent()
                .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    $("#close-sidebar").click(function() {
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
        $(".page-wrapper").addClass("toggled");
    });
});

const currentPath = window.location.pathname;
const pathElements = currentPath.split('/');
const lastElement = pathElements[pathElements.length - 1];

function GetInfoStaffPending() {
    $.ajax({
        url: "/api/staff/" + lastElement,
        type: "GET",
        dataType: "json",
        success: function (response) {
            let claimTable = $("#claimTable");
            claimTable.empty();
            response.workingDTOS.forEach(content => {
                if (content.roleStaff === "PM") {
                    GetInfoProject(content.project.id, claimTable);
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

GetInfoStaffPending();

function GetInfoProject(projectId, claimTable) {
    $.ajax({
        url: "/api/claims/project/" + projectId,
        type: "GET",
        dataType: "json",
        success: function (response) {
            response.forEach(content => {
                if (content.status === "Pending") {
                    GetNameProject(content.projectId, function(nameProject) {
                        GetEmailStaff(content.staffId, function(email) {
                            let claimRow = `
                                <tr>
                                    <td>${email}</td>
                                    <td>${nameProject}</td>
                                    <td>${content.totalHours}</td>
                                    <td>${content.remarks}</td>
                                    <td style="color: #2ce72c">${content.status}</td>
                                    <td>
                                        <button class="btn btn-primary" onclick="changeLink(lastElement,${content.id})">
                                            <i class="fa fa-pen"></i> Details</button>
                                    </td>
                                </tr>
                            `;
                            claimTable.append(claimRow);
                        });
                    });
                }
            })
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

function GetNameProject(projectId, callback) {
    $.ajax({
        url: "/api/projects/" + projectId,
        type: "GET",
        dataType: "json",
        success: function (response) {
            callback(response.nameProject);
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

function GetEmailStaff(staffId, callback) {
    $.ajax({
        url: "/api/staff/" + staffId,
        type: "GET",
        dataType: "json",
        success: function (response) {
            callback(response.email);
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}
function changeLink(staffId,claimId) {
    window.location.href = "/claim/"+staffId+"/approver/" + claimId;
}