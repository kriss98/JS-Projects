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
    this.get('#/all-listings', handlers.getAllListings);

    this.get('#/create', handlers.getCreate);
    this.post('#/create', handlers.create);

    this.get('#/edit/:carId', handlers.getEdit);
    this.post('#/edit/:carId', handlers.edit);

    this.get('#/delete/:carId', handlers.deleteCar);

    this.get('#/my-listings', handlers.getMyListings);

    this.get('#/details/:carId', handlers.getDetails);
  });
  app.run();
});