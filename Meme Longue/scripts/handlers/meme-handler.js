handlers.getFeed = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        meme: '../templates/memes/meme.hbs'
    }).then(function () {
        let that = this;
        memeService.loadAllMemes()
            .then(function (allMemes) {
                allMemes.map(meme => meme.isCreator = meme.creator === sessionStorage.getItem('username'));
                ctx.memes = allMemes;
                that.partial('../templates/memes/feed.hbs');
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
        this.partial('../../templates/memes/create.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.create = function (ctx) {
    let title = ctx.params.title;
    let description = ctx.params.description;
    let imageUrl = ctx.params.imageUrl;


    if (title.length > 33) {
        notifications.showError('Title must not be more than 33 characters long!');
        return;
    }

    if (description.length >= 30 && description <= 450) {
        notifications.showError('Description length must be between 30 and 450 characters!');
        return;
    }

    if (!imageUrl.startsWith('http')) {
        notifications.showError('Image URL must start with http!');
        return;
    }

    memeService.create(title, description, imageUrl).then((res) => {
        notifications.showInfo('meme created.');
        ctx.redirect('#/feed');
    }).catch(function (err) {
        notifications.handleError(err);
    });
}

handlers.edit = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    const memeId = ctx.params.memeId.substr(1);

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        memeService.getMeme(memeId)
            .then(function (memeInfo) {
                ctx.memeId = memeId;
                ctx.title = memeInfo.title;
                ctx.description = memeInfo.description;
                ctx.imageUrl = memeInfo.imageUrl;

                that.partial('./templates/memes/edit.hbs');
            });
    });
}

handlers.postEdit = function (ctx) {
    let memeId = ctx.params.memeId.substr(1);
    let description = ctx.params.description;
    let title = ctx.params.title;
    let imageUrl = ctx.params.imageUrl;

    let that = this;
    memeService.edit(memeId, description, title, imageUrl)
        .then(function () {
            notifications.showInfo(`Meme ${title} updated!`);
            that.redirect(`#/feed`);
        });

}

handlers.deleteMeme = function (ctx) {
    let memeId = ctx.params.memeId.substr(1);
    memeService.deleteMeme(memeId).then(function () {
        notifications.showInfo('Meme deleted.');
        ctx.redirect(`#/feed`);
    });
}

handlers.getMemeDetails = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    const memeId = ctx.params.memeId.substr(1);

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        let that = this;
        memeService.getMeme(memeId)
            .then(function (memeInfo) {
                ctx.memeId = memeId;
                ctx.title = memeInfo.title;
                ctx.description = memeInfo.description;
                ctx.imageUrl = memeInfo.imageUrl;
                ctx.creator = memeInfo.creator;

                that.partial('./templates/memes/meme-details.hbs');
            });
    });
}