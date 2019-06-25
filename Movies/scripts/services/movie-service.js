const movieService = (() => {
    function loadAllMovies() {
        return kinvey.get('appdata', 'movies', 'kinvey');
    }

    function create(title, description, imageURL, tickets, genres){
        let data = {
            title,
            description,
            imageURL,
            tickets,
            genres
        };

        return kinvey.post('appdata', 'movies', 'kinvey', data);
    }

    function getMovie(id){
        return kinvey.get('appdata', 'movies/' + id, 'kinvey');
    }

    function edit(id, title, description, imageURL, tickets, genres){
        let data = {
            title,
            description,
            imageURL,
            tickets,
            genres
        }
        return kinvey.update('appdata', 'movies/' + id, 'kinvey', data);
    }

    function deleteMovie(id){
        return kinvey.remove('appdata', 'movies/' + id, 'kinvey');
    }

    function buy(movie){
        return kinvey.update('appdata', 'movies/' + movie._id, 'kinvey', movie);
    }
  
    return {
      loadAllMovies,
      create,
      getMovie,
      edit,
      deleteMovie,
      buy
    }
  })()