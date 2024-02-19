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
                if (content.status === "Paid") {
                    GetNameProject(content.projectId, function(nameProject) {
                        GetEmailStaff(content.staffId, function(email) {
                            let claimRow = `
                                <tr>
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
function downloadClaimsToExcel() {
    // Get the table headers
    var headers = [];
    document.querySelectorAll("#table thead th").forEach(function (th) {
        headers.push(th.textContent);
    });

    // Get the claims data from the table
    var claims = [];
    document.querySelectorAll("#claimTable tr").forEach(function (row) {
        var rowData = [];
        row.querySelectorAll("td").forEach(function (cell) {
            rowData.push(cell.textContent);
        });
        claims.push(rowData);
    });

    // Create a new workbook
    var workbook = XLSX.utils.book_new();

    // Convert claims data to worksheet
    var worksheet = XLSX.utils.aoa_to_sheet([headers].concat(claims));

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Claims");

    // Generate a binary Excel file
    var excelFile = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    // Convert the binary file to Blob
    var blob = new Blob([excelFile], {
        type: "application/octet-stream",
    });

    // Generate a temporary download link and initiate download
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "claims.xlsx";
    link.click();
}

// Event listener for the "Download Claims" button
document.getElementById("btn-download").addEventListener("click", function () {
    downloadClaimsToExcel();
});