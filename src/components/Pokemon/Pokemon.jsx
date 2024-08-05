function Pokemon({ name, image }) {
  return (
    <>
      <div>
        <img src={image} alt="" />
      </div>
      <div>{name}</div>
    </>
  );
}
export default Pokemon;
