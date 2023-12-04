import React, { useState, Component, useEffect } from 'react'
import 'react-native-gesture-handler';
import { Text, StyleSheet, View, Image, Box, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Pressable, ScrollView, EditText } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { ImageBase64 } from 'react-native-image-base64';
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
const UserDetail = ({ route, navigation }) => {
    const { id } = route.params
    console.log("id:", id)

    const [imageU,setImageU] = useState('')
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

        const dataG = async (imagePath) => {

            try {

                const getData = await AsyncStorage.getItem("AcessToken");


                console.log(getData);
                const response = await axios.get(`http://erp.lacty.com.vn:5000/user/${id}`, {
                    headers: {
                        'X-Access-Token': getData,

                    },

                })
                const data = await response.data
                console.log("res", data)
                 // // mã hóa hình ảnh 
                 const imgData = `Data:${data.dataPhotoExtensionType};base64,${Buffer.from(data.image.Data).toString('base64')}`;
                 setImageU(imgData)
                 console.log('img:',imgData)
                setData(data)

            }

            // http://erp.lacty.com.vn:5000/user/department/<deparmentID>}`
            // http://erp.lacty.com.vn:5000/user/department/%3CdeparmentID%3E


            catch (error) {
                console.log(error)

            }
        }
        
        dataG();
    }, []);
    renderItem = ({ item, index }) => {
      
        <View>
            <View >
                <Image
                    style={{
                        width: 200,
                        height: 200,
                        marginTop: 90,
                        marginLeft: 100,
                        alignItems: "center",

                    }}
                    source={imageU}

                />
            </View>
            <View>
                <Text style={styles.textDe}>Phone:</Text>
                <Text style={styles.textDe}>Date Come:</Text>
                <Text style={styles.textDe}>Birth Day:</Text>
                <Text style={styles.textDe}>Số chủ đạo </Text>
                <Text style={styles.textDe}>Cung hoàng đạo </Text>
                <Text style={styles.textDe}>Address:</Text>
            </View>
        </View>
    }
    return (
        <SafeAreaView >



            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />


        </SafeAreaView>

    )
}
export default UserDetail
const styles = StyleSheet.create({
    txtDe: {

    }

})