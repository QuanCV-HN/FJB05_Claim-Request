
const currentPath = window.location.pathname;
const pathElements = currentPath.split('/');
const lastElement = pathElements[pathElements.length - 1];

function getAllDraftClaim() {
    $.ajax({
        url: "/api/claims/staff/" + lastElement,
        type: "GET",
        dataType: "json",
        success: function(response) {
            let claimTable = $("#claimTable");
            claimTable.empty();
            response.forEach(content => {
                if (content.status === "Draft") {
                    $.ajax({
                        url: "/api/projects/" + content.projectId,
                        type: "GET",
                        dataType: "json",
                        success: function(project) {
                            claimTable.append(
                                `
                                <tr id="${content.id}">
                                    <td>${project.nameProject}</td>
                                    <td>${content.totalHours}</td>
                                    <td>${content.remarks}</td>
                                    <td>${content.status}</td>
                                    <td><button class="btn btn-primary" onclick="EditClaimById(${content.id})"><i class="fa fa-pen"></i> Edit</button></td>
                                    <td><button class="btn btn-danger" onclick="deleteClaimById(${content.id})"><i class="fa fa-trash-alt"></i> Delete</button></td>
                                </tr>
                                `
                            );
                        },
                        error: function(xhr, status, error) {
                            console.log(status + ": " + error);
                        }
                    });
                }
            });
        },
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

getAllDraftClaim();
function deleteClaimById(claimId) {
    $.ajax({
        url: "/api/claims/staff/" + claimId,
        type: "DELETE",
        success: function(response) {
            confirm("You are sure?")
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log("Error deleting claim: " + status + ": " + error);
        }
    });
}
document.getElementById("createClaim").addEventListener("click", function () {
    window.location.href = "/claim/create/" + lastElement;
})
function EditClaimById(id) {
    $.ajax({
        url: "/api/claims/" + id,
        type: "GET",
        success: function(response) {
            window.location.href = "/claim/edit/" + id;
        },
        error: function(xhr, status, error) {
            console.log("Error edit claim: " + status + ": " + error);
        }
    });
}







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