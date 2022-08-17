import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useId, useState } from "react";

const App = () => {
  const [cartCount, setCartCount] = useState(() => {
    const sessionStorageCartCount = sessionStorage.getItem("cartCount");

    if (sessionStorageCartCount) return parseInt(sessionStorageCartCount, 10);
    return 0;
  });

  const FAKE_CATEGORIES = [
    "WOMEN",
    "MEN",
    "ACCESSORIES",
    "MIRROR",
    "SHOES",
    "LIKE NEW",
  ];

  const navBarItems = () =>
    FAKE_CATEGORIES.map((item, index, array) => {
      const includeRedText = index === array.length - 1;

      return (
        <li
          key={useId()}
          className={`px-4 py-1 w-50 ${includeRedText ? "text-red-600" : ""}`}
        >
          {item}
        </li>
      );
    });

  const handleAddToCart = () => {
    const newCartCount = cartCount + 1;

    setCartCount(newCartCount);
    sessionStorage.setItem("cartCount", newCartCount.toString());
  };

  const hasCartMoreThanTenItems = cartCount >= 10;

  return (
    <div>
      <nav className="flex px-7 mx-14 font-semibold uppercase leading-5 tracking-wider">
        <div className="basis-full flex items-center h-20">
          <div className="basis-32 shrink-0 mr-6">
            <img src="src/assets/logo.jpg" alt="Logo" />
          </div>
          <ul className="flex space-x-2 mr-20 min-w-max">{navBarItems()}</ul>
          <div className="flex basis-full justify-end items-center">
            <div className="flex items-center">
              <form action="">
                <SearchIcon
                  fontSize="small"
                  className="absolute top-[1.90rem] ml-2.5"
                />
                <input
                  placeholder="Search"
                  className="border-solid border-[#363336] border-[1px] h-10 px-6 rounded-md placeholder:pl-2.5 text-[1rem]"
                  type="search"
                  name=""
                  id=""
                />
              </form>
              <div
                onClick={() => handleAddToCart()}
                className="flex items-center pr-7 hover:cursor-pointer"
              >
                <ShoppingCartOutlinedIcon
                  fontSize={"large"}
                  className="ml-5 text-sm"
                />
                <span
                  className={`text-xs rounded-md ${
                    hasCartMoreThanTenItems ? "w-6" : "w-4"
                  } bg-slate-300/50 text-center -ml-[0.30rem] mt-1`}
                >
                  {cartCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default App;
