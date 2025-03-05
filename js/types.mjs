function User(username, isAuth, cart = [], reservations = [], allergies = []){
    this.username = username
    this.isAuth = isAuth 
    this.cart = cart //list of all the bags that the user has added to the cart
    this.reservations = reservations //list of all the bags that the user has reserved
    this.allergies = allergies //allergies of the user

    this.login = function(){
        //TODO: Implement login
    }

    this.confirmOrder = function(){
        //TODO: Implement confirmOrder
    }

    this.addBagToCart = function(bagID){
        //TODO: Implement addBagToCart
    }

    this.removeBagFromCart = function(bagID){
        //TODO: Implement removeBagFromCart
    }

    this.addRemovedFood =  function(bagID, food_name){
        //TODO: Implement addRemovedFood
    }

    this.deleteRemovedFood = function(bagID, food_name){
        //TODO: Implement deleteRemovedFood
    }
}


function Bag(bagID, type, size, content = [], price, establishmentId, timeRange, status = 'available'){
    this.bagID = bagID
    this.type = type //(surprise, regular)
    this.size = size 
    this.content = content //list[food, quantity]
    this.price = price
    this.establishmentId = establishmentId
    this.timeRange = timeRange //{start, end}
    this.status = status //(available, reserved)
   
    this.isValidRange = function(){
        //TODO: Implement isValidRange
    }
}

function Establishment(id, name, type, address, phone, toc){
    this.id = id
    this.name = name
    this.type = type //(store, restaurant)
    this.address = address
    this.phone = phone
    this.toc = toc //type of cuisine
}