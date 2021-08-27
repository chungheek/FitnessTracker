import "./App.scss";
import Form from "./components/Form";
import Exercise from "./components/Exercise";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
        <Exercise />
      </header>
    </div>
  );
}

export default App;
