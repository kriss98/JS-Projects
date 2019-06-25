handlers.getCreate = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        this.partial('../../templates/pets/create.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.createPet = function (ctx) {
    let name = ctx.params.name;
    let description = ctx.params.description;
    let imageURL = ctx.params.imageURL;
    let category = ctx.params.category;
    petService.createPet(name, description, imageURL, category).then(() => {
        notifications.showSuccess('Pet created.');
        ctx.redirect('#/my-pets');
    }).catch(function (err) {
        notifications.showError(err.responseJSON.description);
    });
}

handlers.getMyPets = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        myPet: '../templates/pets/myPet.hbs'
    }).then(function () {
        let that = this;
        petService.loadPets()
            .then(function (myPets) {
                ctx.myPets = myPets
                    .filter(pet => pet._acl.creator === sessionStorage.getItem('id'));
                that.partial('../templates/pets/my-pets.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.editPet = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    const petId = ctx.params.petId.substr(1);

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        petService.loadPetDetails(petId)
            .then(function (petInfo) {
                ctx.petId = petId;
                ctx.name = petInfo.name;
                ctx.description = petInfo.description;
                ctx.imageURL = petInfo.imageURL;
                ctx.likes = petInfo.likes;

                that.partial('./templates/pets/edit.hbs');
            });
    });
}

handlers.postEditPet = function (ctx) {
    let petId = ctx.params.petId.substr(1);
    let description = ctx.params.description;

    let that = this;
    petService.loadPets()
        .then(function (pets) {
            let pet = pets.filter(pet => pet._id === petId)[0];
            petService.edit(petId, description, pet.name, pet.category, pet.likes, pet.imageURL)
                .then(function () {
                    notifications.showSuccess("Updated successfully!");
                    that.redirect(`#/dashboard`);
                });
        });
}

handlers.detailsPet = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    const petId = ctx.params.petId.substr(1);

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        petService.loadPetDetails(petId)
            .then(function (petInfo) {
                ctx.petId = petId;
                ctx.name = petInfo.name;
                ctx.description = petInfo.description;
                ctx.imageURL = petInfo.imageURL;
                ctx.likes = petInfo.likes;

                that.partial('./templates/pets/detailsOtherPet.hbs');
            });
    });
}

handlers.petPet = function (ctx) {
    let petId = ctx.params.petId.substr(1);
    petService.loadPets()
        .then(function (pets) {
            let pet = pets.filter(pet => pet._id === petId)[0];
            petService.edit(petId, pet.description, pet.name, pet.category, Number(pet.likes) + 1, pet.imageURL).then(function () {
                window.history.back();
            });
        });
}

handlers.deletePet = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    const petId = ctx.params.petId.substr(1);

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        petService.loadPetDetails(petId)
            .then(function (petInfo) {
                ctx.petId = petId;
                ctx.name = petInfo.name;
                ctx.description = petInfo.description;
                ctx.imageURL = petInfo.imageURL;
                ctx.likes = petInfo.likes;

                that.partial('./templates/pets/delete.hbs');
            });
    });
}

handlers.postDeletePet = function (ctx) {
    let petId = ctx.params.petId.substr(1);
    petService.deletePet(petId).then(function (){
        notifications.showSuccess('Pet removed successfully!');
        ctx.redirect(`#/dashboard`);
    });
}