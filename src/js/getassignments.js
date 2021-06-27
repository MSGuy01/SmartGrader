gradeAssignmentButton.addEventListener("click", () => {
    let l = document.getElementsByTagName("option").length;
    for (let i = 0; i < l; i++) {
        document.getElementsByTagName("option")[0].parentNode.removeChild(document.getElementsByTagName("option")[0]);
    }
    for (let i = 0; i < studentsArr[currentStudent][3].length; i++) {
        if (! studentsArr[currentStudent][3][i][4]) {
            let currentOption = document.createElement("option");
            currentOption.value = i;
            currentOption.id = assignmentsArr[i][2]
            currentOption.innerHTML = assignmentsArr[i][0];
            gname.appendChild(currentOption);
        }
    }
})