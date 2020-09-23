import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
//import { Root, Popup, Toast } from 'popup-ui';

import api from '../services/api';
import logo from '../assets/logo2.png';
//import { SafeAreaView } from 'react-navigation';

export default function Cadastrar({navigation}){
    const [user, setUser]= useState('');
    const [password, setPassword]= useState('');
    const [email, setEmail]= useState('');
    const [name, setNome]= useState('');


    async function handleSubscribe(){
        const response = await api.post('/Cadastro', {user: user, name:name,  password: password, email:email});
        const {_id} = response.data;
        navigation.navigate('Login');
    }
   

    return(
        
        <KeyboardAvoidingView
        behavior='padding'
        enabled={Platform.OS == 'ios'}
        style={styles.container}>

        <Text>Tela de Cadastro</Text>
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
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
            style = {styles.input}
            value={name}
            onChangeText={setNome}
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

            <TextInput
            autoCapitalize='none'
            autoCorrect ={false}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            style = {styles.input}
            value={email}
            onChangeText={setEmail}
            />

             

            <TouchableOpacity onPress={handleSubscribe} style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar</Text>
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
