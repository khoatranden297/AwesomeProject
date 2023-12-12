import React, { useState, Component, useEffect } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, Box, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Pressable, ScrollView, EditText } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { Rating } from 'react-native-ratings';
import User from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Book from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Back from 'react-native-vector-icons/AntDesign';
import Sort from 'react-native-vector-icons/FontAwesome5';
import Hexe from 'react-native-vector-icons/Feather';
import Three from 'react-native-vector-icons/Entypo';
import Phone from 'react-native-vector-icons/FontAwesome';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const TAB_WIDTH = 140;
const TABS = ['Sarafy', 'Sarafy Ad', 'Save'];

const UsersScreen = ({ route, navigation }) => {
    const { key, name ,id} = route.params
    console.log(name)

    const [isNotificattion, setIsNotificattion] = useState();
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState(data);
    const [filteredResults, setFilteredResults] = useState([]);
    const [showmenu, setShowmenu] = useState(false)
    const [selectItem, setSelectItem] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc');
    const [showMenu, setShowMenu] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortedData, setSortedData] = useState([])
    const [gender, setGender] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedTab, setSelectedTab] = useState("Sarafy");

    // animation
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const handlePress = (tab) => {
        setSelectedTab(tab);
        const newOffset = (() => {
            switch (tab) {
                case 'Sarafy':
                    return 0;
                case 'Sarafy Ad':
                    return 1 * TAB_WIDTH;
                case 'Save':
                    return 2 * TAB_WIDTH;
                default:
                    return -TAB_WIDTH;
            }
        })();

        offset.value = withTiming(newOffset);
    };

    useEffect(() => {

        const dataG = async () => {

            try {

                const getData = await AsyncStorage.getItem("AcessToken");


                console.log(getData);
                const response = await axios.get(`http://erp.lacty.com.vn:5000/user/department/${key}`, {
                    headers: {
                        'X-Access-Token': getData,

                    },

                })
                const data = await response.data

                console.log("res", data)


                setData(data)

            }

            // http://erp.lacty.com.vn:5000/user/department/<deparmentID>}`
            // http://erp.lacty.com.vn:5000/user/department/%3CdeparmentID%3E


            catch (error) {
                console.log(error)

            }
        }
        dataG();
    }, [key]);
    useEffect(() => {
        const searchResults = data.filter(item => (
            item.id.toLowerCase().includes(searchText.toLowerCase()) ||
            item.name.toLowerCase().includes(searchText.toLowerCase())
            // item.department_detail.toLowerCase().includes(searchText.toLowerCase())
        ));

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
    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const handleRatingChange = (value) => {
        setRating(value);
        // Lưu giá trị đánh giá vào trạng thái hoặc gửi lên máy chủ
    };
    renderItem = ({ item, index }) => {
        let iconColor = "#6699ff";
        if (item.status == 0) {
            iconColor = "grey";
        } else {
            iconColor = "#47d147";
        }

        let backgroundColor
        if (item.gender == 0) {
            backgroundColor = "#ff66b3";
        } else {
            backgroundColor = "#3399ff";
        }

        let detailText = `${item.name} - ${item.id}`;

        if (item.department_detail !== null) {
            detailText += ` (${item.department_detail})`;
        }
        return (
            <TouchableOpacity  onPress={() => {
                navigation.navigate('UserDetail', { id: item.id, email:item.email })
                console.log("item:", item.id)
            }}>
               
                <View style={{
                    flexDirection: "row",
                    backgroundColor: "#ffffff",
                    width: 370,
                    height: 140,
                    borderRadius: 5,
                    marginTop: 20,
                    marginLeft: 10,
                    elevation: 2,
                }}>

                    <View style={{
                        backgroundColor: backgroundColor,
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        marginTop: 20,
                        marginLeft: 15,
                    }}>
                        <Hexe name="hexagon" size={28} color="#fff"
                            style={{
                                marginLeft: 12,
                                marginTop: 10,
                            }}
                        />
                    </View>
                    <View >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                fontSize: 17,
                                color: "black",
                                fontWeight: "500",
                                marginTop: 15,
                                width: 230,
                                marginLeft: 20,
                                textAlign: "left",
                                


                            }}>
                                {item.name}
                            </Text>
                            <Three name="dots-three-vertical" size={25} color="#999999"
                                style={{
                                    width: 20,
                                    marginLeft: 10,
                                    marginTop: 10,
                                    
                                }}
                            />
                        </View>
                        <Rating
                            type="star"
                            ratingCount={5}
                            imageSize={15}
                            startingValue={rating}
                            onFinishRating={handleRatingChange}
                            ratingColor='grey'
                            selectedColor="#e6b800"
                            starStyle={{ borderColor: '#ccad00', borderWidth: 4 }}
                            ratingBackgroundColor='#e6e6e6'
                            style={{
                                
                                width: 100,
                                marginTop:5,
                                marginLeft: 20,
                             
                            }}
                        />
                        <View style={{
                            flexDirection: "row",
                          
                        }}>
                            <Text style={styles.txtH}>
                                AGE:{item.age}
                            </Text>

                            <Text style={styles.txtL}>
                                msnv: {item.id}
                            </Text>
                            <Text style={[styles.text, item.status === 1 ? styles.textWork : styles.textOff]}>
                                {item.status === 1 ? 'Work' : 'Off'}
                            </Text>
                        </View>
                        <View style ={{flexDirection:"row"}}>
                                <TouchableOpacity style ={{
                                    flexDirection:"row",
                                    marginTop:10,
                                    width:100,
                                    height:30,
                                    borderRadius:10,
                                    borderWidth:1,
                                    borderColor:"#e6e6e6",
                                    elevation:1,
                                    backgroundColor:"#ffffff"
                                }}>
                                     <Phone name="phone" size={18} color="#0047b3"
                            style={{
                                marginLeft: 12,
                                marginTop: 5,
                            }}
                        />  
                            <Text
                                style ={{
                                    fontSize:13,
                                    color:"#0047b3",
                                    marginLeft:15,
                                    marginTop:5,
                                }}
                            >Call</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style ={{
                                    flexDirection:"row",
                                    marginTop:10,
                                    width:100,
                                    height:30,
                                    borderRadius:10,
                                    borderWidth:1,
                                    borderColor:"#e6e6e6",
                                    elevation:1,
                                    marginLeft:10,
                                    backgroundColor:"#ffffff"
                                }}>
                                    <Email name="email" size={18} color="#0047b3"
                            style={{
                                marginLeft: 12,
                                marginTop: 5,
                            }}
                        />  
                            <Text
                                style ={{
                                    fontSize:13,
                                    color:"#0047b3",
                                    marginLeft:8,
                                    marginTop:5,
                                }}
                            >Message</Text>
                                </TouchableOpacity>
                        </View>

                        {/* {item.email !== null && (
                            <Text style={styles.email}>
                                Email: {item.email}
                            </Text>
                        )} */}
                    </View>

                </View>


            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
            <View style={{
                width: "100%",
                height: 50,
                backgroundColor: "white",
                elevation: 5,
                
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

            <View style={{ flexDirection: "row" }}>
                <View style={styles.containerS}>
                    <Icon name="search" size={24} color="#b3b3b3" style={{ marginBottom: 5, }} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm Department..."
                        value={searchText}
                        onChangeText={(val) => setSearchText(val)}
                        onSubmitEditing={timKiem}
                    />


                </View>


                <TouchableOpacity style={styles.button1} onPress={handleToggleMenu}>
                    <Sort name="sort-alpha-up-alt" color="#fff" size={20}
                        style={{
                            marginLeft: 2,
                            marginTop: 2,
                            alignItems: "center"

                        }}
                    />
                    <Modal visible={showMenu} transparent>
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
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "500",
                    fontStyle: "normal",
                    color: "black",
                    marginLeft: 15,
                    marginTop: 15,
                }}
            >Đơn vị : {route.params.name}</Text>
            <FlatList
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    )
}
export default UsersScreen
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 800,
        backgroundColor: "white",

    },

    txtK: {

        fontSize: 15,
        width: 250,
        height: 40,
        fontWeight: "700",
        textAlign: "left",
        color: "#0d0d0d",
        marginLeft: 40,
        marginTop: 10,

    },
    txtH: {
        fontSize: 13,
        color: "#0d0d0d",
        marginLeft: 20,
        textAlign: "left",
        marginTop: 10,
    },
    txtL: {
        fontSize: 13,
        color: "#0d0d0d",
        marginLeft: 20,
        textAlign: "left",
        marginTop: 10,

    },
    txtz: {
        fontSize: 16,
        width: 100,
        height: 20,
        fontWeight: "500",
        textAlign: "left",
        color: "#0d0d0d",
        marginLeft: 30,
        marginTop: 1,

    },
    txtx: {
        fontSize: 13,
        color: "#0d0d0d",
        marginLeft: 25,
        textAlign: "left",
        marginTop: 5,
        fontWeight: "500"
    },
    email: {

        fontSize: 12,
        color: "#0d0d0d",
        marginLeft: 30,
        textAlign: "left",
        marginTop: 5,
    },
    containerS: {
        backgroundColor: "#e6ecff",
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        marginLeft: 10,
        width: 320,
        height: 40
    },
    input: {
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
        backgroundColor: "#0000e6",
        marginTop: 10,
        height: 40,
        width: 40,
        paddingTop: 5,
        borderRadius: 10,
        marginLeft: 10,
        opacity: 1,
        elevation: 4,
        borderWidth: 1,
        borderColor: "#0000e6",
        alignItems: "center"
    },
    menuContainer: {
        marginTop:400,
        alignItems: "flex-end",
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: TAB_WIDTH,
    },
    tabLabel: {
        paddingRight: 10,
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    divider: {

        borderRightColor: '#ddd',
    },
    animatedBorder: {
        height: 2,
        width: 140,
        backgroundColor: '#000099',
        borderRadius: 20,
    },
    text: {
        fontSize: 12,
        marginTop:11,
        marginLeft:10,
      },
      textWork: {
        color: '#00e600',
      },
      textOff: {
        color: 'red',
      },
})