const userService = (() => {
  function isAuth() {
    return sessionStorage.getItem('authtoken') !== null;
  }

  function saveSession(res) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('id', res._id);
    sessionStorage.setItem('email', res.email);
    sessionStorage.setItem('avatarUrl', res.avatarUrl);
    sessionStorage.setItem('authtoken', res._kmd.authtoken);
  }

  function register(username, password, email, avatarUrl) {
    return kinvey.post('user', '', 'basic', {
      username,
      password,
      email,
      avatarUrl
    })
  }

  function login(username, password) {
    return kinvey.post('user', 'login', 'basic', {
      username,
      password
    });
  }

  function logout() {
    return kinvey.post('user', '_logout', 'kinvey');
  }

  function getUser(id){
    return kinvey.get('appdata', 'users/' + id, 'basic');
  }

  return {
    register,
    login,
    logout,
    saveSession,
    isAuth,
    getUser
  }
})()