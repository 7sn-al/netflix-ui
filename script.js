const genres = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  scienceFiction: 878,
  tvMovie: 10770,
  thriller: 53,
  war: 10752,
  western: 37
};

const tvGenres = {
  actionAdventure: 10759,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  kids: 10762,
  mystery: 9648,
  news: 10763,
  reality: 10764,
  sciFiFantasy: 10765,
  soap: 10766,
  talk: 10767,
  warPolitics: 10768,
  western: 37
};



window.addEventListener('DOMContentLoaded', () => {

const defaultPage= function(){
  showMovies(MOVIELINK, '#row1 .grid-wrapper'); 
showMovies(GENRELINK('action'), '#row2 .grid-wrapper');
showMovies(GENRELINK('comedy') ,'#row3 .grid-wrapper');
showMovies(GENRELINK('horror'), '#row4 .grid-wrapper');

showMovies(TVLINK, '#row5 .grid-wrapper'); 
showMovies(TVGENRELINK('actionAdventure'), '#row6 .grid-wrapper');
showMovies(TVGENRELINK('comedy') ,'#row7 .grid-wrapper');
showMovies(TVGENRELINK('animation'), '#row8 .grid-wrapper');
}

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

  const MOVIELINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=61a8d5b0281dfd932f4e3a6339f7e6be&page=1';
  const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
  const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=61a8d5b0281dfd932f4e3a6339f7e6be&query=';
  const TVSEARCHAPI = 'https://api.themoviedb.org/3/search/tv?api_key=61a8d5b0281dfd932f4e3a6339f7e6be&query=';
  const TVLINK = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=61a8d5b0281dfd932f4e3a6339f7e6be&page=1';
 
  const GENRELINK = function(genre){
    return `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=${genres[genre]}&api_key=61a8d5b0281dfd932f4e3a6339f7e6be&page=1`;
  }

  const TVGENRELINK = function(genre){
  return `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&with_genres=${tvGenres[genre]}&api_key=61a8d5b0281dfd932f4e3a6339f7e6be&page=1`;
}

showMovies(TVGENRELINK("actionAdventure"), "#row6 .grid-wrapper");

  
     
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

 defaultPage();

const input=document.querySelector('.site-search');

input.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const query = input.value.trim();
        if(query){
          showMovies(SEARCHAPI + query, '#row1 .grid-wrapper');

          const rows = document.querySelectorAll('.row-container');
          rows.forEach(row => row.style.display = "none");

          const row1 = document.querySelector('#row1');
          row1.style.display = "";

          const row5 = document.querySelector('#row5');
          row5.style.display = "";
          showMovies(TVSEARCHAPI + query , '#row5 .grid-wrapper');
          input.value='';

         }
         else if(!query){
          defaultPage();
          rows.forEach(row=> row.style.display='')
         }
    }
  }
);

});


