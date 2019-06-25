handlers.getAllSongs = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        otherSong: '../templates/songs/otherSong.hbs',
        mySong: '../templates/songs/mySong.hbs'
    }).then(function () {
        let that = this;
        songService.loadAllSongs()
            .then(function (allSongs) {
                let otherSongs = allSongs
                    .filter(song => song._acl.creator !== sessionStorage.getItem('id'))
                    .sort((a, b) => b.likes - a.likes);

                let mySongs = allSongs
                    .filter(song => song._acl.creator === sessionStorage.getItem('id'))
                    .sort((a, b) => {
                        if (a.likes === b.likes) {
                            return b.listened - a.listened;
                        }

                        return b.likes - a.likes;
                    });

                ctx.otherSongs = otherSongs;
                ctx.mySongs = mySongs;
                that.partial('../templates/songs/all-songs.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.getCreateSong = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        this.partial('../../templates/songs/create.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

handlers.createSong = function (ctx) {
    let title = ctx.params.title;
    let artist = ctx.params.artist;
    let imageURL = ctx.params.imageURL;

    if (title.length < 6) {
        notify.showError('Title must be at least 6 characters long!');
        return;
    }

    if (artist.length < 3) {
        notify.showError('Artist must be at least 3 characters long!');
        return;
    }

    if (!imageURL.startsWith('http://') && !imageURL.startsWith('https://')) {
        notify.showError('ImageURL must start with either http:// or https://!');
        return;
    }

    songService.create(title, artist, imageURL).then((res) => {
        notify.showInfo('Song created successfully.');
        ctx.redirect('#/all-songs');
    }).catch(function (err) {
        notify.handleError(err);
    });
}

handlers.likeSong = function (ctx) {
    let songId = ctx.params.songId.substr(1);
    songService.getSong(songId)
        .then(function (song) {
            songService.edit(songId, song.title, song.artist, song.imageURL, Number(song.likes) + 1, song.listened).then(function () {
                notify.showInfo('Liked!');
                window.history.back();
            });
        });
}

handlers.listenToSong = function (ctx) {
    let songId = ctx.params.songId.substr(1);
    songService.getSong(songId)
        .then(function (song) {
            songService.edit(songId, song.title, song.artist, song.imageURL, song.likes, Number(song.listened) + 1).then(function () {
                notify.showInfo(`You just listened ${song.title}`);
                window.history.back();
            });
        });
}

handlers.deleteSong = function (ctx) {
    let songId = ctx.params.songId.substr(1);
    songService.deleteSong(songId).then(function () {
        notify.showInfo('Song removed successfully!');
        ctx.redirect(`#/all-songs`);
    });
}

handlers.getMySongs = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        mySong: '../templates/songs/mySong.hbs'
    }).then(function () {
        let that = this;
        songService.loadAllSongs()
            .then(function (allSongs) {
                let mySongs = allSongs
                    .filter(song => song._acl.creator === sessionStorage.getItem('id'))
                    .sort((a, b) => {
                        if (a.likes === b.likes) {
                            return b.listened - a.listened;
                        }

                        return b.likes - a.likes;
                    });

                ctx.mySongs = mySongs;
                that.partial('../templates/songs/my-songs.hbs');
            });
    }).catch(function (err) {
        console.log(err);
    });
}
