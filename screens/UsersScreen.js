import React, { useState, Component, useEffect } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, Box, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Pressable, ScrollView, EditText } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'

import Icon from 'react-native-vector-icons/FontAwesome';
import Book from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const UsersScreen = ({ route, navigation }) => {
    const { key } = route.params


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
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.department_detail.toLowerCase().includes(searchText.toLowerCase())
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
    renderItem = ({ item, index }) => {
        let iconColor = "#6699ff";
        if (item.gender == 0) {
            iconColor = "#ff66b3";
        } else if (item.gender == 1) {
            iconColor = "#6699ff";
        }

        let iconColorT = "#248f24";
        if (item.status == 0) {
            iconColorT = "#ff3333";
        } else {
            iconColorT = "#00cc00";
        }

        let detailText = `${item.name} - ${item.id}`;

        if (item.department_detail !== null) {
          detailText += ` (${item.department_detail})`;
        }
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('UserDetail',{ id:item.id })
                console.log("item:",item)
            }}>
                <View style={styles.list1}>
                    <View style={{ flexDirection: "column" }}>
                        <Ionicons
                            style={{
                                marginLeft: 1,
                                elevation: 4,
                                shadowRadius: 3,
                            }}
                            name="circle" size={30} color={iconColorT} />

                        <Icon
                            style={{
                                width: 40,
                                height: 40,
                                marginTop: 30,
                                marginLeft: 20,
                                alignItems: "center",

                            }}
                            name="user-circle-o" size={40} color={iconColor} />

                    </View>

                    <View style={{ flexDirection: "column", width: 150, height: 90, marginTop: 5 }}>
                       
                            <Text style={styles.txtK}>
                                {detailText}
                            </Text>
                        
                        <Text style={styles.txtH}>
                            AGE:{item.age}
                        </Text>
                        {item.email !== null && (
                            <Text style={styles.email}>
                                Email: {item.email}
                            </Text>
                        )}

                        <Text style={styles.txtL}>
                            msnv: {item.id}
                        </Text>

                    </View>
                    <View style={{ flexDirection: "column", marginTop: 83, height: 50, width: 140 }}>

                        <Text style={styles.txtz}>
                            POS:{item.pos}
                        </Text>
                        {item.ip !== null && (
                            <Text style={styles.txtx}>
                                IP: {item.ip}
                            </Text>
                        )}
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
                <TouchableOpacity style={styles.button} >
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1}  >
                    <Ionicons name="filter" size={24} color="white" />
                    <Modal visible={showMenu} transparent>
                        <TouchableOpacity
                            style={styles.menuContainer}
                            activeOpacity={1}

                        >
                            <View style={styles.menu}>
                                <TouchableOpacity >
                                    <Text>Sắp xếp thứ tự từ A-Z</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
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
export default UsersScreen
const styles = StyleSheet.create({
    container: {


        width: "100%",
        height: 800,
        backgroundColor: "white",

    },




    list1: {

        flexDirection: "row",
        backgroundColor: "#f8f5f9",
        width: 370,
        height: 150,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        borderWidth: 3,
        borderColor: "#3399ff",
        elevation: 7,
    },
    txtK: {
        fontSize: 16,
        width: 250,
        height: 40,
        fontWeight: "700",
        textAlign: "left",
        color: "#0d0d0d",
        marginLeft: 30,
        marginTop: 10,

    },
    txtH: {
        fontSize: 13,
        color: "#0d0d0d",
        marginLeft: 35,
        textAlign: "left",
        marginTop: 10,
    },
    txtL: {
        fontSize: 13,
        color: "#0d0d0d",
        marginLeft: 35,
        textAlign: "left",
        marginTop: 5,

    },
    txtz: {
        fontSize: 16,
        width: 100,
        height: 20,
        fontWeight: "500",
        textAlign: "left",
        color: "#0d0d0d",
        marginLeft: 25,
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
        marginLeft: 35,
        textAlign: "left",
        marginTop: 5,
    }, containerS: {
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
})