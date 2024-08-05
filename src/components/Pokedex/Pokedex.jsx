import Search from "../Search/Search.jsx";
import "./Pokedex.css";

function Pokedex() {
  return (
    <>
      <div className="pokedex-wrapper">
        <span id="pokedex-heading">Pokedex</span>
        <Search />
      </div>
    </>
  );
}
export default Pokedex;
