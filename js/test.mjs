import { getItems, getItemsWithCondition } from './db_handler.mjs';
import {User,Bag,Establishment} from './types.mjs';

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


async function fetchData(table, condition = null, params = []) {
  if (condition) {
      return await getItemsWithCondition(table, condition, params);
  } else {
      return await getItems(table);
  }
}

function main(){
  const table = "Bag"
  const condition = "type LIKE ?"
  const params = ["P%"]

  // fetchData(table).then(data => {
  //   console.log(data);
  // });

  fetchData(table, condition, params).then(data => {
    console.log(data);
  });



}


main()
  
  
