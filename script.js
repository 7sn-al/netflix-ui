window.addEventListener('DOMContentLoaded', () => {
const header = document.querySelector('.header');
  window.addEventListener('scroll', function(){
    if (window.scrollY > 50) { 
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const search=document.querySelector('.search');

  search.addEventListener('click',function(){
    const showSearch=document.querySelector('.site-search')
     showSearch.classList.toggle('active');
     if (showSearch.classList.contains('active')) {
    showSearch.focus();
     }
  });

  const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=61a8d5b0281dfd932f4e3a6339f7e6be&page=1';
  const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
  const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=61a8d5b0281dfd932f4e3a6339f7e6be&query=';

  const main=document.querySelector('.grid-wrapper');

  function showMovies(url, selector) {
  const main = document.querySelector(selector);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      main.innerHTML = '';
      data.results.forEach(movie => {
        const div_card = document.createElement('div');
        div_card.classList.add('box');

        const image = document.createElement('img');
        image.classList.add('poster');
        image.src = movie.poster_path ? IMG_PATH + movie.poster_path : 'placeholder.png';

        div_card.appendChild(image);
        main.appendChild(div_card);
      });
    });
}

  

const rows = document.querySelectorAll('.row-container');

rows.forEach(row => {
  const leftArrow = row.querySelector('.arrow.left');
  const rightArrow = row.querySelector('.arrow.right');
  const wrapper = row.querySelector('.grid-wrapper');

  const scrollAmount = 600;

  rightArrow.addEventListener('click', () => {
    wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  leftArrow.addEventListener('click', () => {
    wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
});

showMovies(APILINK, '#row1 .grid-wrapper'); 
showMovies(SEARCHAPI + 'action', '#row2 .grid-wrapper');
showMovies(SEARCHAPI + 'comedy', '#row3 .grid-wrapper');
showMovies(SEARCHAPI + 'horror', '#row4 .grid-wrapper');


});
