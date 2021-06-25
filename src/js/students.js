let students = document.getElementById("students");
let studentSections = students.getElementsByClassName("section");
for (let i = 0; i < studentSections.length; i++) {
    studentSections[i].addEventListener("click", function() {
        console.log("student");
    });
}
//use map function to create new students?