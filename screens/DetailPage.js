import React, { useState, Component } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, Box, TouchableOpacity, ImageBackground, Modal, Pressable, ScrollView, EditText } from 'react-native'
import { Provider } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailPage = ({ navigation }) => {
    const [isNotificattion, setIsNotificattion] = useState();
    const [back,setback] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const [isLogged, setIsLogged] = useState();

    const onSubmit = async() =>{
        await AsyncStorage.setItem('token',username )
        
        if(username == username && password == username){
            console.log('Đăng nhập thành công')
            navigation.navigate("HomePage")
        }else{
            console.log('Đăng nhập thất bại')
            Alert.alert("Đăng nhập thất bại","Vui lòng đăng nhập lại")
        }
    }

    const tokenlogin = async() =>{
        const value = await AsyncStorage.getItem('token')
        if(value !== null){
            <Ionicons
            style={{
                marginTop: 10,
                position: "absolute",
                // width:30,
                marginLeft: 10,
                display:"none"

            }}
            name="chevron-back" size={30} color="#0d0d0d"
        />
        }else{
            <Ionicons
            style={{
                marginTop: 10,
                position: "absolute",
                // width:30,
                marginLeft: 10,
                display:"none"

            }}
            name="chevron-back" size={30} color="#0d0d0d"/>
        }
    }
    tokenlogin()

    return (
        <ScrollView >

            <ImageBackground
                style={styles.imgH}
                source={require('../images/yoga.jpg')}
            >

                <TouchableOpacity


                    onPress={onSubmit}
                >
                 
                    

                </TouchableOpacity>
                <TouchableOpacity


                    onPress={() => setIsNotificattion(!isNotificattion)}
                >
                      <Ionicons
                            style={{
                                marginTop: 10,
                                position: "absolute",
                                right: 12,
                                marginRight: 10,
    
                            }}
                            name="notifications-outline" size={30} color="#0d0d0d"
    
                        />
                         {
                        isNotificattion == true ? (
                            <Icon

                                style={{
                                    marginTop: 10,
                                    position: "absolute",
                                    right: 12,
                                    marginRight: 15,

                                }}

                            />



                        ) : (
                            <Icon

                                style={{
                                    marginTop: 10,
                                    position: "absolute",
                                    right: 12,
                                    marginRight: 15,

                                }}
                                name="circle" size={10} color="red"

                            />
                        )

                    }
                   
                 
                </TouchableOpacity>

            </ImageBackground>

            <View style={styles.container}>
                <Text style={styles.txt1}>Tree Pose</Text>
                <View style={styles.containerC}>
                    <Text style={styles.txtC}>20 min</Text>
                </View>
                <Text style={{ fontSize: 12, textAlign: "right", marginTop: 20, marginRight: 30, }}>lorem ipsum doctor sit amet, consectetur adipscing elit.Etiam</Text>
                <Text style={{ fontSize: 12, textAlign: "right", marginLeft: 7, marginRight: 18, }}>aliquam, augue id malesuada lobortis, diam mi sol Lorem ipsum</Text>
                <Text style={{ fontSize: 12, textAlign: "right", marginTop: 1, marginRight: 18, }}>dolor sit amet, consectetur adipiscing elit. Etiam aliquam, augue</Text>
                <Text style={{ fontSize: 12, textAlign: "left", marginTop: 1, marginLeft: 35, }}>id malesuada lobortis, diam mi sol</Text>
                <View style={styles.list1}

                >
                    <Image
                        style={{
                            width: 70,
                            height: 70,
                            marginTop: 4,
                            marginLeft: 5,
                            alignItems: "center",
                            opacity: 0.8,

                        }}
                        source={require("../images/hinhmot.jpg")}

                    />
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.txtK}>
                            Yoga club
                        </Text>
                        <Text style={styles.txtH}>
                            Lorum ipsum dolar sit amet
                        </Text>
                    </View>
                </View>
                <View style={styles.list1}>
                    <Image
                        style={{
                            width: 70,
                            height: 70,
                            marginTop: 4,
                            marginLeft: 5,
                            alignItems: "center",
                            opacity: 0.8,

                        }}
                        source={require("../images/hinhhai.jpg")}

                    />
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.txtK}>
                            Yoga club
                        </Text>
                        <Text style={styles.txtH}>
                            Lorum ipsum dolar sit amet
                        </Text>
                    </View>
                </View>
                <View style={styles.list1}>
                    <Image
                        style={{
                            width: 70,
                            height: 70,
                            marginTop: 4,
                            marginLeft: 5,
                            alignItems: "center",
                            opacity: 0.8,

                        }}
                        source={require("../images/hinhba.jpg")}

                    />
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.txtK}>
                            Yoga club
                        </Text>
                        <Text style={styles.txtH}>
                            Lorum ipsum dolar sit amet
                        </Text>
                    </View>
                </View>
            </View>


        </ScrollView>

    )
}
export default DetailPage
const styles = StyleSheet.create({
    container: {


        width: "100%",
        height: 500,
        backgroundColor: "white",
        borderRadius: 35,
    },

    imgH: {
        width: "100%",
        height: 250,


    },
    txt1: {
        marginTop: 35,
        marginLeft: 30,
        fontSize: 20,
        fontWeight: "700",
        color: "#0d0d0d",
    },
    containerC: {
        width: 60,
        height: 30,
        borderRadius: 7,
        backgroundColor: "#ff5c33",
        position: "absolute",
        right: 12,
        marginRight: 20,
        marginTop: 30,


    },
    txtC: {
        fontSize: 15,
        color: "white",
        fontWeight: "500",
        marginTop: 4,
        marginLeft: 5,
    },
    list1: {
        flexDirection: "row",
        backgroundColor: "#f8f5f9",
        width: "90%",
        height: 70,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 20,
    },
    txtK: {
        fontSize: 15,
        width: 100,
        height: 20,
        fontWeight: "500",
        textAlign: "center",
        color: "#0d0d0d",
        marginLeft: 20,
        marginTop: 10,

    },
    txtH: {
        fontSize: 13,
        color: "#0d0d0d",
        marginLeft: 40,
        textAlign: "left",
        marginTop: 10,
      

    }

})