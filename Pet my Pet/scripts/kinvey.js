const kinvey = (() => {
  const BASE_URL = 'https://baas.kinvey.com/';
  const APP_KEY = 'kid_B15ytnht4'; // APP KEY HERE
  const APP_SECRET = '55b9f7b25be54e459dbdb18da7c29134'; // APP SECRET HERE

  function makeAuth(auth) {
    if (auth == 'basic') {
      return {
        'Authorization': `Basic ${btoa(APP_KEY + ':' + APP_SECRET)}`
      }
    } else {
      return {
        'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
      }
    }
  }

  function makeRequest(method, collection, endpoint, auth) {
    return {
      url: BASE_URL + collection + '/' + APP_KEY + '/' + endpoint,
      method,
      headers: makeAuth(auth)
    }
  }

  function post(collection, endpoint, auth, data) {
    let req = makeRequest('POST', collection, endpoint, auth);
    req.data = data;
    return $.ajax(req);
  }

  function get(collection, endpoint, auth) {
    return $.ajax(makeRequest('GET', collection, endpoint, auth));
  }

  function update(collection, endpoint, auth, data) {
    let req = makeRequest('PUT', collection, endpoint, auth);
    req.data = data;
    return $.ajax(req);
  }

  function remove(collection, endpoint, auth) {
    return $.ajax(makeRequest('DELETE', collection, endpoint, auth));
  }

  return {
    get,
    post,
    update,
    remove
  }
})()