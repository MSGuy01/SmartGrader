var sections = home.getElementsByClassName("section");
var containers = document.getElementsByClassName("sectionContainer");
var container = document.getElementById("home");
var currentSubject = "Math";

//Set up local storage
let subjectsArr = ["Language Arts", "Math", "Science", "Social Studies"];
if (! localStorage.getItem("subjects")) {
    localStorage.setItem("subjects", JSON.stringify(subjectsArr));
}
subjectsArr = JSON.parse(localStorage.getItem("subjects"));

let assignmentsArr = [["Topic 3 Test", "Summative", "Math", ["Test", "Geometry"]], ["CER", "Formative", "Math", ["CER", "Biology"]]];
if (! localStorage.getItem("assignments")) {
    localStorage.setItem("assignments", JSON.stringify(assignmentsArr));
}
assignmentsArr = JSON.parse(localStorage.getItem("assignments"));

let studentsArr = ["John Doe", "Matthew Bevins", "Jane Doe"];
if (! localStorage.getItem("students")) {
    localStorage.setItem("students", JSON.stringify(studentsArr));
}
studentsArr = JSON.parse(localStorage.getItem("students"));


//Hide all unneeded buttons
for (let i = 0; i < containers.length; i++) {
    containers[i].style.display = "none";
}

//Set up events when buttons on home screen are clicked
for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener("click", () => {
        newContainer(i + 1);
    })
}
container.style.display = "block";

//Hides old buttons and shows new ones
function newContainer (i) {
    container.style.display = "none";
    if (i != -1) {
        container = containers[i];
        container.style.display = "block";
    }
    
}

function createAssignmentElement(item) {
    let element = document.createElement("div");
    element.className = "assignment";
    element.innerHTML = '<h3 align="center">' + item[0] + '</h3>';
    return element;
}
function isSubject(item) {
    return item[2] == currentSubject;
}
//create assignment elements
function showAssignments() {
    let elementsArr = assignmentsArr.filter(isSubject).map(createAssignmentElement);
    console.log(elementsArr);
    for (let i = 0; i < elementsArr.length; i++) {
        let br = document.createElement("br");
        br.className = "break";
        grades.appendChild(br);
        grades.appendChild(elementsArr[i]);
    }
}