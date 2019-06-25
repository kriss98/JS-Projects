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
    this.get('#/all-songs', handlers.getAllSongs);

    this.get('#/create', handlers.getCreateSong);
    this.post('#/create', handlers.createSong);

    this.get('#/like/:songId', handlers.likeSong);
    this.get('#/listen/:songId', handlers.listenToSong);
    this.get('#/delete/:songId', handlers.deleteSong);

    this.get('#/my-songs', handlers.getMySongs);
  });
  app.run();
});