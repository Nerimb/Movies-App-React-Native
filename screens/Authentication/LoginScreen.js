import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { AuthContext } from '@Context';
import Users from '@Users';
import GlobalColors from '@GlobalColors';
import SignUpScreen from './SignUpScreen';


const SignInScreen = ({navigation}) => {
    
    //Giriş dataları için
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { signIn } = React.useContext(AuthContext);

    //Kullanıcı adı kontrolü
    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    //Şifre kontrolü
    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                secureTextEntry: !data.secureTextEntry,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

        const foundUser = Users.filter( item => {
            return userName === item.username && password === item.password;
        } );

        if ( data.username.length === 0 || data.password.length === 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( foundUser.length === 0 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        signIn(foundUser);
    }
    
    const Stack = createNativeStackNavigator();

    const directEnter = () => {
        navigation.navigate('Home')
    }

    return (
        <NavigationContainer independent={true}>
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome!</Text>
                </View>
                <View 
                    style={[styles.footer, {
                        backgroundColor: 'white'
                    }]}
                >
                    <Text style={[styles.text_footer, {
                        color: 'black'
                    }]}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome 
                            name="user-o"
                            color={'black'}
                            size={20}
                        />
                        <TextInput 
                            placeholder="Your Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: 'black'
                            }]}
                            autoCapitalize="none"
                            keyboardType="ascii-capable"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                        />

                    </View>
                    { data.isValidUser ? null : 
                    <View>
                    <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </View>
                    }
                    
                    
                    <Text style={[styles.text_footer, {
                        color: 'black',
                        marginTop: 35
                    }]}>Password</Text>
                    
                    <View style={styles.action}>
                    <FontAwesome 
                            name="key"
                            color={'black'}
                            size={20}
                        />
                        <TextInput 
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: 'black'
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                        </TouchableOpacity>
                    </View>
                    { data.isValidPassword ? null : 
                    <View>
                    <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </View>
                    }
                    
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {
                              loginHandle( data.username, data.password )}}>

                            <Text style={[styles.textSign, {
                                color:'teal'
                            }]}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Sign Up')}
                            style={[styles.signIn, {
                                borderColor: 'white',
                            }]
                            }>
                            <Text
                            style={[styles.textUpper, {color: '#009387'}]}
                            >Don't Have an Account?</Text>
                            <Text
                            style={[styles.textSign, {color: '#009387'}]}
                            >Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Movies')}>
                            <View style={{marginVertical:20}}>
                                <Text>
                                    Direct Enter
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
      </NavigationContainer>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: GlobalColors.Maroon
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#009387',
        borderWidth: 1,
        marginTop: 15,
        marginHorizontal:8,

    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textUpper:{
        fontSize: 12,

    }
  });