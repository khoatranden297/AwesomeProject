import React, { useState, Component } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal, Pressable, ScrollView, EditText,Alert } from 'react-native'
import { Provider } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { StatusBar } from 'react-native';

const SignUpScreens = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const [isPasswwordShow, setIsPasswordShow] = useState(true);
    const [isLogged, setIsLogged] = useState(false)

    

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
      saveDataToAsyncStorage("AccessToken",value);
    return (
        <ScrollView style={styles.container}>
             <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Login")
                        console.log('chuyển qua trang tiếp theo');
                    }
}
>
<Ionicons
                        style={{
                            marginTop: 10,
                            position: "absolute",
                            left: 12,
                        }}
                        name="arrow-back-outline" size={30} color="#0d0d0d"
                    />
                </TouchableOpacity>
                <Text style={styles.txt1}>
                    Let's Sign you in.
                </Text>
                <Text style={styles.txt2}>
                    Welcome back
                </Text>
                <Text style={styles.txt2}>
                    You've been missed!
                </Text>
                <View style={{ paddingLeft: 10, paddingRight: 10, }}>


                    <Text style={styles.txtUser}>Username or Email</Text>
                    <View
                        style={{
                            marginLeft: 10,
                            marginTop: 10,
                            width: "100%",
                            height: 55,
                            borderColor: "grey",
                            borderWidth: 1,
                            borderRadius: 12,
                            alignItems: "left",
                            justifyContent: "center",
                            paddingLeft: 20,
                        }}
                    >
                        <TextInput
                            placeholder='Enter username or Email'
                            placeholderTextColor={"black"}
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
                    </View>
                    <Text style={styles.txtPass}>Password</Text>
                    <View
                        style={{
                            marginLeft: 10,
                            marginTop: 5,
                            width: "100%",
                            height: 55,
                            borderColor: "grey",
                            borderWidth: 1,
                            borderRadius: 12,
                            alignItems: "left",
                            justifyContent: "center",
                            paddingLeft: 20,
                        }}
                    >



                        <TextInput
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder='Enter Password'
                            placeholderTextColor={"black"}
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
                                    <Icon name="eye-slash" size={20} color="#0d0d0d" />
                                ) : (
                                    <Icon name="eye" size={20} color="#0d0d0d" />
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
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Text style={{ fontSize: 10, marginLeft: 160, marginTop: 18, }}>Or</Text>
                        <View
                            style={{
                                position: "absolute",
                                right: 12,
                                marginTop: 25,
                                width: "45%",
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
}}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: "white", width: "100%", height: 80, flexDirection: "row", marginTop: 30, marginLeft: 80, }}
                >
                    <View style={styles.img3}>
                        <Image
                            style={styles.hinh1}
                            source={require("../images/google.jpg")}
                        />
                    </View>

                    <View style={styles.img2}>
                        <Image
                            style={styles.hinh1}
                            source={require("../images/linkedin.png")}
                        />
                    </View>
                    <View style={styles.img3}>
                        <Image
                            style={styles.hinh2}
                            source={require("../images/facebook.jpg")}
                        />
                    </View>


                </View>

                <View style={{ backgroundColor: "white", width: "100%", height: 30, flexDirection: "row", marginTop: 50, }} >
                    <Text style={styles.txt4}>Don't have an account?</Text>
                    <Text style={styles.txt5}
                        onPress={() => {
                            navigation.navigate("Regis")
                            console.log("đăng kí")
                        }}
                    >Register</Text>
                </View>



                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={ onLogin}
                >
                    <Text style={styles.textLogin} >Login</Text>
                </TouchableOpacity>





            </View>

        </ScrollView>
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
        marginTop: 30,
        fontSize: 15,
        fontWeight: "500",
        color: "#000000",
        marginLeft: 10,
    },
    txtPass: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: "500",
        color: "#000000",
        marginLeft: 10,
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
        width: "100%",
        height: 60,
        alignContent: "center",
        borderRadius: 20,
        backgroundColor: "#1a1a1a",
    },
    textLogin: {
        marginTop: 15,
        fontSize: 20,
        textAlign: "center",
        color: "white",
        fontWeight: "500",
        fontFamily: "tahoma"
    },
})