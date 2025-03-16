import { selectItems, insertItem, deleteItem, updateItem} from './db_handler.mjs';

/**
 * Esegue una query SQL sulla tabella specificata, basata sull'operazione richiesta (SELECT, INSERT, DELETE, UPDATE).
 *
 * @param {string} table - Il nome della tabella su cui eseguire l'operazione.
 * @param {string} operation - L'operazione da eseguire.
 * @param {string|null} condition - La condizione da applicare nelle operazioni SELECT, DELETE o UPDATE. 
 *                                  Usato per la clausola WHERE. Se non serve una condizione, può essere passato `null`.
 *                                  Esempi: "id = ?", "name LIKE ?", "status = 'active'".
 * @param {array|null} columns - Un array di nomi delle colonne da usare nell'operazione. 
 *                               Utilizzato in INSERT e UPDATE. Se non serve (come nel caso di SELECT o DELETE), passa `null`.
 *                               Esempi: ["username", "password"], ["name", "status"].
 * @param {array} params - I parametri da passare alla query SQL, utilizzati per le condizioni o i valori da inserire/aggiornare (sostituiscono
 *                         il ?). 
 *                         In SELECT e DELETE vengono usati per i valori della clausola WHERE. 
 *                         In UPDATE, vengono usati per i valori da aggiornare e per la condizione (concatenazione di array di parametri che
 *                         definiscono i valori da aggiornare e i parametri della where). 
 *                         Es: let conditionParams = ["Pane"] (per la condizione WHERE)
                               let columnsValues = ["riservato", 5.99] (per i valori da aggiornare)
                               params = [...columnsValues, ...conditionParams]
 *                         In INSERT, vengono usati per i valori da inserire (dopo VALUES).
 *
 * @returns {Promise} Una Promise che restituisce i risultati dell'operazione (rows) o un messaggio di successo/errore.
 */
async function executeQuery(table, operation, condition = null, columns = [], params = []) {

  switch (operation) {
    case "SELECT":
      return await selectItems(table, condition, params);

    case "INSERT":
      return await insertItem(table, columns, params);

    case "DELETE":
      return await deleteItem(table, condition, params);
    
    case "UPDATE":
      return await updateItem(table, columns, condition, params);
    
    default:
      return "Operation not supported";
    
    }
}

function main() {
  let table = "Bag"
  let operation = "SELECT"
  let condition = "type LIKE ?"
  let columns = ["type", "size", "price", "availability"]
  let params = ["P%"]

  //select
  executeQuery(table, operation, condition, null, params)
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


