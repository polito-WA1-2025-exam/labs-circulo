class Establishment{
    establishmentId: number;
    name: string;
    type: string;
    address: string;
    phone: string;
    toc: string; //type of cuisine

    constructor(establishmentId: number, name: string, type: string, address: string, phone: string, toc: string){
        this.establishmentId = establishmentId
        this.name = name
        this.type = type
        this.address = address
        this.phone = phone
        this.toc = toc
    }
}

export { Establishment }