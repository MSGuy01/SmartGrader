const sections = home.getElementsByClassName("section");
const containers = document.getElementsByClassName("sectionContainer");
const formButtons = document.getElementsByClassName("formButton");

var container = document.getElementById("home");
var currentSubject = "Math";







//Set up local storage
let subjectsArr = ["Language Arts", "Math", "Science", "Social Studies"];
if (! localStorage.getItem("subjects")) {
    localStorage.setItem("subjects", JSON.stringify(subjectsArr));
}
subjectsArr = JSON.parse(localStorage.getItem("subjects"));

let assignmentsArr = [["Topic 3 Test", "Math", "100", ["Test", "Geometry"]], ["CER", "Science", "10", ["CER", "Biology"]], ["Topic 4 Test", "Math", "75", ["test", "algebra"]]];
//if (! localStorage.getItem("assignments")) {
    localStorage.setItem("assignments", JSON.stringify(assignmentsArr));
//}
assignmentsArr = JSON.parse(localStorage.getItem("assignments"));

let studentsArr = ["John Doe", "Matthew Bevins", "Jane Doe"];
//if (! localStorage.getItem("students")) {
    localStorage.setItem("students", JSON.stringify(studentsArr));
//}
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

for (let i = 0; i < formButtons.length; i++) {
    formButtons[i].addEventListener("click", () => {
        newContainer(i + 5);
    })
}






//Hides old buttons and shows new ones
function newContainer (i) {
    container.style.display = "none";
    container = containers[i];
    container.style.display = "block";

    let assignments = document.getElementsByClassName("a");
    let len = assignments.length;
    for (let i = 0; i < len; i++) {
        assignments[0].parentNode.removeChild(assignments[0]);
    }

    let students = document.getElementsByClassName("student");
    len = students.length;
    for (let i = 0; i < len; i++) {
        students[0].parentNode.removeChild(students[0]);
    }

    let subjects = document.getElementsByClassName("subject");
    len = subjects.length;
    for (let i = 0; i < len; i++) {
        subjects[0].parentNode.removeChild(subjects[0]);
    }
}






function createSubjectElement(item) {
    let element = document.createElement("div");
    element.className = "section subject";
    element.innerHTML = '<div class="section-label"><img src="placeholder.jpg" height="50" width="50"><h3 align="center">' + item + '</h3></div>';
    return element;
}
function showSubjects() {
    let h3 = document.createElement("h3");
    h3.align = "center";
    let elementsArr = subjectsArr.map(createSubjectElement);
    for (let i = 0; i < elementsArr.length; i++) {
        h3.appendChild(elementsArr[i]);
    }
    subjects.appendChild(h3);
}

function createStudentElement(item) {
    let element = document.createElement("div");
    element.className = "section student";
    element.innerHTML = '<div class="section-label"><img src="placeholder.jpg" height="50" width="50"><h3 align="center">' + item + ' (GRADE)</h3></div>';
    return element;
}
function showStudents() {
    let h3 = document.createElement("h3");
    h3.align = "center";
    let elementsArr = studentsArr.map(createStudentElement);
    for (let i = 0; i < elementsArr.length; i++) {
        h3.appendChild(elementsArr[i]);
    }
    students.appendChild(h3);
}

function createAssignmentElement(item) {
    let element = document.createElement("div");
    element.className = "assignment a";
    element.id = item;
    element.innerHTML = '<h3 align="center">' + item[0] + ' (' + item[2] + ')</h3>';
    return element;
}
function isSubject(item) {
    return item[1] == currentSubject;
}
//create assignment elements
function showAssignments() {
    let elementsArr = assignmentsArr.filter(isSubject).map(createAssignmentElement);
    for (let i = 0; i < elementsArr.length; i++) {
        let br = document.createElement("br");
        br.className = "a";
        grades.appendChild(br);
        grades.appendChild(elementsArr[i]);
    }
}








//forms

function getSubTopics(val) {
    let finalArr = [];
    let current = "";
    console.log("HEIIFHIEF: " + val.length);
    for (let i = 0; i < val.length; i++) {
        if (val[i] == " ") {
            i++;
        }
        if (val[i] == ",") {
            console.log('hi');
            finalArr.push(current);
            current = "";
            i++;
        }
        current += val[i];
    }
    finalArr.push(current);
    return finalArr;
}


submitAssignment.addEventListener("click", () => {
    assignmentsArr.push([aname.value, currentSubject, apoints.value, getSubTopics(asubtopics.value)]);
    localStorage.setItem("assignments", JSON.stringify(assignmentsArr));
    newContainer(3);
    showAssignments();
})

submitStudent.addEventListener("click", () => {
    studentsArr.push(astudent.value);
    localStorage.setItem("students", JSON.stringify(studentsArr));
    newContainer(2);
    showStudents();
})
