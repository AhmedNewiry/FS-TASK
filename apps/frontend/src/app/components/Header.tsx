import {  FaBell, FaEnvelope, FaCog} from 'react-icons/fa';
import placeholder from '../../assets/images/placeholder.png';
import { useQuery } from '@apollo/client';
import { GET_USER_NAME_QUERY } from '../graphql/queries/getUserNameQuery';

const Header = () => {
    const {data,loading,error} = useQuery(GET_USER_NAME_QUERY,{
        variables:{
          userId:1
        }
      })
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const userName = data?.user
    
    return (
      <header className="fixed z-20 right-0 left-[5%] h-16 bg-gray-100 flex items-center justify-between px-6 ">
      
        <div>
          <h1 className="text-xl font-bold text-blue-900">{`${userName.firstName} ${userName.familyName}`}</h1>
          <nav className="text-sm text-gray-600">
            <ol className="flex space-x-2">
              <li>
                <a href="/" className="text-blue-600 hover:underline">Dashboard</a>
              </li>
              <li>&gt;</li>
              <li>
                <a href="/hr" className="text-blue-600 hover:underline">HR Manage</a>
              </li>
              <li>&gt;</li>
              <li>
                <a href="/employees" className="text-blue-600 hover:underline">Employees</a>
              </li>
              <li>&gt;</li>
              <li className="text-gray-500">{`${userName.firstName} ${userName.familyName}`}</li>
            </ol>
          </nav>
        </div>
  
      
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-blue-600">
            <FaBell className="text-xl" />
          </button>
          <button className="text-gray-500 hover:text-blue-600">
            <FaEnvelope className="text-xl" />
          </button>
          <button className="text-gray-500 hover:text-blue-600">
            <FaCog className="text-xl" />
          </button>
          <img
            src={placeholder}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
    );
  };
  
  export default Header;
  