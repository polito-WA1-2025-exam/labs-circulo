import dayjs from 'dayjs';

function User(username, isAuth, cart = [], reservations = [], allergies = []) {
    this.username = username
    this.isAuth = isAuth
    this.cart = cart //list of all the bags that the user has added to the cart
    this.reservations = reservations //list of all the bags that the user has reserved
    this.allergies = allergies //allergies of the user

    this.login = function () {
        //TODO: Implement login
    }

    this.confirmOrder = function () {
        const allAvailable = this.cart.every(bag => bag.status === 'available')
        if (allAvailable) {
            this.cart.map(bag => bag.status = 'reserved')
            this.reservations.push(...this.cart)
        } else {
            console.log('Some bags are not available')
        }
    }

    this.addBagToCart = function (bag) {
        
        const existingBag = this.cart.find(item => item.establishmentId === bag.establishmentId)

        if (!existingBag) {
            this.cart.push({
                bag: bag,
                removedFood: [],
                specialRequests: []
            })
        }
    }

    this.removeBagFromCart = function (bagID) {

        const index = this.cart.findIndex(bag => bag.bagID === bagID)
        if (index >= 0) {
            this.cart.splice(index, 1)
        }
    }

    this.addRemovedFood = function (bagID, food_name) {
        const bag = this.cart.find(item => item.bag.bagID === bagID)
        if (bag && bag.type === 'regular') {
            if (bag.removedFood.length < 2) {
                bag.removedFood.push(food_name)
            }
        }
    }

    this.deleteRemovedFood = function (bagID, food_name) {
        const bag = this.cart.find(item => item.bag.bagID === bagID)
        if (bag && bag.type === 'regular') {
            const index = bag.removedFood.findIndex(food => food === food_name)
            if (index >= 0) {
                bag.removedFood.splice(index, 1)
            }
        }
    }
}


function Bag(bagID, type, size, content = [], price, establishmentId, timeRange, status = 'available') {
    this.bagID = bagID
    this.type = type //(surprise, regular)
    this.size = size
    this.content = content //list[food, quantity]
    this.price = price
    this.establishmentId = establishmentId
    this.timeRange = timeRange //{start, end}
    this.status = status //(available, reserved)

    this.isValidRange = function () {
        return dayjs(timeRange.start).isbefore(dayjs())
    }
}

function Establishment(id, name, type, address, phone, toc, bags = []) {
    this.id = id
    this.name = name
    this.type = type //(store, restaurant)
    this.address = address
    this.phone = phone
    this.toc = toc //type of cuisine
    this.bags = bags //list of bags that the establishment has

    this.addBagToEstablishment = function (bag) {
        this.bags.push(bag)
    }

    this.removeBagFromEstablishment = function (bagID) {
        const index = this.bags.findIndex(bag => bag.bagID === bagID)
        if (index >= 0) {
            this.bags.splice(index, 1)
        }
    }
}