import React, { useState, Component, useEffect } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, Box, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Pressable, ScrollView, EditText } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { Buffer } from 'buffer';
import { Rating } from 'react-native-ratings';
import Back from 'react-native-vector-icons/Ionicons';
import Dots from 'react-native-vector-icons/Entypo'
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-native-swiper';
import Logout from 'react-native-vector-icons/MaterialIcons';
import Dates from 'react-native-vector-icons/Fontisto';
import Birthday from 'react-native-vector-icons/FontAwesome';
import Address from 'react-native-vector-icons/Entypo'
import Check from 'react-native-vector-icons/AntDesign'
import Users from 'react-native-vector-icons/FontAwesome5'

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import axios from "axios";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const TAB_WIDTH = 100;
const TABS = ['About', 'Contact', 'Ads', 'Reviews']; 
const UserDetail = ({ route, }) => {
    const { id} = route.params
    console.log("id:",id )
    const email = route.params
    console.log("email",email)

    const [imageU, setImageU] = useState('')
    const [showImage, setShowImage] = useState(false)
    const [data, setData] = useState([]);
    const [rating, setRating] = useState(0);
    const [selectedTab, setSelectedTab] = useState("About");
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return moment(date).format('DD/MM/YYYY');
    };
        // hàm trở về 
        const navigation = useNavigation();
    useEffect(() => {

        const dataG = async () => {
            try {
                const getData = await AsyncStorage.getItem("AcessToken");
                console.log(getData);
                const response = await axios.get(`http://erp.lacty.com.vn:5000/user/${id}`, {
                    headers: {
                        'X-Access-Token': getData,
                    },
});
                const data = response.data
                setData(data)
                const imageBufferBase64 = Buffer.from(response.data[0].image);
                const imgData = imageBufferBase64.toString('base64');
                setImageU(imgData);
                // console.log('id:', response.data[0].id)

            } catch (error) {
                // Xử lý lỗi
                console.error(error);
            }
        };
        // http://erp.lacty.com.vn:5000/user/department/<deparmentID>}`
        // http://erp.lacty.com.vn:5000/user/department/%3CdeparmentID%3E
        dataG();
    }, []);
    const handleRatingChange = (value) => {
        setRating(value);
        // Lưu giá trị đánh giá vào trạng thái hoặc gửi lên máy chủ
    };
    //animaition
    const offset = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));
    const handlePress = (tab) => {
        setSelectedTab(tab);
        const newOffset = (() => {
            switch (tab) {
                case 'About':
                  return 0;
                case 'Contact':
                  return 1*TAB_WIDTH;
                case 'Ads':
                  return 2* TAB_WIDTH;
                case 'Reviews':
                  return 3* TAB_WIDTH;
                default:
                  return 0;
              }
        })();
        offset.value = withTiming(newOffset);
    };
        //check email
    let colorR
    if(route.params.email==null){
        colorR ="grey"
    }else{
        colorR ="green"
    }
    let colorS
    if(data[0]?.phone==''){
        colorS ="grey"
    }else{
        colorS ="green"
    }

    let colorP
    if(data[0]?.phone==null){
        colorP ="grey"
    }else{
        colorP ="green"
    }
    let colorA
    if(data[0]?.address==''){
        colorA ="grey"
    }else{
        colorA ="green"
    }
    const handleLogout = async () => {
        try {
      
          await AsyncStorage.removeItem('AcessToken');
          
          navigation.navigate("SignUp")
          console.log("Đăng xuất thành công")
        } catch (error) {
          console.log( error);
        }
      };
    return (
        <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
            <View style={{
                flexDirection: "row",
                backgroundColor:"#f2f2f2"
            }}>
                <TouchableOpacity onPress={()=>{
                     navigation.goBack(null);
                }}>
                    <Back name="chevron-back" size={20} color="black"
                        style={{
                            marginLeft: 15,
                        }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        color: "black",
                        fontSize: 15,
                        fontWeight: "700",
                        marginLeft: 20,
                        marginBottom: 10,
                    }}
                >Back to list</Text>
                <TouchableOpacity>
                    <Dots name="dots-three-vertical" size={20} color="black"
                        style={{
                            marginLeft: 225,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                width: 350,
                height: 130,
                marginLeft: 20,
                marginTop: 5,
                borderRadius: 15,
                flexDirection: "column",
                backgroundColor:"#e6e6e6",
 }}
>
                <ImageBackground
                    style={{
                        width: "100%",
                        height: '100%',
                    }}
                    source={require('../images/city.jpg')}
                    imageStyle={{ borderRadius: 15, }}
                    borderRadius={15}
                >
                    <Image
                        style={{
                            width: 80,
                            height: 80,
                            backgroundColor: "red",
                            borderRadius: 100,
                            borderColor: "white",
                            marginLeft: 140,
                            marginTop: 90,
                            borderWidth: 3,
                            alignItems: "center",
                        }}
                        source={{ uri: `data:jpg;base64,${imageU}` }} />

                </ImageBackground>
                <Text style={styles.txtDe}>
                    {/* {JSON.stringify(data)} */}
                    {data[0]?.name} -{data[0]?.id}

                </Text>
                <View style={{
                    flexDirection: "row"
                    
                }}>
                    <Rating
                        type="star"
                        ratingCount={5}
                        imageSize={15}
                        startingValue={rating}
                        onFinishRating={handleRatingChange}
                        style={{
                            width: 100,
                            marginLeft: 80,
                        }}
                    />
                    <Text
                        style={styles.txtD}>
                        Phone: {data[0]?.phone_number}
                    </Text>
                </View>
                <View style ={{
                flexDirection:"row",
             }}>
                <Text style ={{
                    marginLeft:20,
                    marginTop:10,
                }}>
                    Email:
                </Text>
                <Check name ="checkcircle" size ={15} color ={colorR}
                    style ={{
                        marginLeft:10,
                        marginTop:12,
                    }}
                />
                  <Text style ={{
                    marginLeft:20,
                    marginTop:10,
                }}>
                    SMS:
                </Text>
                <Check name ="checkcircle" size ={15} color ={colorS}
                    style ={{
                        marginLeft:10,
                        marginTop:12,
                    }}
                />
                
                  <Text style ={{
                    marginLeft:20,
                    marginTop:10,
                }}>
                    Pass:
                </Text>
                <Check name ="checkcircle" size ={15} color ={colorP}
                    style ={{
                        marginLeft:10,
                        marginTop:12,
                    }}
                />
                     <Text style ={{
                    marginLeft:20,
                    marginTop:10,
                }}>
                    Address:
                </Text>
                <Check name ="checkcircle" size ={15} color ={colorA}
                    style ={{
                        marginLeft:10,
                        marginTop:12,
                    }}
                />
                </View>
            </View>
            <View style={{
                width: "100%",
                height: 50,
                backgroundColor: "white",
                elevation:3,
                marginTop:130,
            }}>
                <View style={styles.tabs}>
                    {TABS.map((tab, i) => (
                        <Pressable
                            key={tab}
                            style={
                                i !== TABS.length - 1 ? [styles.tab,selectedTab!=TABS && styles.divider] : styles.tab
                            }
                            onPress={() => handlePress(tab)}>
                            <Animated.Text style={[styles.tabLabel, { color: selectedTab === tab ? '#000099' : 'grey' }]}>
        {tab}
      </Animated.Text>
                        </Pressable>
                        
                    ))}
                </View>
                <Animated.View style={[styles.animatedBorder, animatedStyles]} />
                <View style ={{
                    
                    backgroundColor:"#ffffff"
                }}>
                <Text 
                    style ={{
                        fontSize:15,
                        fontWeight:"500",
                        color:"black",
                        marginLeft:20,
                        marginTop:20,
                    }}
                >Account Details</Text>
                <View style ={{
                    flexDirection:"row",
                    backgroundColor:"white",
                    borderBottomWidth:1,
                    borderColor:"#e6e6e6",
                    paddingBottom:5,

                }}>
                    <Users name ="user-circle" size ={20} color="#bfbfbf"
                        style ={{
                            marginLeft:20,
                            marginTop:15,
                        }}
                    />
                    <Text 
                        style ={{
                            fontSize:15,
                            fontWeight:"500",
                            marginLeft:15,
                            marginTop:15,
                            textAlign:"center",
                     }}
                    >
                        Account Type
                    </Text>
                    <Text 
                        style ={{
                            marginLeft:50,
                            fontWeight:"600",
                            marginTop:15,
                            textAlign:"left",
                            
                        }}
                    >
                        {data[0]?.name}
                    </Text>
                    </View>   
                    <View style ={{
                    flexDirection:"row",
                    backgroundColor:"white",
                    borderBottomWidth:1,
                    borderColor:"#e6e6e6",
                    paddingBottom:5,
                }}>
                    <TouchableOpacity  style ={{
                        flexDirection:"row"
                    }}
                    onPress={handleLogout}
                    >
                    <Logout name ="logout" size ={20} color="#bfbfbf"
                        style ={{
                            marginLeft:20,
                            marginTop:20,
                        }}
                      
                    />
                    <Text 
                        style ={{
                            fontSize:15,
                            fontWeight:"500",
                            marginLeft:15,
                            marginTop:20,
                            textAlign:"center"
                     }}
                    >
                       Log out: 
                    </Text>
                    </TouchableOpacity>
                    </View>   
                    </View>
                    <View style ={{
                    backgroundColor:"#ffffff"

                }}>
                <Text 
                    style ={{
                        fontSize:15,
                        fontWeight:"500",
                        color:"black",
                        marginLeft:20,
                        marginTop:20,
                         paddingBottom:5,
                    }}
                >Date</Text>
                <View style ={{
                    flexDirection:"row",
                    backgroundColor:"white",   
                    borderBottomWidth:1,
                    borderColor:"#e6e6e6",
                    paddingBottom:5,
                }}>
                    <Birthday name ="birthday-cake" size ={20} color="#bfbfbf"
                        style ={{
                            marginLeft:25,
                            marginTop:15,
                        }}
                    />
                    <Text 
                        style ={{
                            fontSize:15,
                            fontWeight:"500",
                            marginLeft:15,
                            marginTop:15,
                            textAlign:"center" 
                     }}
                    >
                       Birthday
                    </Text>
                    <Text 
                        style ={{
                            marginLeft:100,
                            fontWeight:"600",
                            marginTop:15
                            
                        }}
                    >
                          {formatDateString(data[0]?.birthday)}
                    </Text>
                    </View>   
                    <View style ={{
                    flexDirection:"row",
                    backgroundColor:"white",
                    borderBottomWidth:1,
                    borderColor:"#e6e6e6",
                    paddingBottom:5,
                }}>
                    <Dates name ="date" size ={20} color="#bfbfbf"
                        style ={{
                            marginLeft:20,
                            marginTop:20,
                        }}
/>
                    <Text 
                        style ={{
                            fontSize:15,
                            fontWeight:"500",
                            marginLeft:10,
                            marginTop:20,
                            textAlign:"center"
                     }}
>
                       Date come 
                    </Text>
                    <Text 
                        style ={{
                            marginLeft:95,
                            fontWeight:"600",
                            marginTop:20
                        }}
                    >
                       {formatDateString(data[0]?.date_come)}
                    </Text>
                    </View>   
                    </View>
                    <View style ={{
                    
                    backgroundColor:"#ffffff",
                 

                }}>
                <Text 
                    style ={{
                        fontSize:15,
                        fontWeight:"500",
                        color:"black",
                        marginLeft:20,
                        marginTop:20,
                        height:20,
                    }}
                >Address</Text>
                <View style ={{
                    flexDirection:"row",
                    backgroundColor:"white",
                    height:80,
                    borderBottomWidth:1,
                    borderColor:"#e6e6e6",
                   
                    

                }}>
                    <Address name ="address" size ={20} color="#bfbfbf"
                        style ={{
                            marginLeft:20,
                            marginTop:10,
                        }}
/>
                    <Text 
                        style ={{
                            fontSize:15,
                            fontWeight:"500",
                            marginLeft:15,
                            marginTop:10,
                            textAlign:"center"
                            
                     }}
                    >
                       Address
                    </Text>
                    <Text 
                        style ={{
                            marginLeft:15,
                            fontWeight:"600",
                            width:250,
                            marginLeft:30,
                            fontSize:15,
                            justifyContent:"center",
                            textAlign:"left",
                            height:80,
}}>
                    {data[0]?.address}
                    </Text>
                    </View>   
                    </View>
                                    
            </View>
        </SafeAreaView>
    )
}
export default UserDetail
const styles = StyleSheet.create({
    txtDe: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginLeft: 10,
        marginTop: 40,
        color: "black"
    },
    txtD: {
        fontSize: 13,
        fontWeight: "500",
        textAlign: "left",
        marginLeft: 10,

        color: "#595959"
    },
    txt1: {
        fontStyle: "italic",
        fontSize: 20,
        fontWeight: "400",
        textAlign: "left",
        marginLeft: 10,
        marginTop: 40,
        color: "black"
    }, txt2: {
        fontStyle: "italic",
        fontSize: 20,
        fontWeight: "400",
        textAlign: "left",
        marginLeft: 10,
        marginTop: 30,
        color: "black"
    },
    tabs: {
        flexDirection: 'row',
      },
      tab: {
        paddingHorizontal: 1,
        paddingVertical: 5,
        width: 100,
        height:45,
      },
      tabLabel: {
        marginTop:10,
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 'bold',
},
      divider: {
       
        borderRightColor: '#ddd',
      },
      animatedBorder: {
        height: 3,
        width: 100,
        backgroundColor: '#000099',
        borderRadius: 5,
      },
})