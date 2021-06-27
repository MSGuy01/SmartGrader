let subjectSection = home.getElementsByClassName("section")[0];
subjectSection.addEventListener("click", function() {
    newContainer(1);
    showSubjects();

    let subjects = document.getElementById("subjects");
    let subjectSections = subjects.getElementsByClassName("section");
    for (let i = 0; i < subjectSections.length; i++) {
        subjectSections[i].addEventListener("click", function() {
            currentSubject = this.getElementsByTagName("h3")[0].innerHTML;
            newContainer(3);
            showAssignments();
        });
    }
});

//use map function to create new subjects?