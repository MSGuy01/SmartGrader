let studentSection = home.getElementsByClassName("section")[2];
studentSection.addEventListener("click", function() {
    newContainer(3);
    showStudents();
    clickableStudents();
});

function clickableStudents() {
    let students = document.getElementById("students");
    let studentSections = students.getElementsByClassName("section");
    for (let i = 0; i < studentSections.length; i++) {
        studentSections[i].addEventListener("click", function() {
            currentStudent = this.id;
            newContainer(5);
            showingStudent = true;
            showAssignments();
            showSubjectList();
            showSubtopicList();
        });
    }
}