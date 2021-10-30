import React, { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";
import CelebrityRow from "./components/CelebrityRow";
import ButtonContainer from "./components/ButtonContainer";

const firstFive = contacts.slice(0, 5);

function makeRandomNumber() {
  return Math.floor(Math.random() * contacts.length);
}

function App() {
  const [initialState, setInitialState] = useState(firstFive);

  const [formState, setFormState] = useState({
    signupText: "",
    passwordText: "",
    celebName: "",
    address: "",
    newElement: "",
  });

  function handleFormChange(event) {
    const copy = { ...formState }; // making a copy of the object. just like the [....initialState] does it for a copy of an array
    copy[event.target.name] = event.target.value;
    setFormState(copy);
  }

  function isContactExists(randomContact) {
    return initialState.find((contact) => randomContact.id === contact.id);
  }

  function deleteCeleb(id) {
    setInitialState(initialState.filter((e) => e.id !== id));
  }

  function addRandomContact() {
    let randomContact = contacts[makeRandomNumber()];

    let contactExists = isContactExists(randomContact);

    while (!!contactExists) {
      randomContact = contacts[makeRandomNumber()];
      contactExists = isContactExists(randomContact);
    }

    const copy = initialState.slice();
    setInitialState([randomContact, ...copy]);
  }

  function sortByName() {
    const copy = [...initialState];

    copy.sort((a, b) => a.name.localeCompare(b.name));

    setInitialState(copy);
  }

  function sortByPop() {
    const copy = [...initialState];

    copy.sort((a, b) => b.popularity - a.popularity);

    setInitialState(copy);
  }

  const filteredCelebs = initialState.filter((celeb) => {
    return celeb.name
      .toLocaleLowerCase()
      .includes(formState.celebName.toLocaleLowerCase());
  });

  return (
    <div className="App">
      <h2>IronContacts</h2>
      <input
        type="text"
        name="signupText"
        placeholder="Signup"
        value={formState.signupText}
        onChange={handleFormChange}
      />

      <br />
      <input
        type="password"
        name="passwordText"
        placeholder="Password"
        value={formState.passwordText}
        onChange={handleFormChange}
      />
      <br />
      <br />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formState.address}
        onChange={(event) => handleFormChange(event)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Name of  celeb"
        name="celebName"
        value={formState.celebName}
        onChange={handleFormChange}
      />
      <br />
      <br />
      <button onClick={addRandomContact}>Add Random Contact</button>
      <ButtonContainer
        addRandomContact={addRandomContact}
        sortByName={sortByName}
        sortByPop={sortByPop}
      />
      <table style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Delete celeb</th>
          </tr>
        </thead>

        <tbody>
          {filteredCelebs.map((celeb) => {
            return (
              <CelebrityRow
                key={celeb.id}
                celeb={celeb}
                setInitialState={setInitialState}
                initialState={initialState}
                deleteCeleb={deleteCeleb}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
