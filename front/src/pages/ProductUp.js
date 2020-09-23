import React, { useEffect, useState } from 'react';
//import {Text, View, Image, Button} from 'react-native';
import { KeyboardAvoidingView, ButtonGroup, Platform, Text, View, StyleSheet, Image, TextInput, TouchableOpacity,Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import ListProduct from '../pages/ListProduct';



export default function Upload({navigation}){
    const [photo, setPhoto]= useState('');
    const [name, setName]=useState('');
    const [descricao, setDescricao]=useState('');
    const [categoria, setCategoria]=useState('');
    const [preco, setPreco]=useState('');
   

    
    
   

    useEffect(()=> {
        

    }, []);

    handleChoosePhoto = () => {
        const options ={
            noData: false,
        };
        ImagePicker.launchImageLibrary(options, response =>{
            //console.log('Response = ', response);
            if(response.uri){
               
                   const source = { uri: 'data:image/jpeg;base64,' + response.data };

                setPhoto(source);
                //console.log(source)
            }
        });
    }
    

    async function handlePost(){
        const response = await api.post('/Produtos', {user: await AsyncStorage.getItem('_id'),name: name, descricao: descricao, categoria:categoria, foto: photo.uri, preco:preco});     
        
        navigation.navigate('ListProduct');
    }
    //console.log(photo);
        return(
            <KeyboardAvoidingView
            behavior='padding'
            enabled={Platform.OS == 'ios'}
            style={styles.container}>

                <View>
                    <Image
                    source={photo}
                    style={{width:200, height:200}}
                    />
                </View>
                <Text>Registro produto</Text>
  
                <TextInput
                autoCapitalize='none'
                autoCorrect ={false}
                placeholder="Digite o nome do produto"
                placeholderTextColor="#999"
                style = {styles.input}
                value={name}
                onChangeText={setName}
                />
                <TextInput
                autoCapitalize='none'
                autoCorrect ={false}
                placeholder="Descricao do produto"
                placeholderTextColor="#999"
                style = {styles.input}
                value={descricao}
                onChangeText={setDescricao}
                />
                <TextInput
                autoCapitalize='none'
                autoCorrect ={false}
                placeholder="Categoria"
                placeholderTextColor="#999"
                style = {styles.input}
                value={categoria}
                onChangeText={setCategoria}
                />
                <TextInput
                autoCapitalize='none'
                autoCorrect ={false}
                placeholder="Preco R$/dia"
                placeholderTextColor="#999"
                style = {styles.input}
                value={preco}
                onChangeText={setPreco}
                />


                <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
                    <Text style={styles.buttonTextFoto}>Escolher foto</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePost} style={styles.button}>
                    <Text style={styles.buttonText}>Registrar</Text>
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
        marginTop: 10,
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
    buttonTextFoto:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonCadastro:{
        marginTop: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      }
});