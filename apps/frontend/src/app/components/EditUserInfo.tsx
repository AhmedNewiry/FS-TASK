import { useMutation } from '@apollo/client';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { UPDATE_USER_MUTATION } from '../graphql/mutations/updateUserMutation';
import { GET_USER_NAME_QUERY } from '../graphql/queries/getUserNameQuery';
import { USER_BASIC_INFO_QUERY } from '../graphql/queries/userBasicInfoQuery';

const EditUserInfo = ({ data, onCancel , handleSave}:{ data: any,  onCancel: () => void, handleSave:()=>void }) => {
  const formattedData = {
    ...data,
    nationalId: {
      ...data.nationalId,
      expiryDate: data.nationalId?.expiryDate 
        ? new Date(Number(data.nationalId.expiryDate)).toISOString().split('T')[0] 
        : ''
    }
  };

  const { control, handleSubmit, reset } = useForm({ defaultValues: formattedData });
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION);

  const removeTypename = (obj: any) => 
    JSON.parse(JSON.stringify(obj), (key, value) => key === '__typename' ? undefined : value);

  const prepareUpdateUserInput = (userData: any) => {
    const cleanedData = removeTypename(userData);
    return {
      ...cleanedData,
      nationalId: {
        ...cleanedData.nationalId,
        expiryDate: cleanedData.nationalId?.expiryDate ? new Date(cleanedData.nationalId.expiryDate).toISOString() : null,
      },
      nationalities: cleanedData.nationalities?.map((nationality: any) => ({
        ...nationality,
        country: {
          ...nationality.country,
          id: nationality.country?.id ? String(nationality.country.id) : null,
        },
        countryId: nationality.countryId || nationality.country?.id,
      })) || [],
      maritalStatus: {
        ...cleanedData.maritalStatus,
        id: cleanedData.maritalStatus?.id ? String(cleanedData.maritalStatus.id) : null,
      },
    };
  };

  const onSubmit = async (formData: any) => {
    try {
      const { data } = await updateUser({
        variables: {
          userId: 1,
          updateUserInput: prepareUpdateUserInput(formData)
        },
        refetchQueries:[GET_USER_NAME_QUERY, USER_BASIC_INFO_QUERY]
      });
      console.log('Updated Data from API:', data);
      handleSave()
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Typography variant="h6" className="font-semibold mb-4">Edit Basic Information</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller 
          name="firstName" 
          control={control} 
          render={({ field }) => (
            <TextField label="First Name" {...field} fullWidth margin="normal" />
          )} 
        />
        <Controller 
          name="fatherName" 
          control={control} 
          render={({ field }) => (
            <TextField label="Father Name" {...field} fullWidth margin="normal" />
          )} 
        />
        <Controller 
          name="grandfatherName" 
          control={control} 
          render={({ field }) => (
            <TextField label="Grandfather Name" {...field} fullWidth margin="normal" />
          )} 
        />
        <Controller 
          name="familyName" 
          control={control} 
          render={({ field }) => (
            <TextField label="Family Name" {...field} fullWidth margin="normal" />
          )} 
        />
        <Controller 
          name="nationalId.idNumber" 
          control={control} 
          render={({ field }) => (
            <TextField label="National ID Number" {...field} fullWidth margin="normal" />
          )} 
        />
        <Controller 
          name="nationalId.expiryDate" 
          control={control} 
          render={({ field }) => (
            <TextField label="National ID Expiry Date" type="date" {...field} fullWidth margin="normal" />
          )} 
        />
        <Controller 
          name="maritalStatus.name" 
          control={control} 
          render={({ field }) => (
            <TextField label="Marital Status" {...field} fullWidth margin="normal" />
          )} 
        />
        <Controller 
          name="dependants" 
          control={control} 
          render={({ field }) => (
            <TextField label="Dependants" type="number" {...field} fullWidth margin="normal" />
          )} 
        />
        {error && <Typography color="error">Error updating user: {error.message}</Typography>}
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>Save</Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        </Box>
      </form>
    </div>
  );
};

export default EditUserInfo;
