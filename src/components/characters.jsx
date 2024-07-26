const Characters = () => {
  return (
    <div className="perso" key={index}>
      {objet?.thumbnail ? (
        <img
          src={`${objet.thumbnail.path}.${objet.thumbnail.extension}`}
          alt={`Thumbnail ${index}`}
        />
      ) : (
        <div className="notfound">a</div>
      )}
    </div>
  );
};

export default Characters;
