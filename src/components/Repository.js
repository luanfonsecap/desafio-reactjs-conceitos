import React from "react";

export default function Repository({ id, title, handleRemoveRepository }) {
  return (
    <li>
      {title}
      <button onClick={() => handleRemoveRepository(id)}>Remover</button>
    </li>
  );
}
