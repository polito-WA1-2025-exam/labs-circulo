# Group "Circulo"

## Members
- s339645 CAROLLO FEDERICO
- s339425 CARLETTO DAVIDE
- s300467 CARENA MICHELE

# Exercise "Surplus Food"

# Lab Journal

## Lab 2 - Logic schema
### User

User(username, name, password)

PK: username


### Allergy

Allergy(username, allergy)

PK: (username, allergy)

FK: username

### Establishment

Establishment(establishmentID, name, type, address, phone, toc)

PK: establishmentID


### Bag
Bag(bagID, type, size, price, establishmentID, startTime, endTime, status)

PK: bagID

FK: establishmentID


### BagContent

BagContent(bagID, foodName, qty)

PK: bagID


### Cart

Cart(username, bagID, removedFood1, removedFood2, specialRequest)

PK: username, bagID
FK: username, bagID

### Reservation

Reservation(username, bagID)

PK: username, bagID

FK: username, bagID




