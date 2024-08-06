import { Link } from "react-router-dom";
import "./Pokemon.css"

function Pokemon({ name, image, id }) {
  return (
    <>
      <div className="pokemon" >
      <Link className="pokiLink" to={`/pokemon/${id}`}>
      <div className="pokemon-name">{name}</div>
        <img className="pokemon-image" src={image} alt="" />
        </Link>
      </div>
    </>
  );
}
export default Pokemon;
