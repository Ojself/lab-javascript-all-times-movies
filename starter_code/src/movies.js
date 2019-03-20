 function turnHoursToMinutes(mov){
  var newMovies = mov.map(function(movie){
    var duration = movie.duration;
    var indexhours = duration.indexOf('h');
    var hours = 0;
    var minutes = 0;
    if(indexhours != -1){
      hours = duration.slice(0,indexhours);
      hours = hours * 60;
    }
    var indexminutes=duration.indexOf('m');
    if(indexminutes != -1 && indexhours != -1)
      minutes = duration.slice(indexhours+2,indexminutes);
    if(indexminutes != -1 && indexhours == -1)
      minutes = duration.slice(0,indexminutes);
    var copy = Object.assign({}, movie);
    var totalminutes = parseInt(hours) + parseInt(minutes);
    copy.duration = totalminutes;
    
    return copy;
  });
  
    return newMovies;
}

function ratesAverage(mov){
  var sum = 0;
  
  mov.forEach(function(movie){
    if(isNaN(parseFloat(movie.rate)))
      sum+=0;
    else
      sum+=parseFloat(movie.rate);
  });
  return sum/mov.length;
  
}
function dramaMoviesRate(mov){
  var newMoviesDrama = mov
                      .filter(movie => (movie.genre
                      .filter(genre => genre === 'Drama')).length>0);
  if(newMoviesDrama.length > 0)
    return parseFloat(ratesAverage(newMoviesDrama).toFixed(2));
}

// How many movies did STEVEN SPIELBERG
function howManyMovies (movies){
  if (movies.length === 0) return undefined;
    var spielbergMovies = movies.filter(function(el){
      return el.genre.includes('Drama') && el.director.includes('Steven Spielberg')
    });
    
    console.log("length", spielbergMovies.length)
    console.log("this one",spielbergMovies)
    console.log(`Steven Spielberg directed ${spielbergMovies.length} drama movies!`)
    return `Steven Spielberg directed ${spielbergMovies.length} drama movies!`
  }
console.log(howManyMovies(movies));



