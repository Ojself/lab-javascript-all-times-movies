clearArray = (str) => {
    var clear = str.split('h');
    clear = clear.join(" ").replace('min', '');
    clear = clear.split(" ");
    return clear;
}

turnHoursToMinutes = (movies) => {
 return movies.map((movie) => {
    const duration = clearArray(movie.duration);
    var newDuration = 0;
    if(duration.length != 1){
    const hour = duration[0]*60;
    const min = parseInt(duration[2]);
        if(duration.length === 2){
             newDuration = hour;
        }else{
            newDuration = hour+min;
        }
    }else{
        newDuration =  parseInt(duration[0]);
    }  
    return Object.assign({...movie, duration: newDuration});
});
}
ratesAverage = movies => {
    if(movies.length !=0){
 const moviesLen = movies.length;
 const sumRate =  movies.reduce((sum, movie) => {
     if(movie.rate === ""){
        return sum + 0;
     }else{
        return sum + parseFloat(movie.rate);
     }
     }
      ,0);
      const avgRate = sumRate/moviesLen;
    return parseFloat(avgRate.toFixed(2));
    }
}

dramaMoviesRate = movies => { 
    const drama = movies.filter((movie) => {
          if(movie.genre.includes('Drama')){
              return movie;
          }
      });
    return ratesAverage(drama);  
  }

orderByDuration = array => {
    return array.sort((a, b) => {
        if(a.duration - b.duration === 0){
            return  (a.title > b.title) || (a.title === b.title) -1;
        }else{
            return a.duration - b.duration;
        }
    });
}
howManyMovies = array => {
    if(array != 0){
        const stevenMovies = array.filter(movie => {
            if(movie.genre.includes('Drama'))
                if(movie.director.includes('Spielberg'))
                    return movie;         
        }).length;
        if(stevenMovies != 0){
            return `Steven Spielberg directed ${stevenMovies} drama movies!`;
        }else{
            return 'Steven Spielberg directed 0 drama movies!';  
        } 
    }     
} 
orderAlphabetically = array => {
    let twentyMovies = [];
    if(array != 0){
        const ordered = array.sort((a,b) => {
            return  (a.title > b.title) || (a.title === b.title) -1;
        }); 
        if(ordered.length > 20){
            for(let i = 0; i < 20; i++){
                twentyMovies.push(ordered[i].title);
            }
            return twentyMovies;
        }else{
           return ordered.map(movie => movie.title);
        }
        
    }else{
        return twentyMovies;
    }
} 


bestYearAvg = movies => {
    if(movies != 0){
    const years = movies.map(movie => movie.year).sort((a,b) => a-b);
    const yearsAvg = years.map(year => {
        return {
            year: year,
            avgRate: ratesAverage(movies.filter(movie => movie.year === year))
        }
    });
    yearsAvg.sort((a,b) => b.avgRate - a.avgRate);
    return `The best year was ${yearsAvg[0].year} with an average rate of ${yearsAvg[0].avgRate}`;
    }
}