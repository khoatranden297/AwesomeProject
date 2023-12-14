import React, { useState,useEffect } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal, Pressable, ScrollView, Button, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, isToday } from 'date-fns';
import axios from "axios";

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const [isPasswwordShow, setIsPasswordShow] = useState();
    const [currentTime, setCurrentTime] = useState('');

    // ngày giờ 
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const formattedTime = isToday(now) ? format(now, 'HH:mm') : '';
        setCurrentTime(formattedTime);
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    // hiển thị ngày
    const now = new Date();
  const formattedDate = isToday(now) ? format(now, 'EEEE, do MMMM, yyyy') : '';

    const checkLogin = async() =>{
        try {
            const password = await AsyncStorage.getItem('AcessToken',password);
            if (password) {
            // navigation.navigate("Pass")
              console.log('Người dùng đã đăng nhập');
              
            } else {
                // navigation.navigate("SignUp")
              console.log('Người dùng chưa đăng nhập');
        
            }
          } catch (error) {
            console.log('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
          }
        };
      
        checkLogin();
 
    return (
            <View>

            <ImageBackground 
                source={require("../images/bck1Login.jpg")}
                style ={{
                    width:"100%",
                    height:"100%"
                }}
            >
              
               
                    <Text style={styles.text1}>Welcome to</Text>
                    <Text style={styles.text2}>SeekJob</Text>
                    

                
                <View style={{ paddingTop: 10, }}>
                <Image
                        style={{
                            width:100,
                            height:100,
                            borderRadius:100,
                            marginLeft:145,
                            marginTop:50,
                        }}
                        source={require('../images/logo1.jpg')}
                    />
                    <TouchableOpacity
                        style={styles.btnLogin}
                        // onPress={onSubmit}
                    >
                        <Text style={styles.textLogin} >Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnRegis}
                        onPress={() => {
                            navigation.navigate("SignUp")
                            console.log('chuyển qua trang đăng kí')
                        }}
                    >
                        <Text style={styles.textRegis} >Register</Text>
                       
                    </TouchableOpacity>
                    <Text style={styles.text3}>{currentTime}</Text>
                    <Text style={styles.text4}>{formattedDate}</Text>
                </View>
                 
            </ImageBackground>
        </View>

    )
}
export default LoginScreen
const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "white",
    },
    hinhanh: {
        width: "100%",
        height: 40,
    },
    text1: {
        marginTop:50,
        fontSize: 40,
        textAlign: "center",
        color: "white",
        fontWeight: "700",


    },
    text2: {
        fontSize: 40,
        textAlign: "center",
        color: "white",
        fontWeight: "700",
    },
    text3: {
        marginTop:30,
        fontSize: 30,
        textAlign: "center",
        color: "white",
        fontWeight: "500",
    },
    text4: {
        marginTop:20,
        fontSize: 15,
        textAlign: "center",
        color: "white",
        fontWeight: "500",
    },
    btnLogin: {
        marginTop: 50,
        width: 250,
        height: 60,
        alignContent: "center",
        borderRadius: 10,
        backgroundColor: "white",
        marginLeft:75,
        elevation:3,
    },
    textLogin: {
        marginTop: 15,
        fontSize: 20,
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontFamily: "tahoma"
        
    },
    btnRegis: {
        marginTop: 20,
        width: 250,
        height: 60,
        alignContent: "center",
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "transparent",
        borderWidth:2,
        marginLeft:75,
        elevation:3,
        borderColor:"white"
    },
    textRegis: {
        marginTop: 15,
        fontSize: 20,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontFamily: "tahoma"
    },

})