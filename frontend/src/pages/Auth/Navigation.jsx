import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  const { cartItems } = useSelector((state) => state.cart);


  return (
    <div className="navbar" id="navigation-container">
      <div className="flex items-center space-x-8">
        <Link to="/" className="nav-item">
          <AiOutlineHome size={26} />
          <span className="nav-item-name">HOME</span>
        </Link>
        
        <Link to="/shop" className="nav-item">
          <AiOutlineShopping size={26} />
          <span className="nav-item-name">SHOP</span>
        </Link>

        <Link to="/cart" className="nav-item">
        <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShoppingCart size={26} />
          <span className="nav-item-name">CART</span>
          <div className="absolute left-2 top-1.5">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-blue-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
          </div>
        </Link>

        <Link to="/favorite" className="nav-item">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart size={20} />
            <span className="nav-item-name">FAVORITES</span>
            <div className="absolute left-2 top-1">
              {favoriteCount > 0 && (
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {favoriteCount}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      <div className="relative">
        {userInfo ? (
          <>
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white focus:outline-none"
            >
              <span>{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute bg-gray-700 text-white shadow-lg rounded-lg mt-2 right-0">
                {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/allproducts"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Orders
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Users
                  </Link>
                </li> */}
              </>
            )}
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-800">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="nav-item">
              <AiOutlineLogin size={26} />
              <span className="nav-item-name">LOGIN</span>
            </Link>
            <Link to="/register" className="nav-item">
              <AiOutlineUserAdd size={26} />
              <span className="nav-item-name">REGISTER</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
