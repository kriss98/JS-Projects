handlers.getAllListings = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        car: '../templates/cars/car.hbs'
    }).then(function () {
        let that = this;
        carService.getAllCars()
            .then(function (cars) {
                cars.map(car => car.isCreator = car.seller === sessionStorage.getItem('username'));
                ctx.cars = cars;
                that.partial('../templates/cars/all-listings.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.getCreate = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        this.partial('../templates/cars/create.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.create = function (ctx) {
    let title = ctx.params.title;
    let description = ctx.params.description;
    let brand = ctx.params.brand;
    let model = ctx.params.model;
    let year = ctx.params.year;
    let imageUrl = ctx.params.imageUrl;
    let fuelType = ctx.params.fuelType;
    let price = ctx.params.price;

    if (title.length > 33) {
        notifications.showError('Title must be less than 33 characters long.');
        return;
    }

    if (description.length < 30 || description.length > 450) {
        notifications.showError('Description lenght must be between 30 and 450 characters.');
        return;
    }

    if (brand.length > 11) {
        notifications.showError('Brand must be less than 11 characters long.');
        return;
    }

    if (fuelType.length > 11) {
        notifications.showError('Fuel Type must be less than 11 characters long.');
        return;
    }

    if (model.length < 4 || model.length > 11) {
        notifications.showError('Model must be between 4 and 11 characters long.');
        return;
    }

    if (year.length !== 4) {
        notifications.showError('Year not valid!');
        return;
    }

    if (price > 1000000) {
        notifications.showError('Invalid price!');
        return;
    }

    if (!imageUrl.startsWith('http')) {
        notifications.showError('Image URL must start with http!');
        return;
    }

    carService.create(title, description, brand, model, year, imageUrl, fuelType, price).then(() => {
        notifications.showSuccess('listing created.');
        ctx.redirect('#/all-listings');
    }).catch(function (err) {
        notifications.showError(err.responseJSON.description);
    });
}

handlers.getEdit = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let carId = ctx.params.carId.substr(1);

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        carService.getCar(carId)
            .then(function (car) {
                ctx.carId = carId;
                ctx.title = car.title;
                ctx.description = car.description;
                ctx.brand = car.brand;
                ctx.year = car.year;
                ctx.price = car.price;
                ctx.fuel = car.fuel;
                ctx.model = car.model;
                ctx.imageUrl = car.imageUrl;
                that.partial('../templates/cars/edit.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.edit = function (ctx) {
    let title = ctx.params.title;
    let description = ctx.params.description;
    let brand = ctx.params.brand;
    let model = ctx.params.model;
    let year = ctx.params.year;
    let imageUrl = ctx.params.imageUrl;
    let fuelType = ctx.params.fuelType;
    let price = ctx.params.price;
    let id = ctx.params.carId.substr(1);

    if (title.length > 33) {
        notifications.showError('Title must be less than 33 characters long.');
        return;
    }

    if (description.length < 30 || description.length > 450) {
        notifications.showError('Description lenght must be between 30 and 450 characters.');
        return;
    }

    if (brand.length > 11) {
        notifications.showError('Brand must be less than 11 characters long.');
        return;
    }

    if (fuelType.length > 11) {
        notifications.showError('Fuel Type must be less than 11 characters long.');
        return;
    }

    if (model.length < 4 || model.length > 11) {
        notifications.showError('Model must be between 4 and 11 characters long.');
        return;
    }

    if (year.length !== 4) {
        notifications.showError('Year not valid!');
        return;
    }

    if (price > 1000000) {
        notifications.showError('Invalid price!');
        return;
    }

    if (!imageUrl.startsWith('http')) {
        notifications.showError('Image URL must start with http!');
        return;
    }

    let that = this;

    carService.edit(id, title, description, brand, model, year, imageUrl, fuelType, price).then(function () {
        notifications.showSuccess(`Listing ${title} updated.`);
        that.redirect('#/all-listings');
    }).catch(function (err) {
        notifications.showError(err.responseJSON.description);
    });
}

handlers.deleteCar = function (ctx) {
    let carId = ctx.params.carId.substr(1);
    console.log(carId)
    carService.deleteCar(carId).then(function () {
        notifications.showSuccess('Car deleted.');
        ctx.redirect(`#/all-listings`);
    });
}

handlers.getMyListings = function (ctx){
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        myCar: '../templates/cars/myCar.hbs'
    }).then(function () {
        let that = this;
        carService.getAllCars()
            .then(function (cars) {
                ctx.cars = cars.filter(car => car.seller === sessionStorage.getItem('username'));
                console.log(ctx.cars);
                that.partial('../templates/cars/my-listings.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.getDetails = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let carId = ctx.params.carId.substr(1);

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        carService.getCar(carId)
            .then(function (car) {
                ctx.carId = carId;
                ctx.title = car.title;
                ctx.description = car.description;
                ctx.brand = car.brand;
                ctx.year = car.year;
                ctx.price = car.price;
                ctx.fuel = car.fuel;
                ctx.model = car.model;
                ctx.imageUrl = car.imageUrl;
                ctx.isCreator = car.seller === sessionStorage.getItem('username');
                that.partial('../templates/cars/details.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}