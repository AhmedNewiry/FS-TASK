import React from 'react';
import { Tabs, Tab, Box, Typography, Card, Avatar, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import BasicInformation from './components/BasicInformation';
import TabPanel from './components/TabPanel';
import placeholder from '../assets/images/placeholder.png';
import 'tailwindcss/tailwind.css';
import { useQuery } from '@apollo/client';
import { GET_USER_NAME_QUERY } from './graphql/queries/getUserNameQuery';
import Header from './components/Header';
import Sidebar from './components/SideBar';
const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const {data,loading,error} = useQuery(GET_USER_NAME_QUERY,{
    variables:{
      userId:1
    }
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  
  const userName = data?.user
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <div className='w-full flex gap-2 max-h-full overflow-hidden '>
       <div className='w-[5%] bg-red-300 max-h-[100vh]'>

            <Sidebar/>
       </div>
    <div className='flex flex-col w-full'>

         <div className='w-full '>
            <Header />

         </div>
 
    <div className="mt-12 px-4 gap-4 min-h-screen bg-gray-100 flex justify-center  py-8 text-[#051D49] w-full">
     
      <Card className="w-1/4 h-fit bg-white p-6 shadow-md rounded-2xl flex flex-col items-center relative">
        <div className="relative w-full mb-4 flex flex-col items-start">
   
        <div className="relative w-30 h-30 mb-4">
                <Avatar
                  alt={`${userName.firstName} ${userName.familyName}`}
                  src={placeholder}
                  className="relative w-[120px] h-[120px] rounded-[39px]"
                />
                <IconButton 
                  color="primary" 
                  aria-label="upload picture" 
                  component="span" 
                  className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-300 shadow-sm"
                >
                  <PhotoCameraIcon fontSize="small" className="text-gray-600" />
                </IconButton>
       
        </div>
        </div>
        <Typography
          variant="h6"
          className="font-extrabold w-full  mb-2"
        >
        {`${userName.firstName} ${userName.familyName}`}
        </Typography>
        <Typography
          variant="body2"
          className="text-gray-500 w-full mb-4"
        >
          Senior Product Manager
        </Typography>
        <hr className="w-full border-t border-gray-200 my-4" />
        <Box className="w-full">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            orientation="vertical"
            TabIndicatorProps={{ style: { display: 'none' } }}
            className="flex flex-col gap-2"
          >
            <Tab
              label="Personal Information"
              id="tab-0"
              aria-controls="tabpanel-0"
              className={`w-full text-left font-bold px-4 py-2 rounded-lg ${
                activeTab === 0
                  ? 'bg-blue-100 text-blue-700 '
                  : ' hover:bg-gray-100'
              }`}
            />
            <Tab
              label="Financial Information"
              id="tab-1"
              aria-controls="tabpanel-1"
              className={`w-full text-left font-bold px-4 py-2 rounded-lg ${
                activeTab === 1
                ? 'bg-blue-100 text-blue-700 '
                  : ' hover:bg-gray-100'
                }`}
            />
          </Tabs>
        </Box>
      </Card>

         <div className="w-3/4 p-0">
        <TabPanel value={activeTab}  index={0}  >
          <BasicInformation />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <div className="bg-white shadow-md rounded-lg p-6">
            <Typography variant="h6" className="font-semibold mb-4">
              Financial Information
            </Typography>
            <div className="flex gap-16 w-full">
                 <div>

                    <Typography>Bank Name</Typography>
                    <Typography className="font-semibold">CIB</Typography>
                 </div>
                 <div>

                    <Typography>IBAN</Typography>
                    <Typography className="font-semibold">12346546413216446</Typography>
                 </div>
            </div>
          </div>
        </TabPanel>
      </div>
    </div>
    </div>
</div>
  );
};

export default App;
