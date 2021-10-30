import React from "react";

function ButtonContainer(props) {
  const { addRandomContact, sortByName, sortByPop } = props;
  return (
    <>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPop}>Sort by popularity</button>
    </>
  );
}

export default ButtonContainer;
