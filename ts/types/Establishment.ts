import { Bag } from "./Bag";

class Establishment{
    establishmentId: number;
    name: string;
    type: string;
    address: string;
    phone: string;
    toc: string; //type of cuisine
    bags: Bag[]

    constructor(establishmentId: number, name: string, type: string, address: string, phone: string, toc: string, bags: Bag[] = []){
        this.establishmentId = establishmentId
        this.name = name
        this.type = type
        this.address = address
        this.phone = phone
        this.toc = toc
        this.bags = bags
    }

    addBag(bag: Bag){
        this.bags.push(bag)
    }

    removeBag(bagId: number){
        this.bags = this.bags.filter(b => b.bagId !== bagId)
    }

    getBag(bagId: number){
        return this.bags.find(b => b.bagId === bagId)
    }
}

export { Establishment }