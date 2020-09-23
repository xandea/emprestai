import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { KeyboardAvoidingView, Platform, Text, StyleSheet,View,Button, Image, TextInput, TouchableOpacity} from 'react-native';

export default function ShowDetail(){
    const [photo, setPhoto]= useState('');
   

    useEffect(()=> {
        

    }, []);


    async function handlePost(){     
        const response = await api.post('/Produtos', {headers: {user: '5de6f3bd8b3e1a300cfffc56'},name: 'Angelo', descricao: 'carro', status:'vago',categoria:'ferramenta', foto: photo.uri});
        //console.log(photo.uri);     
    }
    //console.log(photo);
        return(
        
            <View style={styles.container}>

                <View style={styles.container2}>

                </View>

                
                <View style={styles.container3}>

                </View>

                <View style={styles.container4}>

                </View>

            </View>

            
             
        
        );
    
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },container2:{
        flex:4,
        backgroundColor:'black'
    },container3:{
        flex:2,
        backgroundColor:'orange'
    },container4:{
        flex:1,
        backgroundColor:'blue'
    }
    });