import "./styles.css";
console.log();

const dropdownBtn = document.querySelector('.dropdown-button');
const sidebar = document.querySelector('aside');
const closeBtn = document.querySelector('.close-button');
const searchInput = document.querySelector('#location');
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('#search-button');
const tickBoxes = document.querySelectorAll('#tick-box');
const fahrenheit = document.querySelector('.fahrenheit');
const celsius = document.querySelector('.celsius');

sidebar.classList.add('hidden');
tickBoxes[1].setAttribute('id', 'active-setting');

dropdownBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

searchInput.addEventListener('focus', () => {
    searchBox.classList.add('active');
    searchBtn.setAttribute('id', 'active-button');
});

searchInput.addEventListener('blur', () => {
    searchBox.classList.remove('active');
    searchBtn.removeAttribute('id', 'active-button');
});

fahrenheit.addEventListener('click', () => {
    tickBoxes[0].setAttribute('id', 'active-button');
    tickBoxes[1].removeAttribute('id', 'active-button');
});
celsius.addEventListener('click', () => {
    tickBoxes[0].removeAttribute('id', 'active-button');
    tickBoxes[1].setAttribute('id', 'active-button');
});