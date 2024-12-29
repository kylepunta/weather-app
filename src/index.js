import "./styles.css";
console.log();

const dropdownBtn = document.querySelector('.dropdown-button');
const sidebar = document.querySelector('aside');
const closeBtn = document.querySelector('.close-button');

sidebar.classList.add('hidden');

dropdownBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});