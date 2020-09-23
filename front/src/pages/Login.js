import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Platform, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';

import Subscribe from '../pages/Subscribe';
import api from '../services/api';
import ListProduct from '../pages/ListProduct';
import Auth from '../routes';

import logo from '../assets/logo2.png';

export default function login({ navigation }){
    const [user, setUser]= useState('');
    const [password, setPassword]= useState('');
    

    async function handleLogin(){
        
        
        const response = await api.post('/Autenticacao', {user: user, password:password});
        const { _id } = response.data;
        //console.log({_id})

        if(_id!=undefined){        
            await AsyncStorage.setItem('_id', _id);
            const teste =await AsyncStorage.getItem('_id');
            

             
            navigation.navigate('ListProduct',{_id});
        }
        else{
            console.log("Deu ruim");
        }   
    }

    async function handleSubscribe(){
        navigation.navigate('Subscribe');
        
    }
    
    return(
        
        <KeyboardAvoidingView
        behavior='padding'
        enabled={Platform.OS == 'ios'}
        style={styles.container}>
            <Image source={logo}/>
            
            <TextInput
            
            autoCapitalize='none'
            autoCorrect ={false}
            placeholder="Digite o Usuario"
            placeholderTextColor="#999"
            style = {styles.input}
            value={user}
            onChangeText={setUser}
            />

            <TextInput
            autoCapitalize='none'
            autoCorrect ={false}
            placeholder="Digite a Senha"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            style = {styles.input}
            value={password}
            onChangeText={setPassword}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={handleSubscribe} style={styles.buttonCadastro}>
                <Text style={styles.buttonTextCadastrar}>Cadastrar-se</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input:{
        height:46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth:1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 8,
        paddingHorizontal: 15
    },
    button:{
        height:45,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius:4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonTextCadastrar:{
        color: '#DF4723',
        fontWeight: 'bold',
        fontSize: 15,
    },
    buttonCadastro:{
        marginTop: 13,
        justifyContent: 'center',
        alignItems: 'center'
    }
});