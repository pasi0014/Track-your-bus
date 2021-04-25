export const SearchContainer = (props: any) => {
  return (
    <div className="container mx-auto border w-1/2 border-green-700 p-2 rounded-lg shadow-md mt-7">
      <div className="flex justify-center flex-col">
        <h2 className="font-bold text-gray-500 p-2">Enter stop Number</h2>
        {props.children}
        {props.displayRoutesforStop}
      </div>
    </div>
  );
};
