import { FaHome, FaTachometerAlt, FaBell, FaEnvelope, FaCog, FaCube } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';

const Sidebar = () => {
  const icons = [
    { icon: <FaHome />, label: 'Home' },
    { icon: <FaTachometerAlt />, label: 'Dashboard' },
    { icon: <FaBell />, label: 'Notifications' },
    { icon: <FaEnvelope />, label: 'Mail' },
    { icon: <FaCog />, label: 'Settings' },
    { icon: <FaCube />, label: 'Cube' },
  ];

  return (
    <div className=" fixed z-30 w-20 h-screen bg-white flex flex-col items-center py-4">
      <div className="bg-white rounded-full mb-6">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10"
        />
      </div>
      {icons.map((item, index) => (
        <button
          key={index}
          className="text-gray-500 p-2 my-2 hover:bg-blue-700 hover:text-white rounded-lg"
          title={item.label}
        >
          <div className="text-xl">{item.icon}</div>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;