import {View, Text, Button} from 'react-native';
import React from 'react';
import {useAuth} from '../context/authContext';

const ProfileScreen = () => {
  const {logout} = useAuth();

  const handlePress = async () => {
    const resp = await logout();
    if (resp.success) {
      console.log('User logged out successfully');
    } else {
      console.log('Error while logging out', resp.message);
    }
  };

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="logout" onPress={handlePress} />
    </View>
  );
};

export default ProfileScreen;
