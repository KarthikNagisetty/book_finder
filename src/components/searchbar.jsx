import PropTypes from "prop-types";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a book..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onSubmit}>Search</button>
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
