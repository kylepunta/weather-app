import "./styles.css";
console.log();

const dropdownBtn = document.querySelector('.dropdown-button');
const sidebar = document.querySelector('aside');
const closeBtn = document.querySelector('.close-button');
const searchInput = document.querySelector('#location');
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('#search-button');

sidebar.classList.add('hidden');

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