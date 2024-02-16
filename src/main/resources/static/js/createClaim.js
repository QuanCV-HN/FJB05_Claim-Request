const dateOutput = document.getElementById("dateOutput");
const dayOutput = document.getElementById("dayOutput");
const fromOutput = document.getElementById("fromOutput");
const toOutput = document.getElementById("toOutput");
const hourOutput = document.getElementById("totalOutput");
const status = document.getElementById("status");
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

    dateOutput.innerText = date;
    dayOutput.innerText = day;
    fromOutput.innerText = from;
    toOutput.innerText = to;
    hourOutput.innerText = hours;

    $('#myModal').modal('hide');
});

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

function getAllInfoStaff() {
    $.ajax({
        url: "/api/staff/" + lastElement,
        type: "GET",
        dataType: "json",
        success: function(response) {
            document.getElementById("staffId").innerText = response.id;
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

getAllInfoStaff();

document.getElementById("submitDraft").addEventListener("click", function() {
    let claimData = {
        status: status.innerText,
        claimDate: dateOutput.innerText,
        day: dayOutput.innerText,
        fromDate: fromOutput.innerText,
        toDate: toOutput.innerText,
        totalHours: hourOutput.innerText,
        staffDTO: {
            id: parseInt(document.getElementById("staffId").innerText)
        },
        projectDTO: document.getElementById("projectId").innerText ?
            { id: parseInt(document.getElementById("projectId").innerText) } :
            null
    };

    $.ajax({
        url: "http://localhost:8080/api/createClaim",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(claimData),
        success: function(response) {
            alert("Save thành công!");
            window.location.href = "/claim/draft/" + lastElement;
        },
        error: function(xhr, status, error) {
            // Xử lý lỗi từ server
        }
    });
});
document.getElementById("submitPending").addEventListener("click", function() {
    let claimData = {
        status: "Pending",
        claimDate: dateOutput.innerText,
        day: dayOutput.innerText,
        fromDate: fromOutput.innerText,
        toDate: toOutput.innerText,
        totalHours: hourOutput.innerText,
        staffDTO: {
            id: parseInt(document.getElementById("staffId").innerText)
        },
        projectDTO: document.getElementById("projectId").innerText ?
            { id: parseInt(document.getElementById("projectId").innerText) } :
            null
    };

    $.ajax({
        url: "http://localhost:8080/api/createClaim",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(claimData),
        success: function(response) {
            alert("Submit thành công!");
            window.location.href = "/claim/draft/" + lastElement;
        },
        error: function(xhr, status, error) {
            // Xử lý lỗi từ server
        }
    });
});