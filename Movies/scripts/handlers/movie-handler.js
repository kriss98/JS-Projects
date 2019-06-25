handlers.getCinema = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
  
    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs',
      movie: '../templates/movies/movie.hbs'
    }).then(function () {
        let that = this;
        movieService.loadAllMovies()
            .then(function (allMovies) {
                ctx.movies = allMovies.sort((a, b) => b.tickets - a.tickets);
                that.partial('templates/movies/cinema.hbs');
            });
    }).catch(function (err) {
      console.log(err);
    });
}

handlers.getAddMovie = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        this.partial('../../templates/movies/add.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.addMovie = function (ctx) {
    let title = ctx.params.title;
    let description = ctx.params.description;
    let imageURL = ctx.params.imageUrl;
    let genres = ctx.params.genres.split(' ');
    let tickets = ctx.params.tickets;

    if(title.length < 6){
        notifications.showError("Title must be at least 6 characters long!");
        return;
    }

    if(description.length < 10){
        notifications.showError("Description must be at least 10 characters long!");
        return;
    }

    if(!imageURL.startsWith('https://') && !imageURL.startsWith('http://')){
        notifications.showError("Image URL must begin with either http:// ot https://!");
        return;
    }

    if(isNaN(tickets) || tickets === ""){
        notifications.showError("Tickets must be a number!");
        return;
    }

    movieService.create(title, description, imageURL, tickets, genres).then(() => {
        notifications.showSuccess('Movie created successfully.');
        ctx.redirect('#/');
    }).catch(function (err) {
        notifications.handleError(err);
    });
}

handlers.buyMovie = function (ctx) {
    let movieId = ctx.params.movieId.substr(1);
    movieService.getMovie(movieId)
        .then(function (movie) {
            if(movie.tickets < 1){
                notifications.showError('There are no available tickets for this movie!');
                window.history.back();
                return;
            }

            movie.tickets--;

            movieService.buy(movie).then(function () {
                notifications.showSuccess(`Successfully bought ticket for ${movie.title}!`);
                window.history.back();
            });
        });
}

handlers.getDetails = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
  
    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        let movieId = ctx.params.movieId.substr(1);
        movieService.getMovie(movieId)
            .then(function (movie) {
                ctx._id = movie._id;
                ctx.title = movie.title;
                ctx.description = movie.description;
                ctx.tickets = movie.tickets;
                ctx.imageURL = movie.imageURL;
                ctx.genres = movie.genres.join(' ');
                that.partial('templates/movies/movieDetails.hbs');
            });
    }).catch(function (err) {
      console.log(err);
    });
}

handlers.getMyMovies = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
  
    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs',
      myMovie: '../templates/movies/myMovie.hbs'
    }).then(function () {
        let that = this;
        movieService.loadAllMovies()
            .then(function (allMovies) {
                ctx.movies = allMovies
                    .filter(movie => movie._acl.creator === sessionStorage.getItem('_id'))
                    .sort((a, b) => b.tickets - a.tickets);
                that.partial('templates/movies/my-movies.hbs');
            });
    }).catch(function (err) {
      console.log(err);
    });
}

handlers.getEdit = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
  
    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        let movieId = ctx.params.movieId.substr(1);
        movieService.getMovie(movieId)
            .then(function (movie) {
                ctx.movieId = movie._id;
                ctx.title = movie.title;
                ctx.description = movie.description;
                ctx.tickets = movie.tickets;
                ctx.imageURL = movie.imageURL;
                ctx.genres = movie.genres.join(' ');
                that.partial('templates/movies/edit.hbs');
            });
    }).catch(function (err) {
      console.log(err);
    });
}

handlers.editMovie = function (ctx) {
    let title = ctx.params.title;
    let description = ctx.params.description;
    let imageURL = ctx.params.imageUrl;
    let genres = ctx.params.genres.split(' ');
    let tickets = ctx.params.tickets;
    let id = ctx.params.movieId.substr(1);

    if(title.length < 6){
        notifications.showError("Title must be at least 6 characters long!");
        return;
    }

    if(description.length < 10){
        notifications.showError("Description must be at least 10 characters long!");
        return;
    }

    if(!imageURL.startsWith('https://') && !imageURL.startsWith('http://')){
        notifications.showError("Image URL must begin with either http:// ot https://!");
        return;
    }

    if(isNaN(tickets) || tickets === ""){
        notifications.showError("Tickets must be a number!");
        return;
    }

    let that = this;

    movieService.edit(id, title, description, imageURL, tickets, genres).then(() => {
        notifications.showSuccess('Movie edited successfully.');
        that.redirect('#/cinema');
    }).catch(function (err) {
        notifications.handleError(err);
    });
}

handlers.getDelete = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
  
    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        let movieId = ctx.params.movieId.substr(1);
        movieService.getMovie(movieId)
            .then(function (movie) {
                ctx.movieId = movie._id;
                ctx.title = movie.title;
                ctx.description = movie.description;
                ctx.tickets = movie.tickets;
                ctx.imageURL = movie.imageURL;
                ctx.genres = movie.genres.join(' ');
                that.partial('templates/movies/delete.hbs');
            });
    }).catch(function (err) {
      console.log(err);
    });
}

handlers.deleteMovie = function (ctx) {
    let that = this;
    let id = ctx.params.movieId.substr(1);

    movieService.deleteMovie(id).then(() => {
        notifications.showSuccess('Movie removed successfully.');
        that.redirect('#/');
    }).catch(function (err) {
        notifications.handleError(err);
    });
}

