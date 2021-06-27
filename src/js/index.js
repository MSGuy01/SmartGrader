const sections = home.getElementsByClassName("section");
const containers = document.getElementsByClassName("sectionContainer");
const formButtons = document.getElementsByClassName("formButton");

var container = document.getElementById("home");
var currentSubject = "Math";
var currentStudent = 0;
var currentAssignment = 0;
var showingStudent = false;


/*

TO DO:
EDIT STUDENT ARR REFERENCES TO INCLUDE 4 INDICES
*/


//LOCAL STORAGE


//Set up local storage
let subjectsArr = ["Language Arts", "Math", "Science", "Social Studies"];
//if (! localStorage.getItem("subjects")) {
    localStorage.setItem("subjects", JSON.stringify(subjectsArr));
//}
subjectsArr = JSON.parse(localStorage.getItem("subjects"));

let assignmentsArr = [["Topic 3 Test", "Math", 100, ["test", "geometry"]]];
//if (! localStorage.getItem("assignments")) {
    localStorage.setItem("assignments", JSON.stringify(assignmentsArr));
//}
assignmentsArr = JSON.parse(localStorage.getItem("assignments"));

let subtopicsArr = ["test", "geometry"];
//if (! localStorage.getItem("subtopics")) {
    localStorage.setItem("subtopics", JSON.stringify(subtopicsArr));
//}
subtopicsArr = JSON.parse(localStorage.getItem("subtopics"));

//[name, earned points, graded points, assignments (name, subject, earned points, total points, graded?, subtopics)]
let studentsArr = [["John Doe", 0, 0, [["Topic 3 Test", "Math", 0, 100, false, ["test", "geometry"]]]], ["Jane Doe", 0, 0, [["Topic 3 Test", "Math", 0, 100, false, ["test", "geometry"]]]]];
//if (! localStorage.getItem("students")) {
    localStorage.setItem("students", JSON.stringify(studentsArr));
//}
studentsArr = JSON.parse(localStorage.getItem("students"));


//SETTING UP CONTAINERS


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


//MANAGES WHAT IS DISPLAYED ON SCREEN


function newContainer (i) {
    showingStudent = false;
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


//CREATES NEW ELEMENTS WHEN NEEDED


var index2 = -1;
function createSubjectElement(item) {
    let currentTotal = 0;
    let currentEarned = 0;
    index2++;
    for (let i = 0; i < studentsArr.length; i++) {
        for (let j = 0; j < studentsArr[i][3].length; j++) {
            if (studentsArr[i][3][j][1] == subjectsArr[index2]) {
                currentEarned += parseInt(studentsArr[i][3][j][2]);
                currentTotal += parseInt(studentsArr[i][3][j][3]);
            }
        }
    }


    let element = document.createElement("div");
    element.className = "section subject";
    element.innerHTML = '<div class="section-label"><img src="images/pencil.png" height="50" width="50"><h3 align="center">' + item + '</h3><h3 align="center" class="classAverageLabel">Class Average: <span class="score">' + Math.round((currentEarned/currentTotal) * 100, 1) + '</span>% | ' + getLetterGrade(currentEarned/currentTotal * 100) + '</h3></div>';
    return element;
}
function showSubjects() {
    index2 = -1;
    let h3 = document.createElement("h3");
    h3.align = "center";
    let elementsArr = subjectsArr.map(createSubjectElement);
    for (let i = 0; i < elementsArr.length; i++) {
        h3.appendChild(elementsArr[i]);
    }
    subjects.appendChild(h3);
    for (let i = 0; i < document.getElementsByClassName("classAverageLabel").length; i++) {
        if (parseInt(document.getElementsByClassName("score")[i].innerHTML) >= 83) {
            document.getElementsByClassName("classAverageLabel")[i].style.color = "green";
            document.getElementsByClassName("classAverageLabel")[i].innerHTML += " - Doing well at this subject";
        }
        else if (parseInt(document.getElementsByClassName("score")[i].innerHTML) >= 73) {
            document.getElementsByClassName("classAverageLabel")[i].style.color = "orange";
            document.getElementsByClassName("classAverageLabel")[i].innerHTML += " - May need some help on this subject";
        }
        else {
            document.getElementsByClassName("classAverageLabel")[i].style.color = "red";
            document.getElementsByClassName("classAverageLabel")[i].innerHTML += " - Needs help on this subject";
        }
    }
}

function getIndex(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return i;
        }
    }
    return -1;
}

function getLetterGrade(p) {
    if (p >= 93) {
        return 'A';
    }
    else if (p >= 90) {
        return 'A-';
    }
    else if (p >= 87) {
        return 'B+';
    }
    else if (p >= 83) {
        return 'B';
    }
    else if (p >= 80) {
        return 'B-';
    }
    else if (p >= 77) {
        return 'C+';
    }
    else if (p >= 73) {
        return 'C';
    }
    else if (p >= 70) {
        return 'C-';
    }
    else if (p >= 67) {
        return 'D+';
    }
    else if (p >= 60) {
        return 'D';
    }
    else {
        return 'F';
    }
}

function createStudentElement(item) {
    let element = document.createElement("div");
    element.className = "section student";
    element.id = getIndex(studentsArr, item);
    let grade = (item[1]/item[2]) * 100;
    element.innerHTML = '<div class="section-label"><img src="images/user.png" height="50" width="50"><h3 align="center">' + item[0] + ' (' + getLetterGrade(grade) + ' | ' + Math.round(grade, 1) + '%)</h3></div>';
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

var index4 = -1;
function createSubtopicElement(item) {
    let currentTotal = 0;
    let currentEarned = 0;
    index4++;
    for (let i = 0; i < studentsArr.length; i++) {
        for (let j = 0; j < studentsArr[i][3].length; j++) {
            for (let k = 0; k < studentsArr[i][3][j][5].length; k++) {
                if (studentsArr[i][3][j][5][k] == subtopicsArr[index4]) {
                    console.log('yes');
                    currentEarned += parseInt(studentsArr[i][3][j][2]);
                    currentTotal += parseInt(studentsArr[i][3][j][3]);
                }
                else{
                    console.log('no');
                }
            }
        }
    }

    let element = document.createElement("div");
    element.className = "assignment a";
    
    element.innerHTML = '<h3 align="center" class="classAverageLabelSub">' + item + ' (Class Average: <span class="scoresub">' + Math.round((currentEarned/currentTotal) * 100, 1) + '</span>% | ' + getLetterGrade(currentEarned/currentTotal * 100) + ')</h3>';
    return element;
}

function showSubtopics() {
    index4 = -1;
    let elementsArr;
    elementsArr = subtopicsArr.map(createSubtopicElement);
    for (let i = 0; i < elementsArr.length; i++) {
        let br = document.createElement("br");
        br.className = "a";
        subtopics.appendChild(br);
        subtopics.appendChild(elementsArr[i]);
    }

    for (let i = 0; i < document.getElementsByClassName("classAverageLabelSub").length; i++) {
        if (parseInt(document.getElementsByClassName("scoresub")[i].innerHTML) >= 83) {
            document.getElementsByClassName("classAverageLabelSub")[i].style.color = "green";
            document.getElementsByClassName("classAverageLabelSub")[i].innerHTML += " - Doing well at this subtopic";
        }
        else if (parseInt(document.getElementsByClassName("scoresub")[i].innerHTML) >= 73) {
            document.getElementsByClassName("classAverageLabelSub")[i].style.color = "orange";
            document.getElementsByClassName("classAverageLabelSub")[i].innerHTML += " - May need some help on this subtopic";
        }
        else {
            document.getElementsByClassName("classAverageLabelSub")[i].style.color = "red";
            document.getElementsByClassName("classAverageLabelSub")[i].innerHTML += " - Needs help on this subtopic";
        }
    }
}


var index = 0;
var index3 = -1;
function createAssignmentElement(item) {
    let currentTotal = 0;
    let currentEarned = 0;
    index3++;
    for (let i = 0; i < studentsArr.length; i++) {
        console.log(item);
        for (let j = 0; j < studentsArr[i][3].length; j++) {
            if (studentsArr[i][3][j][1] == assignmentsArr[index3]) {
                console.log('add');
                currentEarned += parseInt(studentsArr[i][3][j][2]);
                currentTotal += parseInt(studentsArr[i][3][j][3]);
                console.log(currentEarned);
                console.log('/');
                console.log(currentTotal);
            }
        }
    }




    let element = document.createElement("div");
    element.className = "assignment a";
    if (showingStudent) {
        element.innerHTML = '<h3 align="center">[' + item[1] + '] ' + item[0] + ' (' + studentsArr[currentStudent][3][index][2] + '/' + item[2] + ')</h3>';
    }
    else {
        element.innerHTML = '<h3 align="center">' + item[0] + ' (' + item[2] + ') Class Average: ' + (currentEarned/currentTotal) + '% | ' + + '</h3>';
    }
    index++;
    return element;
}
function isSubject(item) {
    return item[1] == currentSubject;
}
function showAssignments() {
    index3 = -1;
    index = 0;
    let elementsArr;
    if (showingStudent) {
        elementsArr = assignmentsArr.map(createAssignmentElement);
    }
    else {
        elementsArr = assignmentsArr.filter(isSubject).map(createAssignmentElement);
    }
    for (let i = 0; i < elementsArr.length; i++) {
        let br = document.createElement("br");
        br.className = "a";
        if (showingStudent) {
            individual.appendChild(br);
            individual.appendChild(elementsArr[i]);
        }
        else {
            grades.appendChild(br);
            grades.appendChild(elementsArr[i]);
        }
    }
}

function showSubjectList() {
    let currentTotal = 0;
    let currentEarned = 0;
    let h4 = document.createElement("h4");
    h4.align = "center";
    let elementsArr = [];
    for (let i = 0; i < subjectsArr.length; i++) {
        for (let j = 0; j < studentsArr[0][3].length; j++) {
            if (studentsArr[currentStudent][3][j][1] == subjectsArr[i]) {
                currentTotal += parseInt(studentsArr[currentStudent][3][j][3]);
                currentEarned += parseInt(studentsArr[currentStudent][3][j][2]);
            }
        }
        let h4 = document.createElement("h5");
        h4.align = "center";
        h4.className = "a";
        h4.innerHTML = subjectsArr[i] + " (" + Math.round((currentEarned/currentTotal) * 100, 1) + "% | " + getLetterGrade(currentEarned/currentTotal * 100) + ")";
        if (currentEarned/currentTotal * 100 >= 83) {
            h4.style.color = "green";
            h4.innerHTML += " - Doing well at this subject";
        }
        else if (currentEarned/currentTotal * 100 >= 73) {
            h4.style.color = "orange";
            h4.innerHTML += " - May need some help on this subject";
        }
        else {
            h4.style.color = "red";
            h4.innerHTML += " - Needs help on this subject";
        }
        elementsArr.push(h4);
        currentTotal = 0;
        currentEarned = 0;
    }
    for (let i = 0; i < elementsArr.length; i++) {
        subjectsList.appendChild(elementsArr[i]);
    }
}

function showSubtopicList() {
    let currentTotal = 0;
    let currentEarned = 0;
    let h4 = document.createElement("h4");
    h4.align = "center";
    let elementsArr = [];
    for (let i = 0; i < subtopicsArr.length; i++) {
        for (let j = 0; j < studentsArr[0][3].length; j++) {
            for (let k = 0; k < studentsArr[currentStudent][3][j][5].length; k++) {
                if (studentsArr[currentStudent][3][j][5][k] == subtopicsArr[i]) {
                    currentTotal += parseInt(studentsArr[currentStudent][3][j][3]);
                    currentEarned += parseInt(studentsArr[currentStudent][3][j][2]);
                }
            }
        }
        let h4 = document.createElement("h5");
        h4.align = "center";
        h4.className = "a";
        h4.innerHTML = subtopicsArr[i] + " (" + Math.round((currentEarned/currentTotal) * 100, 1) + "% | " + getLetterGrade(currentEarned/currentTotal * 100) + ")";
        if (currentEarned/currentTotal * 100 >= 83) {
            h4.style.color = "green";
            h4.innerHTML += " - Doing well at this subtopic";
        }
        else if (currentEarned/currentTotal * 100 >= 73) {
            h4.style.color = "orange";
            h4.innerHTML += " - May need some help on this subtopic";
        }
        else {
            h4.style.color = "red";
            h4.innerHTML += " - Needs help on this subtopic";
        }
        elementsArr.push(h4);
        currentTotal = 0;
        currentEarned = 0;
    }
    for (let i = 0; i < elementsArr.length; i++) {
        subtopicsList.appendChild(elementsArr[i]);
    }
}


//FORMS
function contains(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return arr;
        }
    }
    return false;
}

function getSubTopics(val) {
    let finalArr = [];
    let current = "";
    for (let i = 0; i < val.length; i++) {
        if (val[i] == " ") {
            i++;
        }
        if (val[i] == ",") {
            finalArr.push(current.toLowerCase());
            if (! contains(subtopicsArr, current.toLowerCase())) {
                subtopicsArr.push(current.toLowerCase());
            }
            current = "";
            i++;
        }
        current += val[i];
    }
    finalArr.push(current.toLowerCase());
    if (! contains(subtopicsArr, current.toLowerCase())) {
        subtopicsArr.push(current.toLowerCase());
    }
    localStorage.setItem("subtopics", JSON.stringify(subtopicsArr));
    return finalArr;
}

//["John Doe", 0, 0, [["Topic 3 Test", "Math", 0, 100, false]]]
//let assignmentsArr = [["Topic 3 Test", "Math", 100, ["test", "geometry"]]];
submitStudent.addEventListener("click", () => {
    studentsArr.push([astudent.value, 0, 0, []]);
    for (let i = 0; i < assignmentsArr.length; i++) {
        studentsArr[studentsArr.length-1][3].push([assignmentsArr[i][0], assignmentsArr[i][1], 0, assignmentsArr[i][2], false, assignmentsArr[i][3]]);
    }
    localStorage.setItem("students", JSON.stringify(studentsArr));
    newContainer(3);
    showStudents();
})

submitSubject.addEventListener("click", () => {
    subjectsArr.push(asubject.value);
    localStorage.setItem("subjects", JSON.stringify(subjectsArr));
    newContainer(1);
    showSubjects();
})

submitAssignment.addEventListener("click", () => {
    assignmentsArr.push([aname.value, currentSubject, apoints.value, getSubTopics(asubtopics.value)]);
    for (let i = 0; i < studentsArr.length; i++) {
        studentsArr[i][3].push([aname.value, currentSubject, 0, apoints.value, false, getSubTopics(asubtopics.value)]);
    }
    localStorage.setItem("students", JSON.stringify(studentsArr));
    localStorage.setItem("assignments", JSON.stringify(assignmentsArr));
    newContainer(4);
    showAssignments();
})


//["John Doe", 0, 0, [["Topic 3 Test", "Math", 0, 100, false]]]

submitGrade.addEventListener("click", () => {
    //assignmentsArr.push([aname.value, currentSubject, apoints.value, getSubTopics(asubtopics.value)]);
    let falseLen = 0;
    for (let i = 0; i < studentsArr[currentStudent][3].length; i++) {
        if (studentsArr[currentStudent][3][i][4] == false) {
            falseLen++;
        }
    }


    studentsArr[currentStudent][3][gname.value][4] = true;
    studentsArr[currentStudent][3][gname.value][2] = gpoints.value;
    studentsArr[currentStudent][2] += assignmentsArr[gname.value][2];
    studentsArr[currentStudent][1] += parseInt(gpoints.value);
    localStorage.setItem("students", JSON.stringify(studentsArr));
    newContainer(5);
    showingStudent = true;
    showAssignments();
    showSubjectList();
    showSubtopicList();
})
