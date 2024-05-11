import { FaBox, FaClipboardList } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="bg-black text-white h-auto w-1/5">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <ul className='cursor-pointer'>
          <li className="flex items-center py-2  hover:bg-gray-800">
            <FaBox className="mr-2" /> Products
          </li>
          <li className="flex items-center py-2 hover:bg-opacity-45">
            <FaClipboardList className="mr-2" /> Orders
          </li>
        </ul>
      </div>
    </div>
  );
}
