const UniversalSelectLimit = ({ setLimit, ClassName }) => {
  return (
    <div className="md:text-lg flex gap-2">
      Select Limit:{" "}
      <select
        name="limit"
        id="limit"
        onChange={setLimit}
        className={`bg-white text-black rounded md:px-2 md:py-1 ${ClassName}`}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={25}>25</option>
        <option value={30}>30</option>
      </select>
    </div>
  );
};

export default UniversalSelectLimit;
