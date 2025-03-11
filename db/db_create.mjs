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
        db.run('CREATE TABLE Bag(bagID INTEGER NOT NULL PRIMARY KEY, type TEXT NOT NULL, price FLOAT NOT NULL, startTime TEXT, endTime TEXT, establishmentID INTEGER NOT NULL, FOREIGN KEY (establishmentID) REFERENCES Establishment(establishmentID))')
        db.run('CREATE TABLE BagContent(bagID INTEGER NOT NULL, foodName TEXT NOT NULL, qty INTEGER NOT NULL, PRIMARY KEY (bagID, foodName), FOREIGN KEY (bagID) REFERENCES Bag(bagID))')
        db.run('CREATE TABLE Cart(username TEXT NOT NULL, bagID INTEGER NOT NULL, removedFood1 TEXT, removedFood2 TEXT, specialRequest TEXT, PRIMARY KEY (username, bagID), FOREIGN KEY (username) REFERENCES User(username), FOREIGN KEY (bagID) REFERENCES Bag(bagID))')
        db.run('CREATE TABLE Reservation(username TEXT NOT NULL, bagID INTEGER NOT NULL, PRIMARY KEY (username, bagID), FOREIGN KEY (username) REFERENCES User(username), FOREIGN KEY (bagID) REFERENCES Bag(bagID))')
    })
}

createDB()



