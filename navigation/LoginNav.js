import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View, Image, Box, TouchableOpacity, ImageBackground, Modal, Pressable, ScrollView, EditText } from 'react-native'
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Heart1 from 'react-native-vector-icons/AntDesign';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import HomePage from '../screens/HomePage';
import UsersScreen from '../screens/UsersScreen'
import Details from '../screens/DetailPage';
import Heart from '../screens/Heart';
import UserDetail from '../screens/UserDetailScreen'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const Loginavigation = () => {
    return (
        <NavigationContainer >


            <Stack.Navigator screenOptions={{
                headerShown: false
            }}

            >

                <Stack.Screen name="Login"

                    component={Login} />
                <Stack.Screen name="SignUp"

                    component={SignUp} />


                <Stack.Screen name="HomePage"
                    component={Home} />
                
                <Stack.Screen name="UserScreens"
                    component={UsersScreen} />
                <Stack.Screen name="UserDetail"
                    component={UserDetail} />

        </Stack.Navigator>

        </NavigationContainer>

    )
};

export default Loginavigation;
const Home = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "grey",
            backgroundColor: "black"

        }}>
            <Tab.Screen name="Home" component={HomePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }}

            />
            <Tab.Screen name="Deltail" component={Details}
                options={{

                    tabBarLabel: 'Detail',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="clock" color={color} size={size} />
                    ),
                }}

            />
            <Tab.Screen name="Heart" component={Heart}
                options={{

                    tabBarLabel: 'Heart',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="heart" color={color} size={size} />
                    ),
                }}

            />





        </Tab.Navigator>

    );

} 
