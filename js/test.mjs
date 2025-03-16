import { selectItems, insertItem, deleteItem, updateItem} from './db_handler.mjs';
import { User, Bag, Establishment } from './types.mjs';

/* FIRST LAB
const users = [
    new User("Michele", true, [{ bagID: 1, removedFood: [], specialRequest: "None" }], ["Bag3"], []),
    new User("Federico", false, [{ bagID: 2, removedFood: [], specialRequest: "No gluten" }], [], ["Gluten"]),
    new User("Davide", true, [{ bagID: 3, removedFood: [], specialRequest: "None" }], [], []),
    new User("Alessandro", true, [{ bagID: 4, removedFood: [], specialRequest: "None" }], ["Bag3"], ["Lactose"]),
    new User("Irene", false, [{ bagID: 5, removedFood: [], specialRequest: "None" }], [], ["Lactose"]),
    new User("Giovanni", true, [{ bagID: 6, removedFood: [], specialRequest: "None" }], [], []),
    new User("Cristina", true, [{ bagID: 7, removedFood: [], specialRequest: "None" }], ["Bag3"], []),
  ];


  const bags = [
    new Bag(1, "Surprise", [], 5.99, "Small", 1, { start: "18:00", end: "19:00" }, "Available"),
    new Bag(2, "Regular", [{ food: "Apple", quantity: 2 }, { food: "Banana", quantity: 1 }], 6.49, "Medium", 2, { start: "12:00", end: "13:00" }, "Available"),
    new Bag(3, "Regular", [{ food: "Carrot", quantity: 3 }, { food: "Potato", quantity: 5 }], 7.00, "Large", 1, { start: "17:00", end: "18:00" }, "Reserved"),
    new Bag(4, "Surprise", [], 4.99, "Large", 3, { start: "20:00", end: "21:00" }, "Available"),
    new Bag(5, "Regular", [{ food: "Tomato", quantity: 3 }, { food: "Onion", quantity: 2 }], 6.99, "Small", 2, { start: "15:00", end: "16:00" }, "Available")
  ];
  

  const establishments = [
    new Establishment(1, "Italian Bistro", "Restaurant", "Via Roma, 10, Milano", "+39 02 12345678", "Italian", [1, 3]),
    new Establishment(2, "Healthy Snacks", "Store", "Piazza Duomo, 5, Milano", "+39 02 98765432", "Healthy Food", [2, 5]),
    new Establishment(3, "Vegan Delights", "Restaurant", "Viale Europa, 23, Milano", "+39 02 24681357", "Vegan", [4]),
    new Establishment(4, "Fresh Market", "Store", "Via Garibaldi, 15, Milano", "+39 02 11223344", "Fresh Produce", []),
    new Establishment(5, "Sushi Palace", "Restaurant", "Corso Buenos Aires, 22, Milano", "+39 02 55667788", "Japanese", [])
  ];
*/

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


