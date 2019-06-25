const handlers = {};

$(() => {
  const app = Sammy('#site-content', function () {
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

    this.get('#/dashboard', handlers.getDashboard)
    this.get('#/dashboard/cats', handlers.getCats);
    this.get('#/dashboard/dogs', handlers.getDogs);
    this.get('#/dashboard/parrots', handlers.getParrots);
    this.get('#/dashboard/reptiles', handlers.getReptiles);
    this.get('#/dashboard/other', handlers.getOther);

    this.get('#/add', handlers.getCreate);
    this.post('#/add', handlers.createPet);

    this.get('#/my-pets', handlers.getMyPets);

    this.get('#/edit/:petId', handlers.editPet);
    this.post('#/edit/:petId', handlers.postEditPet);

    this.get('#/details/:petId', handlers.detailsPet);

    this.get('#/pet/:petId', handlers.petPet);

    this.get('#/delete/:petId', handlers.deletePet);
    this.post('#/delete/:petId', handlers.postDeletePet);
  });
  app.run();
});