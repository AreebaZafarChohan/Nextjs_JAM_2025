import { FaUserCircle } from "react-icons/fa";
import { MdAnalytics, MdDashboard, MdInventory2, MdSell, MdShoppingBag } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
  return (
    <div className="w-1/4 bg-gray-800 rounded-md text-white p-4">
      <ul>
        <li
          className="cursor-pointer px-4 hover:bg-gray-700 my-4  py-4 rounded border-2 border-transparent hover:border-white"
          onClick={() => setActiveTab("dashboard")}
        >
       <p className="flex gap-2"><MdDashboard className="text-xl"/>Dashboard</p>
        </li>
        <li
          className="cursor-pointer px-4 hover:bg-gray-700 my-4  py-4 rounded border-2 border-transparent hover:border-white"
          onClick={() => setActiveTab("products")}
        >
       <p className="flex gap-2"><MdShoppingBag className="text-xl"/> Products</p>
        </li>
        <li
          className="cursor-pointer px-4 hover:bg-gray-700 my-4  py-4 rounded border-2 border-transparent hover:border-white"
          onClick={() => setActiveTab("users")}
        >
       <p className="flex gap-2"><FaUserCircle  className="text-xl"/>  Users</p>
        </li>
        <li
          className="cursor-pointer px-4 hover:bg-gray-700 my-4  py-4 rounded border-2 border-transparent hover:border-white"
          onClick={() => setActiveTab("stock")}
        >
             <p className="flex gap-2"> <MdInventory2  className="text-xl"/>
             Stock</p>
          
        </li>
        <li
          className="cursor-pointer px-4 hover:bg-gray-700 my-4  py-4 rounded border-2 border-transparent hover:border-white"
          onClick={() => setActiveTab("analytics")}
        >
             <p className="flex gap-2"> <MdAnalytics  className="text-xl"/>
             Analytics</p>
          
        </li>
        <li
          className="cursor-pointer px-4 hover:bg-gray-700 my-4  py-4 rounded border-2 border-transparent hover:border-white"
          onClick={() => setActiveTab("monthly_sales")}
        >
             <p className="flex gap-2"> <MdSell  className="text-xl"/>
             Monthly Sale</p>
        
        </li>
        <li
          className="cursor-pointer px-4 hover:bg-gray-700 my-4  py-4 rounded border-2 border-transparent hover:border-white"
          onClick={() => setActiveTab("logout")}
        >
             <p className="flex gap-2"> <IoLogOut  className="text-xl"/> Logout</p>
           
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
