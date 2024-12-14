import { useQuery } from '@apollo/client';
import { Typography, Button } from '@mui/material';
import { USER_BASIC_INFO_QUERY } from '../graphql/queries/userBasicInfoQuery';
import { useState, useEffect, useCallback } from 'react';
import EditUserInfo from './EditUserInfo';

const BasicInformation = () => {
  const { loading, error, data } = useQuery(USER_BASIC_INFO_QUERY, {
    variables: { userId: 1 },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (data?.user) {
      setUserInfo(data.user);
    }
  }, [data]);

  const handleEdit = useCallback(() => setIsEditing(true), []);

  const handleCancel = useCallback(() => setIsEditing(false), []);

  const handleSave = useCallback(() => {
 
    setIsEditing(false);
  }, []);

  const formatDate = useCallback((timestamp: string | undefined) => {
    if (!timestamp) return '-';
    const date = new Date(Number(timestamp));
    return isNaN(date.getTime()) ? '-' : date.toISOString().split('T')[0];
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6  h-fit ">
      {isEditing ? (
        <EditUserInfo data={userInfo} handleSave={handleSave}  onCancel={handleCancel} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-semibold">
              Basic Information
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleEdit} 
              color="primary" 
              className="px-6 font-semibold"
            >
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <InfoField label="National ID Number" value={userInfo?.nationalId?.idNumber} />
            <InfoField label="National ID Expiring Date" value={formatDate(userInfo?.nationalId?.expiryDate)} />
            <InfoField label="Title" value="Mr." />
            <InfoField label="First Name" value={userInfo?.firstName} />
            <InfoField label="Father Name" value={userInfo?.fatherName} />
            <InfoField label="Grand Father Name" value={userInfo?.grandfatherName} />
            <InfoField label="Family Name" value={userInfo?.familyName} />
            <InfoField label="اسم العائلة" value={userInfo?.localizedName?.familyName} />
            <InfoField label="اسم الأول" value={userInfo?.localizedName?.firstName} />
            <InfoField label="اسم الأب" value={userInfo?.localizedName?.fatherName} />
            <InfoField label="اسم الجد" value={userInfo?.localizedName?.grandfatherName} />
            <InfoField label="Date of Birth" value={formatDate(userInfo?.dateOfBirth)} />
            <InfoField label="Gender" value={userInfo?.gender} />
            <InfoField label="Nationality" value={userInfo?.nationalities?.map((n: any) => n.country.name).join(', ')} />
            <InfoField label="Passport No." value={userInfo?.passportNumber} />
            <InfoField label="Passport Issue Date" value={formatDate(userInfo?.passportIssueDate)} />
            <InfoField label="Passport Expiry Date" value={formatDate(userInfo?.passportExpiryDate)} />
            <InfoField label="Marital Status" value={userInfo?.maritalStatus?.name} />
            <InfoField label="Dependencies" value={userInfo?.dependants} />
            <InfoField label="Additional Nationality" value="-" />
          </div>
        </>
      )}
    </div>
  );
};

const InfoField = ({ label, value }: { label: string; value: any }) => (
  <div>
    <Typography className="font-medium text-gray-600">{label}</Typography>
    <Typography className="font-semibold">{value || '-'}</Typography>
  </div>
);

export default BasicInformation;
