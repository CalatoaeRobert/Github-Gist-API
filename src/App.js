import logo from './logo.svg';
import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import Searchbar from "./searchbar/searchbar";

function App() {

  return (
    <div className="App">
        <h1>Github Gist API</h1>
        <Searchbar />
    </div>
  );
}

export default App;
