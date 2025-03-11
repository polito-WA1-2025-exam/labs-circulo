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
    status TEXT,
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

