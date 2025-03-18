import { selectItems, insertItem, deleteItem, updateItem, executeQuery, openDb} from './async_db_handler.mjs';



async function main() {
  let table = "Bag"
  let operation = "SELECT"
  let condition = "type LIKE ?"
  let columns = ["type", "size", "price", "availability"]
  let params = ["P%"]
  const db = await openDb()

  //select
  executeQuery(table, operation, condition, ["*"], params)
    .then((rows) => {
      console.log(rows)
    })
    .catch((err) => {
      console.log(err)
    })

  //insert
  table = "User"
  operation = "INSERT"
  columns = ["username", "name", "password"]
  params = ["Marco", "B", "Porterai Minecreft?"]

  executeQuery(table, operation, null, columns, params)
    .then((rows) => {
      console.log(rows)
    })
    .catch((err) => {
      console.log(err)
    })

  //delete
  table = "Establishment"
  operation = "DELETE"
  condition = "name = ?"
  params = ["Bar Centrale"]

  executeQuery(table, operation, condition, null, params)
    .then((rows) => {
      console.log(rows)
    })
    .catch((err) => {
      console.log(err)
    })

    //update
    table = "Bag"
    operation = "UPDATE"
    condition = "type = ?"
    columns = ["status", "price"]

    let conditionParams = ["Pane"]
    let columnsValues = ["riservato", 5.99]

    params = [...columnsValues, ...conditionParams]

    executeQuery(table, operation, condition, columns, params)
      .then((rows) => {
        console.log(rows)
      })
      .catch((err) => {
        console.log(err)
      })
}

main()


