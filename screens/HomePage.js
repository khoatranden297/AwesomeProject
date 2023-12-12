import React, { useState, Component, useEffect } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, Box, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Pressable, ScrollView, EditText } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome6';
import Sort from 'react-native-vector-icons/FontAwesome5';
import Sync from 'react-native-vector-icons/AntDesign';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { StatusBar } from 'react-native'
import moment from 'moment';
import Location from 'react-native-vector-icons/FontAwesome6';
import Notification from 'react-native-vector-icons/MaterialIcons';
import Headphone from 'react-native-vector-icons/FontAwesome5';
import Global from 'react-native-vector-icons/FontAwesome6';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";



const HomePage = ({ navigation,router }) => {
    const [greeting, setGreeting] = useState('');
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState(data);
    const [filteredResults, setFilteredResults] = useState([]);
    const [isP2PTabClicked, setIsP2PTabClicked] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortedData, setSortedData] = useState([])
    const [selectedTab, setSelectedTab] = useState("Exchange Rate");
   
    

    // ngày giờ

    const TAB_WIDTH = 100;
    const TABS = ['Exchange Rate', 'Trade', 'P2P', 'Tether(USDT)']; 

    // animation 

    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const handlePress = (tab) => {
        setSelectedTab(tab);

        const newOffset = (() => {
            switch (tab) {
                case 'Exchange Rate':
                  return 0;
                case 'Trade':
                  return 1*TAB_WIDTH;
                case 'P2P':
                  return 2* TAB_WIDTH;
                case 'Tether(USDT)':
                  return 3* TAB_WIDTH;
                default:
                  return -TAB_WIDTH;
              }
              
        })();

        offset.value = withTiming(newOffset);
    };
    // animated Text
    const textColorValue = useSharedValue(0);

    const handleLogout = async () => {
        try {
      
          await AsyncStorage.removeItem('AccessToken');
          
          navigation.navigate('SignUp')
          console.log('xóa thành công AccessToken')
        } catch (error) {
          console.log( error);
        }
      };
   

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const dataG = async () => {
            try {

                const getData = await AsyncStorage.getItem("AcessToken");
                console.log(getData);

                const response = await axios.get('http://erp.lacty.com.vn:5000/user/department', {
                    headers: {
                        'X-Access-Token': getData
                    },

                })
                const data = await response.data
                console.log("res",data)

                setData(data)
                setSortedData(data);
            }

            catch (error) {
                console.log(error)

            }
        }
        dataG();
    }, []);


    useEffect(() => {
        const searchResults = data.filter(item => item.id.toLowerCase().includes(searchText.toLowerCase()) || item.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(searchResults);
        setFilteredResults([]);
    }, [searchText, data])

    const timKiem = (event) => {
        const keyword = event.target.value;
        setSearchText(keyword);
    };

    useEffect(() => {

    });
    const handleSort = () => {
        const sortedData = searchResults.sort((a, b) => a.name.localeCompare(b.name))
        setShowMenu(false);

        console.log('sort:', sortedData);
        setFilteredResults(sortedData);
    }
    const handleSortZ = () => {
        const sortedData = searchResults.sort((a, b) => b.name.localeCompare(a.name))
        setShowMenu(false);

        console.log('sort:', sortedData);
        setFilteredResults(sortedData);
    }
    renderItem = ({ item, index }) => {
        return (

            <TouchableOpacity onPress={(key) => {
                navigation.navigate('UserScreens', { key: item.key,name:item.name });
                console.log(key)
            }}>

                <View style={styles.list1}>
                    <Icons
                        style={{
                            width: 80,
                            height: 50,
                            marginTop: 20,
                            marginLeft: 20,
                            alignItems: "center",
                        }}
                        name="people-line" size={50} color="#4d94ff"
                    />
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.txtK} >{item.name}</Text>
                        <Text style={styles.txtH} >{item.id}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
    return (

        <SafeAreaView  >
           
            <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
            <View
                style={{
                    width: '100%',
                    height: 110,
                    backgroundColor: "#000099",
                    
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Location name="location-dot" size={20} color="white"
                        style={{
                            marginLeft: 10,
                            marginTop: 10,
                        }}
                    />
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "500",
                            marginLeft: 10,
                            marginTop: 10,
                        }}

                    >Hồ Chí Minh,Việt Nam</Text>
                    <Notification name="notifications" size={20} color="white"
                        style={{
                            marginLeft: 100,
                            marginTop: 10,
                        }}
                    />
                    <Headphone name="headphones-alt" size={20} color="white"
                        style={{
                            marginLeft: 20,
                            marginTop: 10,
                        }}
                    />
                    <TouchableOpacity onPress={handleLogout}>
                    <Global name="globe" size={20} color="white"
                        style={{
                            marginLeft: 20,
                            marginTop: 10,
                        }}
                    />
                    </TouchableOpacity>

                    
                </View>

                <View style={styles.containerS}>
                    <Icon name="search" size={20} color="white" style={{ marginBottom: 5, }} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm Department..."
                        placeholderTextColor="white"
                        value={searchText}
                        onChangeText={(val) => setSearchText(val)}
                        onSubmitEditing={timKiem}
                    />

                </View>
            </View>
            <View style={{
                width: "100%",
                height: 50,
                backgroundColor: "white",
                elevation:5,
            }}>
                <View style={styles.tabs}>
                    {TABS.map((tab, i) => (
                       <Pressable
                       key={tab}
                       style={[
                         styles.tab,
                         selectedTab === tab ? styles.selectedTab : null,
                         i !== TABS.length - 1 ? styles.divider : null,
                       ]}
                       onPress={() => handlePress(tab)}
                     >
                       <Animated.Text style={[styles.tabLabel, { color: selectedTab === tab ? '#000099' : 'grey' }]}>
        {tab}
      </Animated.Text>
                     </Pressable>
                    ))}
                </View>
                <Animated.View style={[styles.animatedBorder, animatedStyles]} />
                
            </View>

            <View style={{ flexDirection: "row",
                           width:"100%",
                           height:60,
                           backgroundColor:"#f2f2f2",
                           elevation:5,
                           borderWidth:0.5,
}}>
                <TouchableOpacity style ={{
                    marginTop:15,
                    width:85,
                    height:25,
                    marginLeft:10,
                    backgroundColor:"#002db3",
                    borderRadius:8,
                    elevation:5,
                }}>
                    <Text style ={{
                        color:"white",
                        textAlign:"center",
                        fontSize:15,
                        fontWeight:"500"
                    }}>
                        Buy
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style ={{
                    marginTop:15,
                    width:85,
                    height:25,
                    marginLeft:5,
                    backgroundColor:"#fff",
                    borderRadius:8,
                    elevation:5,
                }}>
                    <Text style ={{
                        color:"#1a53ff",
                        textAlign:"center",
                        fontSize:15,
                        fontWeight:"500"
                    }}>
                        Sell
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Sync name = "sync" color ="grey" size ={20}
                       style ={{
                        marginLeft:120,
                        marginTop:20,
                      
                       }}
                    />
                
                    </TouchableOpacity >
                    
                    <TouchableOpacity  onPress={handleToggleMenu}>
                    <Sort name = "sort-alpha-up-alt" color ="grey" size ={20}
                       style ={{
                        marginLeft:30,
                        marginTop:20,
                      
                       }}
                    />
                    <Modal visible={showMenu} 
                        transparent = {true}
                        animationType="fade"
                    >
                        <TouchableOpacity
                            style={styles.menuContainer}
                            activeOpacity={1}

                        >

                            <View style={styles.menu}>
                                <TouchableOpacity onPress={handleSort} 
                                
                                >
                                    <Text
                                    style ={{
                                        fontSize:20,
                                        textAlign:"center",
                                        color:"#1a1a1a"
                                    }}
                                    >Sắp xếp thứ tự từ A-Z</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSortZ}>
                                    <Text
                                    style ={{
                                        fontSize:20,
                                        textAlign:"center",
                                        color:"#1a1a1a",
                                        marginTop:30,
                                    }}
                                    >Sắp xếp thứ tự từ Z-A</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                
                    </TouchableOpacity>
                
                </View>               
            <FlatList
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    )

}
export default HomePage
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",

    },

    imgH: {
        width: "100%",
        height: 100,


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
        backgroundColor: "#fff",
        width: "90%",
        height: 100,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 20,
        borderWidth: 0.5,
        elevation: 5,
        opacity: 0.8



    },
    txtK: {
        fontSize: 20,
        width: "100%",
        height: 30,
        fontWeight: "500",
        textAlign: "left",
        color: "#0d0d0d",
        marginLeft: 20,
        marginTop: 15,
        textDecorationLine: "underline",


    },
    txtH: {

        fontSize: 15,
        height: 30,
        color: "#0d0d0d",
        marginLeft: 20,
        textAlign: "left",
        alignItems: "center",
        marginTop: 5,


    },
    containerS: {
        backgroundColor: "#668cff",
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#e6ecff',
        borderRadius: 7,
        paddingHorizontal: 10,
        marginTop: 25,
        marginLeft: 20,
        width: 360,
        height: 40,
        opacity: 0.8
    },
    input: {
        color:"white",
        flex: 1,
        width: 50,
        height: 40,

    },
    button: {
        backgroundColor: "#b3e0ff",
        marginTop: 10,
        height: 40,
        width: 40,
        paddingTop: 5,
        borderRadius: 5,
        marginLeft: 5,
        opacity: 1,
        alignItems: "center"
    },
    button1: {
        backgroundColor: "white",
        marginTop: 10,
        height: 40,
        width: 40,
        paddingTop: 5,
        borderRadius: 5,
        marginLeft: 5,
        opacity: 1,
        elevation: 5,
        alignItems: "center"
    },
    menuContainer: {
        marginTop:400,
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
     
    },
    menu: {
       
        width:"100%",
        height:130,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
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
        height: 2,
        width: 100,
       
        backgroundColor: '#000099',
        borderRadius: 5,
      },
      animatedText:{
        color:"#000099"
      },
});
