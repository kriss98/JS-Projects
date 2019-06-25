const memeService = (() => {
    function loadAllMemes() {
        return kinvey.get('appdata', 'memes', 'kinvey');
    }

    function create(title, description, imageUrl){
        let data = {
            title,
            description,
            imageUrl,
            creator: sessionStorage.getItem('username')
        };

        return kinvey.post('appdata', 'memes', 'kinvey', data);
    }

    function getMeme(id){
        return kinvey.get('appdata', 'memes/' + id, 'kinvey');
    }

    function edit(id, description, title, imageUrl){
        let data = {
            title,
            description,
            imageUrl,
            creator: sessionStorage.getItem('username')
        };

        return kinvey.update('appdata', 'memes/' + id, 'kinvey', data);
    }

    function deleteMeme(id){
        return kinvey.remove('appdata', 'memes/' + id, 'kinvey');
    }

    return {
        loadAllMemes,
        create,
        getMeme,
        edit,
        deleteMeme
    }
})()