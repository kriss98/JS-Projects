handlers.getDashboard = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        otherPet: '../templates/pets/otherPet.hbs'
    }).then(function () {
        let that = this;
        petService.loadPets()
            .then(function (otherPets){
                ctx.otherPets = otherPets
                .filter(pet => pet._acl.creator !== sessionStorage.getItem('id'))
                .sort((a, b) => b.likes - a.likes);
                that.partial('../templates/dashboard/dashboard.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.getCats = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        otherPet: '../templates/pets/otherPet.hbs'
    }).then(function () {
        let that = this;
        petService.loadPets()
            .then(function (otherPets){
                ctx.otherPets = otherPets
                    .filter(pet => pet._acl.creator !== sessionStorage.getItem('id') && pet.category === 'Cat')
                    .sort((a, b) => b.likes - a.likes);
                that.partial('../templates/dashboard/dashboard.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.getDogs = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        otherPet: '../templates/pets/otherPet.hbs'
    }).then(function () {
        let that = this;
        petService.loadPets()
            .then(function (otherPets){
                ctx.otherPets = otherPets
                    .filter(pet => pet._acl.creator !== sessionStorage.getItem('id') && pet.category === 'Dog')
                    .sort((a, b) => b.likes - a.likes);
                that.partial('../templates/dashboard/dashboard.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.getParrots = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        otherPet: '../templates/pets/otherPet.hbs'
    }).then(function () {
        let that = this;
        petService.loadPets()
            .then(function (otherPets){
                ctx.otherPets = otherPets
                    .filter(pet => pet._acl.creator !== sessionStorage.getItem('id') && pet.category === 'Parrot')
                    .sort((a, b) => b.likes - a.likes);
                that.partial('../templates/dashboard/dashboard.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.getReptiles = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        otherPet: '../templates/pets/otherPet.hbs'
    }).then(function () {
        let that = this;
        petService.loadPets()
            .then(function (otherPets){
                ctx.otherPets = otherPets
                    .filter(pet => pet._acl.creator !== sessionStorage.getItem('id') && pet.category === 'Reptile')
                    .sort((a, b) => b.likes - a.likes);
                that.partial('../templates/dashboard/dashboard.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.getOther = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        otherPet: '../templates/pets/otherPet.hbs'
    }).then(function () {
        let that = this;
        petService.loadPets()
            .then(function (otherPets){
                ctx.otherPets = otherPets
                    .filter(pet => pet._acl.creator !== sessionStorage.getItem('id') && pet.category === 'Other')
                    .sort((a, b) => b.likes - a.likes);
                that.partial('../templates/dashboard/dashboard.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}