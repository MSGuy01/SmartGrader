let studentSection = home.getElementsByClassName("section")[1];
studentSection.addEventListener("click", function() {
    newContainer(2);
    showStudents();

    let students = document.getElementById("students");
    let studentSections = students.getElementsByClassName("section");
    for (let i = 0; i < studentSections.length; i++) {
        studentSections[i].addEventListener("click", function() {
            currentStudent = this.id;
            newContainer(4);
            showingStudent = true;
            showAssignments();
        });
    }
});