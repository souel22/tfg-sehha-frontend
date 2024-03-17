// SearchBar Component
const SearchBar = () => {
  return (
    <div className="searchBar">
      <input type="text" placeholder="Medical Specialty" />
      <input type="text" placeholder="Name, surname" />
      <input type="date" placeholder="Since" />
      <input type="date" placeholder="Until" />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
