import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter(item => item.id !== id));
  }

  function handleToggleItems(id) {
    setItems((items) => 
      items.map((item) => 
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function HandleClearList(){
    const confirmed = window.confirm("are you sure you want to delete all the items?")
    if(confirmed)setItems([])

  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList 
      items={items} 
      onDeleteItems={handleDelete}
       onToggleItems={handleToggleItems}
       OnClearlist={HandleClearList}
        />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}  > {num}     </option>
        ))}
      </select>
      <input 
        type="text" 
        placeholder="Items.." 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItems, OnClearlist }) {
  const [sortby, setsoryby] = useState("input");
  
let sortedItems;
if(sortby === "input") sortedItems = items;
if(sortby === "description") sortedItems = items.slice().sort((a,b) => a.description.localCompare(b.description));
if (sortby === "packed") sortedItems= items.slice().sort((a, b)=> Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      {sortedItems.map((item) => (
        <Item 
          item={item} 
          onDeleteItems={onDeleteItems} 
          onToggleItems={onToggleItems} 
          key={item.id} 
        />
      ))}
      <div className="actions">
<select value={sortby} onChange={(e) => setsoryby(e.target.value)}>
  <option value="input">Sort by Input order</option>
  <option value="description">Sort by description</option>
  <option value="Packed">Sort by packed satatus </option>
</select>
<button onClick={OnClearlist}>Clear list</button>
      </div>
      
    </div>
  );
}


function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li>
      <input 
        type="checkbox" 
        checked={item.packed} 
        onChange={() =>  (item.id)} 
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) return <em className="stats">Start adding some items to your packing list</em>;

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? "You got everything! Ready to go" : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}




//from stack overflow





// export const WrapperComponent = ({ component }) => {

//   // ID for component
//   const { odmParameter } = component;
//   const [wrappedComponentsArray, setWrappedComponentsArray] = useState([]);
//   const deleteChildComponent = (uuid) => {
//       // Logs to array "before" itsself
//       console.log(wrappedComponentsArray);
//       /* 
//        Output: [{"uuid":"acc0d4c-165c-7d70-f8e-d745dd361b5"}, 
//        {"uuid":"0ed3cc3-7cd-c647-25db-36ed78b5cbd8"]
//       */

//       setWrappedComponentsArray(prevState => prevState.filter(item => item !== uuid));

//       // After
//       console.log(wrappedComponentsArray);
//       /*
//         Output: [{"uuid":"acc0d4c-165c-7d70-f8e-d745dd361b5",{"uuid":"0ed3cc3- 
//        7cd-c647-25db-36ed78b5cbd8"]
//        */
//   };

//   const onChangeUpHandler = (event) => {
//       const { value } = event;
//       const { uuid } = event;

//       switch (value) {
//           case 'delete':
//               // This method gets hit
//               deleteChildComponent(uuid);
//               break;
//           default:
//               break;
//       }
//   };

//   const addOnClick = () => {

//       const objToAdd = {
//           // Generate uuid for each component
//           uuid: uuid(),
//           onChangeOut: onChangeUpHandler,
//       };

//       setWrappedComponentsArray(wrappedComponentsArray => [...wrappedComponentsArray, objToAdd]);

//       // Have also tried this solution with no success
//       // setWrappedComponentsArray(wrappedComponentsArray.concat(objToAdd));
//   };

//   return (
//       <>
//           <div className='page-content'>
//               {/*Loop over useState array*/}
//               {
//                   wrappedComponentsArray.length > 0 &&
//                   <div>
//                       {wrappedComponentsArray.map((props) => {
//                           return <div className={'page-item'}>
//                               <ChildComponent {...props} />
//                           </div>;
//                       })
//                       }
//                   </div>
//               }
//               {/*Add component btn*/}
//               {wrappedComponentsArray.length > 0 &&
//                   <div className='page-button-container'>
//                       <ButtonContainer
//                           variant={'secondary'}
//                           label={'Add new component'}
//                           onClick={() => addOnClick()}
//                       />
//                   </div>
//               }
//           </div>
//       </>
//   );
// };
// export const ChildComponent = ({ uuid, onChangeOut }) => {
//   return (
//       <>
//           <div className={'row-box-item-wrapper'}>
//               <div className='row-box-item-input-container row-box-item-header'>
//                   <Button
//                       props={
//                           type: 'delete',
//                   info: 'Deletes the child component',
//                   value: 'Delete',
//                   uuid: uuid,
//                   callback: onChangeOut
//                 }
//               />
//               </div>

//               <div>
//                   {/* Displays generated uuid in the UI */}
//                   {uuid}
//               </div>

//           </div>
//       </>
//   )
// }