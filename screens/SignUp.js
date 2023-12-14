import React, { useState, Component } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal, Pressable, ScrollView, EditText, Alert, ImageBackground } from 'react-native'
import { Provider } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { StatusBar } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const SignUpScreens = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const [isPasswwordShow, setIsPasswordShow] = useState(true);
    const [isLogged, setIsLogged] = useState(false)
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [showError, setShowError] = useState(false);


    const onLogin = async () => {
        try {
            await axios.post('http://erp.lacty.com.vn:5000/user/login', {
                username: username,
                password: password,
            }).then(async (response) => {
                await AsyncStorage.setItem("AcessToken", response.data.accessToken);
                console.log('Dữ liệu:', response.data);
                console.log(response.data.accessToken);

                if (response.data.authenticated) {
                    navigation.replace('HomePage');
                } else {
                    Alert.alert('Sai', 'Vui lòng đăng nhập lại');
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const saveDataToAsyncStorage = async (accessToken, value) => {
        try {
            await AsyncStorage.setItem(accessToken, JSON.stringify(value));
            console.log('Dữ liệu đã được lưu thành công vào AsyncStorage.');
        } catch (error) {
            console.log('Lỗi khi lưu dữ liệu vào AsyncStorage:', error);
        }
    };
    const value = { key: 'AccessToken' };
    saveDataToAsyncStorage("AccessToken", value);
    // check đăng nhập không được bỏ trống
    const handlePress = () => {
        if (field1 === '' || field2 === '') {
          setShowError(true);
        } else {
          // Xử lý logic khi cả hai trường được điền đầy đủ
          setShowError(false);
        }
      };
    return (
        <View style ={{
            width: "100%",
            height: "100%",
            backgroundColor: 'transparent  '
        }}>


            <ImageBackground
                source={require("../images/bck1Login.jpg")}
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: 'transparent'
                }}
            >

                <View >
                    <View>
                  

                        <Text style={styles.txtUser}>Username or Email</Text>
                        <View
                            style={{
                                marginLeft: 25,
                                marginTop: 10,
                                width: 350,
                                height: 55,
                                borderColor: "#ffffff",
                                borderWidth: 2,
                                borderRadius: 10,
                                alignItems: "left",
                                justifyContent: "center",
                                paddingLeft: 20,
                            }}
                        >
                            <TextInput
                                placeholder='Enter username or Email'
                                placeholderTextColor={"#ffffff"}
                                color={"#ffffff"}
                                value={username}
                                onChangeText={text => setUsername(text)}
                            />
                        </View>
                        <Text style={styles.txtPass}>Password</Text>
                        <View
                            style={{
                                marginLeft: 25,
                                marginTop: 5,
                                width: 350,
                                height: 55,
                                borderColor: "#ffffff",
                                borderWidth: 2,
                                borderRadius: 10,
                                alignItems: "left",
                                justifyContent: "center",

                            }}
                        >
                            <TextInput
                                value={password}
                                onChangeText={text => setPassword(text)}
                                placeholder='Enter Password'
                                placeholderTextColor={"#ffffff"}
                                color={"#ffffff"}
                                secureTextEntry={isPasswwordShow}
                                style={{
                                    width: "100%",
                                }}

                            />
                            <TouchableOpacity
                                onPress={() => setIsPasswordShow(!isPasswwordShow)}

                                style={{
                                    position: "absolute",
                                    right: 12,
                                }}
                            >
                                {
                                    isPasswwordShow == true ? (
                                        <Icon name="eye-slash" size={20} color="#ffffff" />
                                    ) : (
                                        <Icon name="eye" size={20} color="#ffffff" />
                                    )

                                }

                            </TouchableOpacity>


                        </View>



                        <View style={{ flexDirection: "row", height: 35, }}>
                            <View
                                style={{
                                    marginTop: 25,
                                    position: "absolute",
                                    left: 12,
                                    width: "45%",
                                    borderBottomColor: '#ffffff',
                                    borderBottomWidth: 1,

                                }}
                            />
                            <Text style={{ fontSize: 10, marginLeft: 190, marginTop: 18, color: "#ffffff" }}>Or</Text>
                            <View
                                style={{
                                    position: "absolute",
                                    right: 12,
                                    marginTop: 25,
                                    width: "45%",
                                    borderBottomColor: '#ffffff',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </View>




                    </View>





                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={onLogin}
                    >
                        <Text style={styles.textLogin} >Login</Text>
                    </TouchableOpacity>





                </View>

            </ImageBackground>
        </View>
    )
}
export default SignUpScreens
const styles = StyleSheet.create({
    container: {

        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "white",
    },
    txt1: {
        marginTop: 80,
        fontSize: 25,
        fontWeight: "500",
        color: "black",
        marginLeft: 20,
    },
    txt2: {
        marginTop: 15,
        fontSize: 25,
        fontWeight: "400",
        color: "grey",
        marginLeft: 20,
    },
    txtUser: {
        marginTop: 250,
        fontSize: 15,
        fontWeight: "700",
        color: "#ffffff",
        marginLeft: 25,
    },
    txtPass: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: "700",
        color: "#ffffff",
        marginLeft: 25,
    },

    img1: {
        marginTop: 10,
        marginLeft: 80,
        width: 40,
        height: 40,
        borderColor: "grey",

        borderWidth: 1,
        borderRadius: 10,
        // alignItems:"left",
        justifyContent: "center",
        paddingLeft: 20,
        resizeMode: "cover"
    },
    img2: {
        alignItems: "center",
        marginTop: 10,
        marginLeft: 20,
        width: 40,
        height: 40,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        // alignItems:"left",

    },
    hinh1: {
        alignItems: "center",
        marginTop: 7,
        width: 25,
        height: 25,
    },
    img3: {
        alignItems: "center",
        marginTop: 10,
        marginLeft: 20,
        width: 40,
        height: 40,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        // alignItems:"left",

    },
    hinh2: {
        alignItems: "center",
        marginTop: 7,
        width: 25,
        height: 25,
    },
    hinh3: {
        // alignItems:"center",    
        marginTop: 7,
        width: 30,
        height: 30,
        marginRight: 30,

    },
    img3: {
        alignItems: "center",
        marginTop: 10,
        marginLeft: 20,
        width: 40,
        height: 40,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        // alignItems:"left",
    },
    txt4: {
        width: 150,
        marginTop: 5,
        marginLeft: 80,
    },
    txt5: {
        width: 150,
        marginTop: 5,
        marginLeft: 2,
        color: "black",
        fontWeight: "500",



    },
    btnLogin: {
        width: 300,
        height: 60,
        marginLeft: 50,
        alignContent: "center",
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: "#ffffff",
        elevation: 4,
    },
    textLogin: {
        marginLeft: 10,
        marginTop: 15,
        fontSize: 20,
        textAlign: "center",
        color: "black",
        fontWeight: "700",
        fontFamily: "tahoma"
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
      },
})