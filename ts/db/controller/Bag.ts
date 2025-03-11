import sqlite from 'sqlite3'
import { Bag } from '../../types/Bag'
import { dbAllAsync, dbGetAsync } from '../async_sqlite'
import dayjs, { Dayjs } from 'dayjs'

function mapToBag(row: any): Bag {
    return new Bag(
        row.bagID,
        row.type,
        row.price,
        dayjs(row.startTime),
        dayjs(row.endTime),
        row.status,
        row.establishmentID
    )
}

export async function getBags(db: sqlite.Database): Promise<Bag[]> {
    const sql = `
        SELECT * FROM Bag
    `
    return dbAllAsync(db, sql, [])
        .then((rows) => {
            return rows.map(mapToBag)
        })
}

export async function getBag(db: sqlite.Database, bagId: number): Promise<Bag> {
    const sql = `
        SELECT * FROM Bag
        WHERE bagID = ?
    `
    return dbGetAsync(db, sql, [bagId])
        .then(row => mapToBag(row))
}

export async function getBagsByEstablishment(db: sqlite.Database, establishmentId: number): Promise<Bag[]> {
    const sql = `
        SELECT * FROM Bag
        WHERE establishmentID = ?
    `
    return dbAllAsync(db, sql, [establishmentId])
        .then((rows) => rows.map(mapToBag))
}

export async function getAvailableBags(db: sqlite.Database): Promise<Bag[]> {
    const sql = `
        SELECT * FROM Bag
        WHERE status = 'available'
    `
    return dbAllAsync(db, sql, [])
        .then(rows => rows.map(mapToBag))
}

export async function getAvailableBagsByEstablishment(db: sqlite.Database, establishmentId: number): Promise<Bag[]> {
    const sql = `
        SELECT * FROM Bag
        WHERE status = 'available'
        AND establishmentID = ?
    `
    return dbAllAsync(db, sql, [establishmentId])
        .then((rows) => rows.map(mapToBag))
}

export async function getReservedBags(db: sqlite.Database): Promise<Bag[]> {
    const sql = `
        SELECT * FROM Bag
        WHERE status = 'reserved'
    `
    return dbAllAsync(db, sql, [])
        .then((rows) => rows.map(mapToBag))
}

export async function getAvailableBagsFromDateTime(db: sqlite.Database, datetime: Dayjs): Promise<Bag[]> {
    const sql = `
        SELECT * FROM Bag
        WHERE status = 'disponibile'
        AND startTime >= ?
    `


    return dbAllAsync(db, sql, [datetime.format("YYYY-MM-DD HH:mm:ss")])
        .then((rows) => rows.map(mapToBag))
}
