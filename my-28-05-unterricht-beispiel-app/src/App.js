import {useState}from "react"
import "./App.css";
function App() {
  const [buttonColor, setButtonColor] = useState("rot");
  const [isDisabled, setIsDisabled] = useState(false);

  function farbWechseln() {
    const nextColor = buttonColor === "rot" ? "blau" : "rot";
    setButtonColor(nextColor);
  }

  function handleCheckboxChange() {
    setIsDisabled(!isDisabled);
  }
  return (
    <div className="App">
      <button
        className={isDisabled ? "grau" : buttonColor}
        onClick={farbWechseln}
        disabled={isDisabled}
      >
        Farbe zu {buttonColor} wechseln
      </button>
      <br />
      <input
        id="checkbox"
        onChange={handleCheckboxChange}
        type="checkbox"
      />
      <label htmlFor="checkbox">Button deaktivieren</label>
    </div>
  );
}

export default App;
