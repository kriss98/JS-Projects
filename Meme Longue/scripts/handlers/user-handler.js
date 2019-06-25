handlers.getRegister = function (ctx) {
  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs'
  }).then(function () {
    this.partial('../../templates/users/register.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getLogin = function (ctx) {
  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs'
  }).then(function () {
    this.partial('../../templates/users/login.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.registerUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;
  let repeatPass = ctx.params.repeatPass;
  let email = ctx.params.email;
  let avatarUrl = ctx.params.avatarUrl;

  if (!/^[A-Za-z]{3,}$/g.test(username)) {
    notifications.showError('Username must be at least 3 characters long and contain only english alphabet letters!');
    return;
  }

  if (!/^[A-Za-z0-9]{6,}$/g.test(username)) {
    notifications.showError('Password must be at least 3 characters long and contain only english alphabet letters or digits!');
    return;
  }

  if (password !== repeatPass) {
    notifications.showError('Passwords do not match!');
    return;
  }

  userService.register(username, password, email, avatarUrl).then((res) => {
    userService.saveSession(res);
    notifications.showInfo('User registration successful.');
    ctx.redirect('#/feed');
  }).catch(function (err) {
    notifications.handleError(err);
  });
}

handlers.logoutUser = function (ctx) {
  userService.logout().then(() => {
    sessionStorage.clear();
    notifications.showInfo('Logout successful.');
    ctx.redirect('#/home');
  })
}

handlers.loginUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;

  userService.login(username, password).then((res) => {
    userService.saveSession(res);
    notifications.showInfo('Login successful.');
    ctx.redirect('#/feed');
  }).catch(function (err) {
    notifications.showError(err.responseJSON.description);
  });
}

handlers.getMyProfile = function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs',
    userMeme: '../templates/memes/user-meme.hbs'
  }).then(function () {
    let that = this;

    memeService.loadAllMemes()
      .then(function (allMemes) {
        let usermemes = allMemes.filter(meme => meme.creator === ctx.username);
        ctx.memes = usermemes;
        that.partial('../templates/users/my-profile.hbs');
      });
  }).catch(function (err) {
    console.log(err);
  });
}