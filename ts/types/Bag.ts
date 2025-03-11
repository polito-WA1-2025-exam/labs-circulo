import dayjs from 'dayjs'

class Bag{
    bagId: number;
    type: string;
    price: number;
    startTime: dayjs.Dayjs;
    endTime: dayjs.Dayjs;
    establishmentId: number;

    constructor(bagId: number, type: string, price: number, 
        startTime: dayjs.Dayjs, endTime: dayjs.Dayjs, establishmentId: number){
        this.bagId = bagId
        this.type = type
        this.price = price
        this.startTime = startTime
        this.endTime = endTime
        this.establishmentId = establishmentId
    }

    isValidRange(){
        return this.startTime.isBefore(this.endTime)
    }
}

export { Bag }