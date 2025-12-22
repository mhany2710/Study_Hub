// Welcome message animation
window.addEventListener('load', () => {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    setTimeout(() => {
        welcomeOverlay.classList.add('hidden');
    }, 3000);
});

// Sidebar toggle
const navToggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');
const body = document.body;

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('open');
    body.classList.toggle('no-scroll');
});

document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !navToggle.contains(e.target)) {
        sidebar.classList.remove('open');
        body.classList.remove('no-scroll');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                body.classList.remove('no-scroll');
            }
        }
    });
});

// GPA Calculator
let courses = [];
const gradingSystem = "old";

function updateGradeOptions() {
    const gradeSelect = document.getElementById("grade");
    gradeSelect.innerHTML = "";
    const grades = ["A+", "A", "B+", "B", "C+", "C", "D+", "D", "F"];

    for (const grade of grades) {
        const option = document.createElement("option");
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
    }
}

if (localStorage.getItem("courses")) {
    courses = JSON.parse(localStorage.getItem("courses"));
}

function addCourse() {
    const gradeSelect = document.getElementById("grade");
    const courseNameInput = document.getElementById("courseName");

    if (gradeSelect.value === "") return;

    const course = {
        name: courseNameInput.value || `المادة ${courses.length + 1}`,
        grade: gradeSelect.value,
        gpa: calculateGPA(gradeSelect.value),
    };

    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
    courseNameInput.value = "";
    gradeSelect.value = "";

    displayCourses();
}

function calculateGPA(grade) {
    const gradePoints = {
        "A+": 4.0, "A": 3.75, "B+": 3.5, "B": 3.0,
        "C+": 2.5, "C": 2.0, "D+": 1.5, "D": 1.0, "F": 0
    };
    return gradePoints[grade] || 0;
}

function displayCourses() {
    const courseList = document.getElementById("courseList");
    const gpaElement = document.getElementById("gpa");
    courseList.innerHTML = "";

    let totalGPA = 0;
    courses.forEach((course, index) => {
        totalGPA += course.gpa;
        const li = document.createElement("li");
        li.innerHTML = `
                <span>${course.name} - ${course.grade}</span>
                <button onclick="removeCourse(${index})">حذف</button>
            `;
        courseList.appendChild(li);
    });

    const averageGPA = courses.length > 0 ? (totalGPA / courses.length).toFixed(2) : 0;
    gpaElement.textContent = averageGPA;
}

function removeCourse(index) {
    courses.splice(index, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses();
}

updateGradeOptions();
displayCourses();