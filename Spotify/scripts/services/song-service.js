const songService = (() => {
    function create(title, artist, imageURL){
        let data = {
            title,
            artist,
            imageURL,
            likes: 0,
            listened: 0
        };

        return kinvey.post('appdata', 'songs', 'kinvey', data);
    }

    function loadAllSongs(){
        return kinvey.get('appdata', 'songs', 'kinvey');
    }

    function getSong(id){
        return kinvey.get('appdata', 'songs/' + id, 'kinvey');
    }

    function edit(songId, title, artist,imageURL, likes,listened){
        let data = {
            title, 
            artist, 
            imageURL, 
            likes, 
            listened
        }

        return kinvey.update('appdata', 'songs/' + songId, 'kinvey', data);
    }

    function deleteSong(songId){
        return kinvey.remove('appdata', 'songs/' + songId, 'kinvey');
    }
  
    return {
      create,
      loadAllSongs,
      getSong,
      edit,
      deleteSong
    }
  })()