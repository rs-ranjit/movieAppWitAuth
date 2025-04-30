import {View, Text, Button} from 'react-native';
import React from 'react';
import {useAuth} from '../context/authContext';

const ProfileScreen = () => {
  const {logout} = useAuth();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="logout" onPress={() => logout()} />
    </View>
  );
};

export default ProfileScreen;
