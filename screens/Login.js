import React, { useState } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal, Pressable, ScrollView, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const [isPasswwordShow, setIsPasswordShow] = useState();

    const checkLogin = async() =>{
        try {
            const password = await AsyncStorage.getItem('AcessToken',password);
            if (password) {
            navigation.replace("Pass")
              console.log('Người dùng đã đăng nhập');
              
            } else {
                navigation.replace("SignUp")
              console.log('Người dùng chưa đăng nhập');
        
            }
          } catch (error) {
            console.log('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
          }
        };
      
        checkLogin();
 
    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingTop: 20 }}>
                <Image source={require("../images/hainguoi.png")} />
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.text1}>Welcome to</Text>
                    <Text style={styles.text1}>SeekJob</Text>
                    <Text style={styles.text2}>Lorem ipsum dolor sit amet, consectetur
                    </Text>
                    <Text style={{ fontSize: 15, textAlign: "center", }}>adipiscing elit, sed do eiusmod tempor</Text>
                    <Text style={{ fontSize: 15, textAlign: "center", }}>incididunt ut labore et</Text>
                    <Text style={{ fontSize: 15, textAlign: "center", }}> dolore magna aliqua</Text>
                </View>
                <View style={{ paddingTop: 10, }}>
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
                </View>
            </View>


        </ScrollView>

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

        fontSize: 35,
        textAlign: "center",
        color: "#000000",
        fontWeight: "700",


    },
    text2: {
        fontSize: 15,
        textAlign: "center",
    },
    btnLogin: {
        marginTop: 20,
        width: "100%",
        height: 60,
        alignContent: "center",
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: "#1a1a1a",
    },
    textLogin: {
        marginTop: 15,
        fontSize: 20,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontFamily: "tahoma"
    },
    btnRegis: {
        marginTop: 20,
        width: "100%",
        height: 60,
        alignContent: "center",
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: "grey",
    },
    textRegis: {
        marginTop: 15,
        fontSize: 20,
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontFamily: "tahoma"
    },

})