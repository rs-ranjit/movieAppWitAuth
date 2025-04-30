import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/authContext';
import SignUpScreen from './SignUpScreen';

const SignInScreen = () => {
  const navigation = useNavigation();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setloading] = useState(false);

  const {login} = useAuth();

  const handleSwitch = () => {
    navigation.replace('SignUpScreen');
  };

  const handlePress = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In Error ', 'Complete the credential');
      return;
    }
    setloading(true);

    const response = await login(emailRef.current, passwordRef.current);
    setloading(false);
    if (!response.success) {
      Alert.alert('Sign in', response.msg);
    } else {
      console.log('Done');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor="purple" />
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../assets/N.webp')}
          resizeMode="contain"
          style={{width: wp(90), height: hp(35)}}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', gap: 8}}>
        <Text style={{fontWeight: '700', fontSize: wp(10)}}>Sign In</Text>
        <View style={{gap: 10, marginTop: 50}}>
          <View>
            <TextInput
              placeholder="Email..."
              onChangeText={text => (emailRef.current = text)}
              value={emailRef}
              keyboardType="email-address"
              style={styles.inputCont}
              placeholderTextColor="grey"
            />
          </View>
          <TextInput
            onChangeText={text => (passwordRef.current = text)}
            value={passwordRef}
            placeholder="Password..."
            placeholderTextColor="grey"
            secureTextEntry
            style={styles.inputCont}
          />
        </View>
        <View style={{marginLeft: wp(65), marginTop: 10}}>
          <Text style={{color: 'purple'}}>Forgot Password?</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="purple" />
        ) : (
          <TouchableOpacity style={styles.btnStyle} onPress={handlePress}>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              Sign In
            </Text>
          </TouchableOpacity>
        )}
        <Text style={{color: 'grey'}}>
          Don't have an account?
          <Pressable onPress={handleSwitch}>
            <Text style={{color: 'purple'}}>Sign up</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  inputCont: {
    backgroundColor: '#292E30',
    width: wp(90),
    height: hp(7),
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 20,
    fontSize: 20,
    color: 'white',
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
