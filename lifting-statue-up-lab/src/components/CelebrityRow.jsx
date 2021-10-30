import React from "react";

function CelebrityRow(props) {
  const { celeb, deleteCeleb } = props;

  //   const deleteCeleb = () =>
  //     setInitialState(initialState.filter((e) => e.id !== celeb.id));

  return (
    <tr>
      <td>
        <img
          src={celeb.pictureUrl}
          alt={`${celeb.name} looking famous`}
          style={{ height: "100px" }}
        />
      </td>
      <td>{celeb.name}</td>
      <td>{celeb.popularity}</td>
      <td>
        {/* <button onClick={() => deleteCeleb(celeb.id)}>Delete</button> */}
        <button
          onClick={function () {
            deleteCeleb(celeb.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CelebrityRow;
