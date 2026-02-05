// Array to store student records
let students = [];

// Function to calculate grade based on marks
function calculateGrade(marks) {
    let grade;
    if (marks >= 90) {
        grade = "A+";
    } else if (marks >= 80) {
        grade = "A";
    } else if (marks >= 70) {
        grade = "B";
    } else if (marks >= 60) {
        grade = "C";
    } else if (marks >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }
    return grade;
}

// Function to display student records
function displayStudents() {
    const tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = ""; // Clear previous rows

    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const rollnocell = document.createElement("td");
        rollnocell.textContent = student.rollno;

        const subjectcell = document.createElement("td");
        subjectcell.textContent = student.subject;

        const marksCell = document.createElement("td");
        marksCell.textContent = student.marks;

        const gradeCell = document.createElement("td");
        gradeCell.textContent = student.grade;

        row.appendChild(nameCell);
        row.appendChild(rollnocell);
        row.appendChild(subjectcell);
        row.appendChild(marksCell);
        row.appendChild(gradeCell);

        tbody.appendChild(row);
    }
}

// Handle form submission
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const rollno = document.getElementById("rollno").value;
    const subject = document.getElementById("subject").value;
    const marks = parseInt(document.getElementById("marks").value);

    if (name !== "" && !isNaN(marks)) {
        const grade = calculateGrade(marks);
        students.push({ name, rollno, subject, marks, grade });
        displayStudents();
        this.reset();
    } else {
        alert("Please enter valid details.");
    }
});