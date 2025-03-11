import dayjs from 'dayjs'

class Bag{
    bagId: number;
    type: string;
    price: number;
    startTime: dayjs.Dayjs;
    endTime: dayjs.Dayjs;
    establishmentId: number;
    status: string;

    constructor(bagId: number, type: string, price: number, 
        startTime: dayjs.Dayjs, endTime: dayjs.Dayjs, status: string, establishmentId: number){
        this.bagId = bagId
        this.type = type
        this.price = price
        this.startTime = startTime
        this.endTime = endTime
        this.status = status
        this.establishmentId = establishmentId
    }

    isValidRange(){
        return this.startTime.isBefore(this.endTime)
    }

    isAvailable(){
        return this.status === 'available'
    }
}

export { Bag }