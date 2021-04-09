export const Search = (props: any) => {
  return (
    <input
      type="text"
      className="w-full pl-3 pr-10 py-2 border-2 border-gray-200
            rounded-xl hover:border-gray-300 focus:outline-none
            focus:border-blue-500 transition-colors"
      value={props.search}
      onChange={props.handleChange}
      placeholder="Search..."
    />
  );
};

export default Search;
