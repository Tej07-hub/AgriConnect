const Topbar = () => {
  return (
    <header className="h-20 bg-white border-b px-8 flex items-center justify-between">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Retailer Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Manage your products efficiently
        </p>
      </div>

      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
        R
      </div>

    </header>
  );
};

export default Topbar;