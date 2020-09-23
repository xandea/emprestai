import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo2.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png';

export default function Main({ navigation }) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);
    

    useEffect(()=> {
        async function loadUsers(){
            const response = await api.get('/products',{
                headers: {
                    user: id,
                }
            })
            setUsers(response.data);

        }
        loadUsers();
        
    }, [id]);

    async function handleLogout(){
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image styles={styles.logo} source={logo} />
            </TouchableOpacity>
            
            <View style={styles.cardsContainer}>
                {  users.length === 0
                ? <Text style={styles.empty}>Acabou</Text>
                : (
                    users.docs.map((user,index)=> (
                    <View key={user._id}style={styles.card}>
                        <Image style = {styles.avatar} source={{uri: /*user.url*/ 'https://png.pngtree.com/png-vector/20190117/ourlarge/pngtree-yellow-electric-drill-beautiful-electric-drill-beautiful-electric-drill-tool-drill-png-image_414229.jpg'}} />
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.title}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.description}</Text>
                            </View>
                    </View>
                ))

                )}
            </View>
            
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Image source={dislike} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image source={like} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo:{
        marginTop:1
    },
    empty:{
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    cardsContainer:{
        flex: 0.,
        alignItems: 'flex-start',
        flexWrap:'wrap',
        alignSelf: 'stretch',
        alignContent:'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },
    card:{
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position:'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
       },
    avatar:{
        flex: 1,
        height: 300
    },
    footer:{
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio:{
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },
    buttonsContainer:{
        flexDirection: 'row',
        marginBottom: 30
    },
    button:{
        width:50,
        height:50,
        borderRadius: 25, //metade para ficar circular
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20, //espaçamento entre as laterias
        elevation: 2, //sombra
    },
});