// SearchBar Component
const SearchBar = () => (
  <div className="search-bar">
    <input type="text" placeholder="Medical Specialty" />
    <input type="text" placeholder="Name, surname" />
    <input type="date" />
    <input type="date" />
    <button className="search-button">Search</button>
  </div>
);

export default SearchBar;
