const handlers = {}

$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');
    // home page routes
    this.get('/index.html', handlers.getHome);
    this.get('/', handlers.getHome);
    this.get('#/home', handlers.getHome);

    // user routes
    this.get('#/register', handlers.getRegister);
    this.get('#/login', handlers.getLogin);

    this.post('#/register', handlers.registerUser);
    this.post('#/login', handlers.loginUser);
    this.get('#/logout', handlers.logoutUser);

    // ADD YOUR ROUTES HERE
    this.get('#/cinema', handlers.getCinema);

    this.get('#/add', handlers.getAddMovie);
    this.post('#/add', handlers.addMovie);

    this.get('#/buy/:movieId', handlers.buyMovie);

    this.get('#/details/:movieId', handlers.getDetails);

    this.get('#/my-movies', handlers.getMyMovies);

    this.get('#/edit/:movieId', handlers.getEdit);
    this.post('#/edit/:movieId', handlers.editMovie);

    this.get('#/delete/:movieId', handlers.getDelete);
    this.post('#/delete/:movieId', handlers.deleteMovie);
  });
  app.run();
});