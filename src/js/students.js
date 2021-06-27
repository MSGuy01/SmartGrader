let students = document.getElementById("students");
let studentSection = home.getElementsByClassName("section")[1];
studentSection.addEventListener("click", function() {
    newContainer(2);
    showStudents();
});
//use map function to create new students?