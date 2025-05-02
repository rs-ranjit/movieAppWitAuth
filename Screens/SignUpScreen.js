import {
  Image,
  TextInput,
  View,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/authContext';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {register, setUserData} = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSwitch = () => {
    navigation.replace('SignInScreen');
  };

  const handlePress = async () => {
    if (username === '' || email === '' || password === '' || profile === '') {
      setUsername('');
      setPassword('');
      setEmail('');
      setProfile('');
      Alert.alert('Sign Up Error', 'Complete the credentials');
    }
    setLoading(true);

    const response = await register(username, email, password, profile);

    const result = await setUserData(username, email, profile, response.uid);
    setLoading(false);
    if (!response.success) {
      console.log('Sign up Error', response.msg);
    } else if (!result.userAddedSuccess) {
      console.log('Sign Up Error', result.msg);
    } else {
      console.log('User Signed Up');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor="purple" />
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../assets/N.webp')}
          resizeMode="containe"
          style={{width: wp(90), height: hp(35)}}
        />
      </View>
      <View
        style={{
          gap: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: '700', fontSize: wp(10)}}>Sign Up</Text>
        <View style={{gap: 6, marginTop: 20}}>
          <TextInput
            placeholder="Username.."
            style={styles.inputCont}
            placeholderTextColor="grey"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Email..."
            style={styles.inputCont}
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password..."
            style={styles.inputCont}
            placeholderTextColor="grey"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="ProfileUrl..."
            style={styles.inputCont}
            placeholderTextColor="grey"
            value={profile}
            onChangeText={setProfile}
          />
        </View>
        <TouchableOpacity style={styles.btnStyle} onPress={handlePress}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text style={{color: 'grey'}}>
          Already have an account?
          <Pressable onPress={handleSwitch}>
            <Text style={{color: 'purple'}}>Sign In</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  inputCont: {
    backgroundColor: '#292E30',
    color: 'white',
    width: wp(90),
    height: hp(7),
    borderRadius: 10,
    marginTop: 10,
    fontSize: 17,
    paddingLeft: 20,
  },
  btnStyle: {
    width: wp(50),
    backgroundColor: 'purple',
    height: hp(6),
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 30,
  },
});
