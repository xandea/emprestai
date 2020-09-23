import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';

import api from '../services/api';
import ShowImage from '../pages/ShowImage';

import logo from '../assets/logo2.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png';
import { FlatList } from 'react-native-gesture-handler';

export default function Main({ navigation }) {
    const id = navigation.getParam('_id');
    //console.log(id);
    const [users, setUsers] = useState([]);
    const [produto, setProduto] = useState(0);
    const [categoria, setCategoria] = useState('ferramentas');
    //console.log(produto);
    
    
    

    useEffect(()=> {
        async function loadUsers(){
            //const response = await api.get('/Listagem')
          
            const response = await api.get('/ProdutosCat',{headers:{categoria: categoria}})
            
            setUsers(response);
            
         
        }
        loadUsers();
        
    }, [id]);

    async function handleLogout(){
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    async function mostrarDetalhes(){
        if(produto!=""){
            navigation.navigate('ShowImage',{produto});
        } 
    }

    async function atualizaferramenta(){
        if(categoria!=""){
            const response = await api.get('/ProdutosCat',{headers:{categoria: 'ferramenta'}})
            setProduto("");
            setUsers(response);
        } 
    }

    async function atualizaqualquer(){
        if(categoria!=""){
            const response = await api.get('/ProdutosCat',{headers:{categoria: 'Qualquer'}})
            setProduto("");
            setUsers(response);
        } 
    }
    
    console.log(categoria);
    mostrarDetalhes();
    return(
        <SafeAreaView style={styles.background}>
            
                <View style={styles.headerTop}>
                    <ScrollView 
                    style={styles.scrollView} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    >
                        <TouchableOpacity style={styles.button}>
                            <Icon name="book" size={50} color="black"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={atualizaferramenta}>
                            <Icon1  name="tools" size={50} color="black"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={atualizaqualquer}>
                        <Icon1 name="pencil-ruler" size={50} color="black"/>
                            
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                        <Icon1 name="socks" size={50} color="black"/>
                            
                        </TouchableOpacity> 
                    </ScrollView>
                </View>
                <Text>dsada</Text>

            <ScrollView 
            style={styles.scrollView2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.headerdown}>
                {users.length === 0 
                ? <Text style={styles.empty}>Acabou</Text>
                : (users.data.map((user,index)=> (
                        <View key={user._id}style={styles.product}>
                            <Image style = {styles.image} source={{uri: user.foto/*uri:  'https://facebook.github.io/react-native/img/tiny_logo.png'*/}} />
                            <Button
          title={user.name}
          onPress={() => setProduto(user._id)}
          />
                            
            
                        </View>
                )))}
            </View>
 
            </ScrollView>
            
            
            
        </SafeAreaView>
    );
    
}

    /*onPressButton(){
        const {navigate} = this.props.navigation;
    };*/

const styles = StyleSheet.create({
    background:{
       flex:1
    },
    scrollView: {
        backgroundColor: '#DF4723',
      },
    scrollView2: {
        backgroundColor: '#DDDDDD',
        flex:4,
      },
    headerTop:{
        flex:0.3,
        backgroundColor: '#DF4723',
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerdown:{
        padding:12,
        backgroundColor: '#DDDDDD',
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        width:100,
        height:100,
        borderRadius: 50, //metade para ficar circular
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20, //espaçamento entre as laterias
        elevation: 2, //sombra
    },
    product:{
    width: 179,
    height: 220,
    borderWidth: 1,
    borderColor: "white",
    marginTop: 6,
    marginEnd:5
    },
    image:{
        flex:1,
    },
    describeProduct:{
        flex:0.2,
        fontWeight:'bold',
        backgroundColor: '#FFF',
        fontSize:19,
    }
});