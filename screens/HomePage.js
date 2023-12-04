import React, { useState, Component, useEffect } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, Box, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Pressable, ScrollView, EditText } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const HomePage = ({ navigation }) => {
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
                // console.log("res",data)
             
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
            <TouchableOpacity  onPress={(key) => {
                navigation.navigate('UserScreens',{ key:item.key });
                console.log(item)
            }}> 
                <View style={styles.list1}>

                    <Icons
                        style={{
                            width: 50,
                            height: 50,
                            marginTop: 15,
                            marginLeft: 20,
                            alignItems: "center",

                        }}
                        name="people-roof" size={40} color="#4d94ff"
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

        <SafeAreaView >
            <View style={{ flexDirection: "row" }}>
                <View style={styles.containerS}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm Department..."
                        value={searchText}
                        onChangeText={(val) => setSearchText(val)}
                        onSubmitEditing={timKiem}
                    />

                </View>
                <TouchableOpacity style={styles.button} onPress={timKiem}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={handleToggleMenu} >
                    <Ionicons name="filter" size={24} color="white" />
                    <Modal visible={showMenu} transparent>
                        <TouchableOpacity
                            style={styles.menuContainer}
                            activeOpacity={1}

                        >
                            <View style={styles.menu}>
                                <TouchableOpacity onPress={handleSort} >
                                    <Text>Sắp xếp thứ tự từ A-Z</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSortZ}>
                                    <Text>Sắp xếp thứ tự từ Z-A</Text>
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
        backgroundColor: "#f5f0f0",
        width: "90%",
        height: 70,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 20,
        borderWidth: 3,
        borderColor: "#db70b8",
        elevation: 7,



    },
    txtK: {
        fontSize: 15,
        width: "100%",
        height: 20,
        fontWeight: "500",
        textAlign: "left",
        color: "#0d0d0d",
        marginLeft: 20,
        marginTop: 15,
        textDecorationLine: "underline",


    },
    txtH: {

        fontSize: 13,
        color: "#0d0d0d",
        marginLeft: 20,
        textAlign: "left",
        alignItems: "center",
        marginTop: 5,


    },
    containerS: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        marginLeft: 20,
        width: 280,
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
        backgroundColor: "grey",
        marginTop: 10,
        height: 40,
        width: 40,
        paddingTop: 5,
        borderRadius: 5,
        marginLeft: 5,
        opacity: 1,
        alignItems: "center"
    },
    menuContainer: {

        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
    },
});
