import { Link } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./routes/CustomRoutes.jsx";

function App() {
  return (
    <div className="outer-Pokedex">
       <span id="pokedex-heading">
        <Link className="Link" to="/">Pokedex</Link>
       </span>
      <CustomRoutes/>
    </div>
  );
}

export default App;
