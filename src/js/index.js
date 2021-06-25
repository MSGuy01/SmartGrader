var sections = document.getElementsByClassName("section");
var containers = document.getElementsByClassName("sectionContainer");

var container = document.getElementById("home");

var functionArr = [
    Assignments, 
    Students
];

for (let i = 0; i < containers.length; i++) {
    containers[i].style.display = "none";
}
for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener("click", () => {
        functionArr[i]();
    })
}
container.style.display = "block";

function newContainer (i) {
    container.style.display = "none";
    container = containers[i];
    container.style.display = "block";
}
function Assignments () {
    newContainer(1);
}
function Subject (s) {

}



function Students () {
    console.log('students');
}