const carService = (() => {
    function getAllCars(){
        return kinvey.get('appdata', 'cars', 'kinvey');
    }

    function create(title, description, brand, model, year, imageUrl, fuelType, price){
        let data = {
            title,
            description,
            brand,
            model,
            year,
            imageUrl,
            fuel: fuelType,
            price,
            seller: sessionStorage.getItem('username')
        };

        return kinvey.post('appdata', 'cars', 'kinvey', data);
    }

    function getCar(id){
        return kinvey.get('appdata', 'cars/' + id, 'kinvey');
    }

    function edit(id, title, description, brand, model, year, imageUrl, fuelType, price){
        let data = {
            title,
            description,
            brand,
            model,
            year,
            imageUrl,
            fuel: fuelType,
            price,
            seller: sessionStorage.getItem('username')
        };

        return kinvey.update('appdata', 'cars/' + id, 'kinvey', data);
    }

    function deleteCar(id){
        return kinvey.remove('appdata', 'cars/' + id, 'kinvey');
    }
  
    return {
      getAllCars,
      create,
      getCar,
      edit,
      deleteCar
    }
  })()