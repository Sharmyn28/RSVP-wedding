
class Model {

   constructor () {
      this.invitations = [];
      this.inputValue = null;
      this.render = undefined;
   }
  
   subscribe(render) {
      this.render = render;
   }
   inform() {
      console.log(this.invitations.map(e => e.text));
      this.render();
   }
   addInvitation(text) {
      this.invitations.push({
         id: Utils.uuid(),
         text: text,
         completed: false
      });
      this.inform();
   }
   updateInvitation(index, invitation) {
      this.invitations[index] = invitation;
      this.inform();
   }
   removeInvitation(invitation) {
      this.invitations = this.invitations.filter(item => item !== invitation);
      this.inform();
   }
}

/**** */
const Invitation =({model, text}) =>{
    return(
        <li>{text} 
            <label htmlFor=""> Confirmed <input type="checkbox"/> </label>
            <button> remove </button> 
        </li>
    )
}

const App = ({ title, model }) => {
   const items = model.invitations.map((invitations, index) => {
      return (
         <li key={invitations.id}> {invitations.text}
            <label htmlFor="">
                <input
                    type="checkbox"
                    value={invitations.text}
                    onChange={e =>
                        model.updateInvitation(index, {
                            id: invitations.id,
                            text: e.target.value,
                            completed: invitations.completed
                    })}
            />Confirmed</label>
            <button onClick={() => model.removeInvitation(invitations)}>remove</button>
         </li>
      );
   });
    return (
        <div className='wrapper'>
            <header>
                <h1> {title} </h1>
                <p> Registration App </p>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        model.addInvitation(model.inputValue);
                    }}
                    id= 'registrar'
                >
                    <input onChange={e => (model.inputValue = e.target.value)}  type="text" name="name" placeholder="Invite Someone"/>
                    <button type="submit" name="submit" value="submit">Submit</button>
                </form>
            </header>
            
            <div className='main'>
                <h2> Invitees </h2>
                <ul id= 'invidedList'> {items} </ul>
            </div>
           
        </div>
    );
   /*return(
        <div className='main'>
                <h2> Invitees </h2>
                <ul id= 'invidedList'> {items} </ul>
            </div>

   )*/
};

let model = new Model();
let counter = 1;
let render = () => {
   console.log('render times: ', counter++);
   ReactDOM.render(
      <App title="RSVP" model={model} />,
      document.getElementById('container')
   );
};

model.subscribe(render);
render(); 


/****** */
/*const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
});
  
ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});
  
ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const li = e.target.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }
});  */