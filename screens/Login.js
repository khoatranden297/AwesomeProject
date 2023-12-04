import React, { useState } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal, Pressable, ScrollView, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const [isPasswwordShow, setIsPasswordShow] = useState();

    const onSubmit = async() =>{
        await AsyncStorage.setItem('token',username )
        
        if(username == 'admin' && password == '123456'){
            console.log('Đăng nhập thành công')
            navigation.navigate("HomePage")
        }else{
            navigation.navigate("SignUp")
            console.log('Chưa đăng nhập tài khoản')
           
        }   
    }

    const tokenlogin = async() =>{
        const value = await AsyncStorage.getItem('token')
        if(value !== null){
            navigation.navigate("HomePage")
            console.log("log's")
        }else{
            navigation.navigate("SignUp")
            console.log("log")
        }
    }
    tokenlogin()
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
                        onPress={onSubmit}
                    >
                        <Text style={styles.textLogin} >Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnRegis}
                        onPress={() => {
                            navigation.navigate("Regis")
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