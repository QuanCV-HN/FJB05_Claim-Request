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
                if (content.roleStaff === "FINANCE") {
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
                if (content.status === "Approved") {
                    console.log(content.id);
                    GetNameProject(content.projectId, function(nameProject) {
                        GetEmailStaff(content.staffId, function(email) {
                            let claimRow = `
                                <tr>
                                    <td><input type="checkbox" id="${content.id}" class="claim-checkbox"></td>
                                    <td>${email}</td>
                                    <td>${nameProject}</td>
                                    <td>${content.totalHours}</td>
                                    <td>${content.remarks}</td>
                                    <td style="color: #0d53e8">${content.status}</td>
                                </tr>
                            `;
                            claimTable.append(claimRow);
                        });
                    });
                }
            });

            // // Add event listener to "Paid" button
            // $("#paid-btn").on("click", function() {
            //     // Get the IDs of selected checkboxes
            //     var selectedClaimIds = $(".claim-checkbox:checked").map(function() {
            //         return this.id;
            //     }).get();
            //
            //     // Update status for each selected claim
            //     selectedClaimIds.forEach(function(claimId) {
            //         var updateUrl = "/api/claims/" + claimId + "/status";
            //         var claimDTO = { status: "Paid" };
            //
            //         $.ajax({
            //             url: updateUrl,
            //             type: "PUT",
            //             contentType: "application/json",
            //             data: JSON.stringify(claimDTO),
            //             success: function(updatedClaim) {
            //                 alert("Đã Paid thành công!");
            //                 location.reload();
            //             },
            //             error: function(xhr, status, error) {
            //                 console.log(status + ": " + error);
            //             }
            //         });
            //     });
            // });

            // Add event listener to select all checkbox
            let selectAllCheckbox = document.getElementById("checkboxAll");
            selectAllCheckbox.addEventListener("change", function() {
                let checkboxes = document.querySelectorAll(".claim-checkbox");

                for (let i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].checked = selectAllCheckbox.checked;
                }
            });
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

$("#paid-btn").on("click", function() {
    var selectedClaimIds = $(".claim-checkbox:checked").map(function() {
        return this.id;
    }).get();

    if (selectedClaimIds.length > 0) {

        $(this).prop("disabled", true);

        var updateCount = 0;
        selectedClaimIds.forEach(function(claimId) {
            var updateUrl = "/api/claims/" + claimId + "/status";
            var claimDTO = { status: "Paid" };

            $.ajax({
                url: updateUrl,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(claimDTO),
                success: function() {
                    updateCount++;

                    if (updateCount === selectedClaimIds.length) {
                        alert("Đã Paid thành công!");
                        location.reload();
                    }
                },
                error: function(xhr, status, error) {
                    console.log(status + ": " + error);
                }
            });
        });
    } else {
        alert("Vui lòng chọn ít nhất một yêu cầu để thực hiện Paid.");
    }
});
GetInfoProject(projectId, claimTable);
