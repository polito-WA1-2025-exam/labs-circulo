import sqlite from 'sqlite3'

const db = new sqlite.Database('db/food.sqlite')

/*
CREATE TABLE User
(
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    name VARHCAR(50) NOT NULL,
    password VARCHAR(256) NOT NULL
)

CREATE TABLE Allergy
(
    username VARCHAR(50) NOT NULL,
    allergy VARCHAR(50) NOT NULL,
    PRIMARY KEY (username, allergy),
    FOREIGN KEY username REFERENCES User(username)
)

CREATE TABLE Establishment
(
    establishmentID INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    address VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    toc VARCHAR(20) NOT NULL
)

CREATE TABLE Bag
(
    bagID INTEGER NOT NULL PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    price FLOAT NOT NULL,
    startTime TEXT,
    endTime TEXT,
    establishmentID INTEGER NOT NULL,
    FOREIGN KEY establishmentID REFERENCES Establishment(establishmentID)
)

CREATE TABLE BagContent
(
    bagID INTEGER NOT NULL,
    foodName VARCHAR(50) NOT NULL,
    qty INTEGER NOT NULL,
    PRIMARY KEY (bagID, foodName),
    FOREIGN KEY bagID REFERENCES Bag(bagID)
)

CREATE TABLE Cart
(
    username VARCHAR(50) NOT NULL,
    bagID INTEGER NOT NULL,
    removedFood1 VARCHAR(50),
    removedFood2 VARCHAR(50),
    specialRequest TEXT,
    PRIMARY KEY (username, bagID),
    FOREIGN KEY username REFERENCES User(username),
    FOREIGN KEY bagID REFERENCES Bag(bagID)
)

CREATE TABLE Reservation
(
    username VARCHAR(50) NOT NULL,
    bagID INTEGER NOT NULL,
    PRIMARY KEY (username, bagID),
    FOREIGN KEY username REFERENCES User(username),
    FOREIGN KEY bagID REFERENCES Bag(bagID)
)

*/


const createDB = () => {
    db.serialize(() => {
        //Delete all tables
        db.run('DROP TABLE IF EXISTS User')
        db.run('DROP TABLE IF EXISTS Allergy')
        db.run('DROP TABLE IF EXISTS Establishment')
        db.run('DROP TABLE IF EXISTS Bag')
        db.run('DROP TABLE IF EXISTS BagContent')
        db.run('DROP TABLE IF EXISTS Cart')
        db.run('DROP TABLE IF EXISTS Reservation')
    
        //Create tables
        db.run('CREATE TABLE User(username TEXT NOT NULL PRIMARY KEY, name TEXT NOT NULL, password TEXT NOT NULL)')
        db.run('CREATE TABLE Allergy(username TEXT NOT NULL, allergy TEXT NOT NULL, PRIMARY KEY (username, allergy), FOREIGN KEY (username) REFERENCES User(username))')
        db.run('CREATE TABLE Establishment(establishmentID INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, type TEXT NOT NULL, address TEXT NOT NULL, phone TEXT NOT NULL, toc TEXT NOT NULL)')
        db.run('CREATE TABLE Bag(bagID INTEGER NOT NULL PRIMARY KEY, type TEXT NOT NULL, price FLOAT NOT NULL, startTime TEXT, endTime TEXT, status TEXT, establishmentID INTEGER NOT NULL, FOREIGN KEY (establishmentID) REFERENCES Establishment(establishmentID))')
        db.run('CREATE TABLE BagContent(bagID INTEGER NOT NULL, foodName TEXT NOT NULL, qty INTEGER NOT NULL, PRIMARY KEY (bagID, foodName), FOREIGN KEY (bagID) REFERENCES Bag(bagID))')
        db.run('CREATE TABLE Cart(username TEXT NOT NULL, bagID INTEGER NOT NULL, removedFood1 TEXT, removedFood2 TEXT, specialRequest TEXT, PRIMARY KEY (username, bagID), FOREIGN KEY (username) REFERENCES User(username), FOREIGN KEY (bagID) REFERENCES Bag(bagID))')
        db.run('CREATE TABLE Reservation(username TEXT NOT NULL, bagID INTEGER NOT NULL, PRIMARY KEY (username, bagID), FOREIGN KEY (username) REFERENCES User(username), FOREIGN KEY (bagID) REFERENCES Bag(bagID))')
    })
}

const populateDB = () => {
    db.serialize(() => {
        // Dati per la tabella User
        const users = [
            { username: 'mario_rossi', name: 'Mario Rossi', password: 'password123' },
            { username: 'giulia_verdi', name: 'Giulia Verdi', password: 'securepass456' },
            { username: 'luca_bianchi', name: 'Luca Bianchi', password: 'luca2023!' },
            { username: 'anna_neri', name: 'Anna Neri', password: 'annaPwd789' },
            { username: 'marco_bruno', name: 'Marco Bruno', password: 'marcoB2023' }
        ];
        
        users.forEach(user => {
            db.run('INSERT INTO User (username, name, password) VALUES (?, ?, ?)', 
                [user.username, user.name, user.password]);
        });
        
        // Dati per la tabella Allergy
        const allergies = [
            { username: 'mario_rossi', allergy: 'lattosio' },
            { username: 'mario_rossi', allergy: 'glutine' },
            { username: 'giulia_verdi', allergy: 'frutta secca' },
            { username: 'luca_bianchi', allergy: 'crostacei' },
            { username: 'anna_neri', allergy: 'uova' },
            { username: 'marco_bruno', allergy: 'soia' }
        ];
        
        allergies.forEach(allergy => {
            db.run('INSERT INTO Allergy (username, allergy) VALUES (?, ?)', 
                [allergy.username, allergy.allergy]);
        });
        
        // Dati per la tabella Establishment
        const establishments = [
            { establishmentID: 1, name: 'Panificio Giuseppe', type: 'Panetteria', address: 'Via Roma 23, Milano', phone: '+39 02 1234567', toc: '9:00-18:00' },
            { establishmentID: 2, name: 'Ristorante Da Luigi', type: 'Ristorante', address: 'Corso Italia 45, Roma', phone: '+39 06 7654321', toc: '12:00-23:00' },
            { establishmentID: 3, name: 'Bar Centrale', type: 'Bar', address: 'Piazza Duomo 7, Firenze', phone: '+39 055 9876543', toc: '7:00-20:00' },
            { establishmentID: 4, name: 'Supermercato Fresco', type: 'Supermercato', address: 'Via Garibaldi 12, Torino', phone: '+39 011 3456789', toc: '8:00-21:00' },
            { establishmentID: 5, name: 'Pasticceria Dolce Vita', type: 'Pasticceria', address: 'Via Dante 33, Bologna', phone: '+39 051 8765432', toc: '8:00-19:30' }
        ];
        
        establishments.forEach(establishment => {
            db.run('INSERT INTO Establishment (establishmentID, name, type, address, phone, toc) VALUES (?, ?, ?, ?, ?, ?)', 
                [establishment.establishmentID, establishment.name, establishment.type, establishment.address, establishment.phone, establishment.toc]);
        });
        
        // Dati per la tabella Bag
        const bags = [
            { bagID: 101, type: 'Pane', price: 5.50, startTime: '2025-03-11 17:00:00', endTime: '2025-03-11 18:00:00', status: 'disponibile', establishmentID: 1 },
            { bagID: 102, type: 'Pasta', price: 8.99, startTime: '2025-03-11 22:00:00', endTime: '2025-03-11 23:00:00', status: 'disponibile', establishmentID: 2 },
            { bagID: 103, type: 'Colazione', price: 4.50, startTime: '2025-03-11 19:00:00', endTime: '2025-03-11 20:00:00', status: 'riservato', establishmentID: 3 },
            { bagID: 104, type: 'Verdure', price: 6.75, startTime: '2025-03-11 20:00:00', endTime: '2025-03-11 21:00:00', status: 'disponibile', establishmentID: 4 },
            { bagID: 105, type: 'Dolci', price: 7.25, startTime: '2025-03-11 18:30:00', endTime: '2025-03-11 19:30:00', status: 'riservato', establishmentID: 5 },
            { bagID: 106, type: 'Misto', price: 9.99, startTime: '2025-03-11 17:30:00', endTime: '2025-03-11 18:30:00', status: 'disponibile', establishmentID: 2 },
            { bagID: 107, type: 'Pizza', price: 6.50, startTime: '2025-03-11 21:30:00', endTime: '2025-03-11 22:30:00', status: 'disponibile', establishmentID: 2 },
            { bagID: 108, type: 'Frutta', price: 3.99, startTime: '2025-03-11 20:00:00', endTime: '2025-03-11 21:00:00', status: 'disponibile', establishmentID: 4 }
        ];
        
        bags.forEach(bag => {
            db.run('INSERT INTO Bag (bagID, type, price, startTime, endTime, status, establishmentID) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                [bag.bagID, bag.type, bag.price, bag.startTime, bag.endTime, bag.status, bag.establishmentID]);
        });
        
        // Dati per la tabella BagContent
        const bagContents = [
            { bagID: 101, foodName: 'Pane integrale', qty: 2 },
            { bagID: 101, foodName: 'Focaccia', qty: 1 },
            { bagID: 102, foodName: 'Pasta al pomodoro', qty: 1 },
            { bagID: 102, foodName: 'Tiramisù', qty: 1 },
            { bagID: 103, foodName: 'Croissant', qty: 2 },
            { bagID: 103, foodName: 'Cappuccino', qty: 1 },
            { bagID: 104, foodName: 'Insalata mista', qty: 1 },
            { bagID: 104, foodName: 'Pomodori', qty: 3 },
            { bagID: 105, foodName: 'Torta al cioccolato', qty: 1 },
            { bagID: 105, foodName: 'Biscotti', qty: 5 },
            { bagID: 106, foodName: 'Antipasto misto', qty: 1 },
            { bagID: 106, foodName: 'Lasagna', qty: 1 },
            { bagID: 107, foodName: 'Pizza margherita', qty: 1 },
            { bagID: 107, foodName: 'Pizza funghi', qty: 1 },
            { bagID: 108, foodName: 'Mele', qty: 3 },
            { bagID: 108, foodName: 'Banane', qty: 2 }
        ];
        
        bagContents.forEach(content => {
            db.run('INSERT INTO BagContent (bagID, foodName, qty) VALUES (?, ?, ?)', 
                [content.bagID, content.foodName, content.qty]);
        });
        
        // Dati per la tabella Cart
        const carts = [
            { username: 'mario_rossi', bagID: 102, removedFood1: 'Tiramisù', removedFood2: null, specialRequest: 'Pasta senza glutine per favore' },
            { username: 'giulia_verdi', bagID: 104, removedFood1: null, removedFood2: null, specialRequest: 'Nessuna richiesta' },
            { username: 'luca_bianchi', bagID: 107, removedFood1: null, removedFood2: null, specialRequest: 'Extra pomodoro' },
            { username: 'anna_neri', bagID: 101, removedFood1: null, removedFood2: null, specialRequest: null }
        ];
        
        carts.forEach(cart => {
            db.run('INSERT INTO Cart (username, bagID, removedFood1, removedFood2, specialRequest) VALUES (?, ?, ?, ?, ?)', 
                [cart.username, cart.bagID, cart.removedFood1, cart.removedFood2, cart.specialRequest]);
        });
        
        // Dati per la tabella Reservation
        const reservations = [
            { username: 'mario_rossi', bagID: 102 },
            { username: 'giulia_verdi', bagID: 104 },
            { username: 'luca_bianchi', bagID: 103 },
            { username: 'marco_bruno', bagID: 105 }
        ];
        
        reservations.forEach(reservation => {
            db.run('INSERT INTO Reservation (username, bagID) VALUES (?, ?)', 
                [reservation.username, reservation.bagID]);
        });
    });
    
}

createDB()
populateDB()