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


let status = document.getElementById("status");
let staffId = document.getElementById("staffId");
let projectId = document.getElementById("projectId");
let dateOutput = document.getElementById("dateOutput");
let fromOutput = document.getElementById("fromOutput");
let toOutput = document.getElementById("toOutput");
let totalOutput = document.getElementById("totalOutput");
let dayOutput = document.getElementById("dayOutput");
let remark = document.getElementById("remark");

document.getElementById("dateInput").addEventListener("change", function() {
    let date = this.value;
    let day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
    document.getElementById("dayInput").value = day;
});

document.getElementById("submitBtn-modal").addEventListener("click", function() {
    let date = document.getElementById("dateInput").value;
    let day = document.getElementById("dayInput").value;
    let from = document.getElementById("fromInput").value;
    let to = document.getElementById("toInput").value;
    let hours = document.getElementById("hoursInput").value;

    dateOutput.textContent = date;
    dayOutput.textContent = day;
    fromOutput.textContent = from;
    toOutput.textContent = to;
    totalOutput.textContent = hours;

    $('#myModal').modal('hide');
});
function GetClaimToUpdate() {
    $.ajax({
            url: "http://localhost:8080/api/claims/" + lastElement,
            method: "GET",
            contentType: "application/json",
            success: function(response) {
                status.textContent = response.status;
                staffId.textContent = response.staffId;
                projectId.textContent = response.projectId;
                dateOutput.textContent = response.claimDate;
                dayOutput.textContent = response.day;
                fromOutput.textContent = response.fromDate;
                toOutput.textContent = response.toDate;
                totalOutput.textContent = response.totalHours;
                getInfoProject(response.staffId);
            },
            error: function(xhr, status, error) {
            }
    });
}
GetClaimToUpdate();

function getInfoProject(e) {
    $.ajax({
        url: "/api/staff/" + e,
        type: "GET",
        dataType: "json",
        success: function(response) {
            document.getElementById("staffName").innerText = response.name;
            const selectElement = document.getElementById("projectSelect");
            const roleInproject = document.getElementById("roleInProject");

            response.workingDTOS.forEach(function(workingDTO) {
                const optionElement = document.createElement("option");
                if (workingDTO.roleStaff !== "PM" && workingDTO.roleStaff !== "FINANCE") {
                    optionElement.value = workingDTO.project.id;
                    optionElement.textContent = workingDTO.project.nameProject;
                    selectElement.appendChild(optionElement);
                }
            });

            selectElement.addEventListener("change", function() {
                let selectedProjectId = selectElement.value;

                const selectedWorkingDTO = response.workingDTOS.find(function(workingDTO) {
                    return workingDTO.project.id === parseInt(selectedProjectId);
                });

                if (selectedWorkingDTO) {
                    document.getElementById("projectId").innerText = selectedWorkingDTO.project.id;
                    roleInproject.innerText = selectedWorkingDTO.roleStaff;
                } else {
                    roleInproject.innerText = "";
                }
            });
        },
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}
function UpdateClaim() {
    let claimData = {
        status : status.textContent,
        claimDate: dateOutput.textContent,
        day: dayOutput.textContent,
        fromDate: fromOutput.textContent,
        toDate: toOutput.textContent,
        totalHours: totalOutput.textContent,
        "remarks": remark.value,
        "staffDTO": {
            "id": staffId.textContent
        },
        "projectDTO": {
            "id": projectId.textContent
        }
    };
    $.ajax({
        url: "http://localhost:8080/api/claims/" + lastElement,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(claimData),
        success: function (response) {
        },
        error: function (xhr, status, error) {
        }
    });
}

function submitUpdateClaim() {
    let claimData = {
        status : "Pending",
        claimDate: dateOutput.textContent,
        day: dayOutput.textContent,
        fromDate: fromOutput.textContent,
        toDate: toOutput.textContent,
        totalHours: totalOutput.textContent,
        remarks: remark.value,
        "staffDTO": {
            "id": staffId.textContent
        },
        "projectDTO": {
            "id": projectId.textContent
        }
    };
    $.ajax({
        url: "http://localhost:8080/api/claims/" + lastElement,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(claimData),
        success: function (response) {
        },
        error: function (xhr, status, error) {
        }
    });
}
document.getElementById("submitDraft").addEventListener("click", function () {
    alert("Save thành công!");
    UpdateClaim();
    window.location.href = "/claim/draft/" + staffId.textContent;
})
document.getElementById("submitPending").addEventListener("click", function () {
    alert("Submit thành công!");
    submitUpdateClaim();
    window.location.href = "/claim/draft/" + staffId.textContent;
})