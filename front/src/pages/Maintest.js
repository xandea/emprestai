import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo2.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png';

export default function Main({ navigation }) {
    const id = navigation.getParam('_id');
    const [users, setUsers] = useState([]);
    

    useEffect(()=> {
        async function loadUsers(){
            const response = await api.get('/Listagem')
            //console.log(response);
            setUsers(response);
        }
        loadUsers();
        
    }, [id]);

    async function handleLogout(){
        await AsyncStorage.clear();

        navigation.navigate('Login');
        
    }
    console.log(users.data);
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image styles={styles.logo} source={logo} />
            </TouchableOpacity>
            
            <View style={styles.cardsContainer}>
            {users.length === 0 
                ? <Text style={styles.empty}>Acabou</Text>
                : (users.data.map((user,index)=> (
                    <View key={user._id}style={[styles.card]}>
                        <Image style = {styles.avatar} source={{uri: /*user.url*/ 'https://facebook.github.io/react-native/img/tiny_logo.png'}} />
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.descricao}</Text>
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
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },
    card:{
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position:'absolute',
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