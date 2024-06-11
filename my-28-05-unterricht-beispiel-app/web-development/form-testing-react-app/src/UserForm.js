import React from "react";
import { useState } from "react";

export default function UserForm({ onUserAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onUserAdd({ name, email });
    setName("")
    setEmail("")
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputName">Name</label>
          <input
          value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            id="inputName"
          ></input>
        </div>
        <div>
          <label htmlFor="inputEmail">Email</label>
          <input
          value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            id="inputEmail"
          ></input>
        </div>
        <button>Senden</button>
      </form>
    </div>
  );
}
