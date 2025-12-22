// Sidebar toggle logic
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