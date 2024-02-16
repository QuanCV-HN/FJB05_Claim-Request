const currentPath = window.location.pathname;
const pathElements = currentPath.split('/');
const lastElement = pathElements[pathElements.length - 1];
const staffUrl = pathElements[pathElements.length - 3];
let status = document.getElementById("status");
let staffId = document.getElementById("staffId");
let staffName = document.getElementById("staffName");
let projectId = document.getElementById("projectId");
let nameProject = document.getElementById("nameProject");
let roleInProject = document.getElementById("roleInProject");
let remark = document.getElementById("remark");
let dateOutput = document.getElementById("dateOutput");
let dayOutput = document.getElementById("dayOutput");
let fromOutput = document.getElementById("fromOutput");
let toOutput = document.getElementById("toOutput");
let totalHours = document.getElementById("totalOutput");

function ApproveStaffPending() {
    $.ajax({
        url: "/api/claims/" + lastElement,
        type: "GET",
        dataType: "json",
        success: function (response) {
            status.textContent = response.status;
            staffId.textContent = response.staffId;
            projectId.textContent =response.projectId;
            remark.textContent = response.remarks;
            dateOutput.textContent = response.claimDate;
            dayOutput.textContent = response.day;
            fromOutput.textContent = response.fromDate;
            toOutput.textContent = response.toDate;
            totalHours.textContent = response.totalHours;
            GetInfoStaffAndProject(response.staffId, function (infoResponse) {
                staffName.textContent = infoResponse.name;
                for (let i = 0; i < infoResponse.workingDTOS.length; i++) {
                    if (infoResponse.workingDTOS[i].project.id === response.projectId) {
                        nameProject.textContent = infoResponse.workingDTOS[i].project.nameProject;
                        roleInProject.textContent =infoResponse.workingDTOS[i].roleStaff;
                        break;
                    }
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

function GetInfoStaffAndProject(e, callback) {
    $.ajax({
        url: "/api/staff/" + e,
        type: "GET",
        dataType: "json",
        success: function (response) {
            if (callback) {
                callback(response);
            }
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

ApproveStaffPending();

function submitApproveClaim() {
    let claimData = {
        status: "Approve",
        claimDate: dateOutput.textContent,
        day: dayOutput.textContent,
        fromDate: fromOutput.textContent,
        toDate: toOutput.textContent,
        totalHours: totalOutput.textContent,
        remarks: remark.value,
        staffDTO: {
            id: staffId.textContent
        },
        projectDTO: {
            id: projectId.textContent
        }
    };
    $.ajax({
        url: "/api/claims/" + lastElement,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(claimData),
        success: function (response) {
            alert("Approve thành công!");
            window.location.href = "/claim/pending/" + staffUrl;
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}
function submitRejectClaim() {
    let claimData = {
        status: "Reject",
        claimDate: dateOutput.textContent,
        day: dayOutput.textContent,
        fromDate: fromOutput.textContent,
        toDate: toOutput.textContent,
        totalHours: totalOutput.textContent,
        remarks: remark.value,
        staffDTO: {
            id: staffId.textContent
        },
        projectDTO: {
            id: projectId.textContent
        }
    };
    $.ajax({
        url: "/api/claims/" + lastElement,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(claimData),
        success: function (response) {
            alert("Reject thành công!");
            window.location.href = "/claim/pending/" + staffUrl;
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}
function submitReturnClaim() {
    let claimData = {
        status: "Reject",
        claimDate: dateOutput.textContent,
        day: dayOutput.textContent,
        fromDate: fromOutput.textContent,
        toDate: toOutput.textContent,
        totalHours: totalOutput.textContent,
        remarks: remark.value,
        staffDTO: {
            id: staffId.textContent
        },
        projectDTO: {
            id: projectId.textContent
        }
    };
    $.ajax({
        url: "/api/claims/" + lastElement,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(claimData),
        success: function (response) {
            alert("Return thành công!");
            window.location.href = "/claim/pending/" + staffUrl;
        },
        error: function (xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
}

document.getElementById("submitApprove").addEventListener("click", function () {
    submitApproveClaim();
});
document.getElementById("submitReject").addEventListener("click", function () {
    submitRejectClaim();
});
document.getElementById("submitReturn").addEventListener("click", function () {
    submitReturnClaim();
});