import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { NODE_BACKEND_URL } from "../utils";

const App = () => {
  const [cartCount, setCartCount] = useState(() => {
    const sessionStorageCartCount = sessionStorage.getItem("cartCount");

    if (sessionStorageCartCount) return parseInt(sessionStorageCartCount, 10);
    return 0;
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data: response } = await axios.get(NODE_BACKEND_URL);
        setCategories(response);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  const navBarItems = () =>
    categories.map((item, index, array) => {
      const includeRedText = index === array.length - 1;

      return (
        <li
          key={(item as any)._id}
          className={`px-4 py-1 w-50 ${includeRedText ? "text-red-600" : ""}`}
        >
          {(item as any).name}
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
            <img src="images/logo.jpg" alt="Logo" />
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
                  className="border-solid border-[#363336] border-[1px] h-10 px-5 rounded-md text-[1rem] indent-3 font-medium placeholder:font-semibold w-56"
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
