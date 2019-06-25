const petService = (() => {
    function loadPets() {
        return kinvey.get('appdata', 'pets', 'kinvey');
    }

    function createPet(name, description, imageURL, category) {
        let data = {
            name,
            description,
            imageURL,
            category,
            likes: 0
        }

        return kinvey.post('appdata', 'pets', 'kinvey', data);
    }

    function loadPetDetails(id){
        return kinvey.get('appdata', 'pets/' + id, 'kinvey');
    }

    function edit(petId, description, name, category, likes, imageURL){
        let data = {
            description,
            name,
            category,
            likes,
            imageURL    
        };

        return kinvey.update('appdata', 'pets/' + petId, 'kinvey', data);
    }

    function deletePet(petId){
        return kinvey.remove('appdata', 'pets/' + petId, 'kinvey');
    }

    return{
        loadPets,
        createPet,
        loadPetDetails,
        edit,
        deletePet
    }
  })();