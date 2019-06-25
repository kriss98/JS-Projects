const handlers = {}

$(() => {
  const app = Sammy('#main', function () {
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
    this.get('#/feed', handlers.getFeed);

    this.get('#/create', handlers.getCreate);
    this.post('#/create', handlers.create);

    this.get('#/edit/:memeId', handlers.edit);
    this.post('#/edit/:memeId', handlers.postEdit);

    this.get('#/delete/:memeId', handlers.deleteMeme);

    this.get('#/my-profile', handlers.getMyProfile);

    this.get('#/details/:memeId', handlers.getMemeDetails);
  });
  app.run();
});