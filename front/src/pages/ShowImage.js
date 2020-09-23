import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { KeyboardAvoidingView, Platform, Text, StyleSheet,View,Button, Image, TextInput, TouchableOpacity} from 'react-native';

export default function ShowDetail({navigation}){
    const id = navigation.getParam('produto');
    //console.log(id)
    const [photo, setPhoto]= useState('');
    const [users, setUsers] = useState([]);
   

    useEffect(()=> {
        async function loadUsers(){
           const response = await api.get('/ProdutosIndi',{headers:{_id: id}})
           //const response = await api.get('/Listagem');
           setUsers(response);
        }
        loadUsers();
        
    }, [id]);

    

    //console.log(users.name)
    async function handlePost(){     
        const response = await api.post('/Produtos', {headers: {user: '5de6f3bd8b3e1a300cfffc56'},name: 'Angelo', descricao: 'carro', status:'vago',categoria:'ferramenta', foto: photo.uri});
        //console.log(photo.uri);     
    }
    //name();
    //console.log(users);
        return(
            <View style={styles.container}>
                {users.length === 0 
                ? <Text style={styles.empty}>Acabou</Text>
                : (users.data.map((user,index)=> (       
                     <View style={styles.container}> 
                        <Text style={styles.buttonTitle}>{user.name}</Text>  
                            <View style={styles.foto}>
                                <Image
                                source={{uri: user.foto}}
                                style={{width:300, height:300}}
                                />
                            </View>

                            <View style={styles.container2}>
                                <Text style={styles.tituloDescricao}>Informações</Text>
                                <Text style={styles.textoDescricao}>{user.descricao}</Text>
                            </View>

                            <View style={styles.container3}>
                                <Text style={styles.textoPagamento}>R${user.preco}</Text>
                                <TouchableOpacity /*onPress={handleSubscribe}*/ style={styles.buttonPagar}>
                                    <Text style={styles.buttonTextPagar}>Pagar</Text>
                                </TouchableOpacity>
                            </View>

                    </View>      
        
                )))}
                
            </View>

            
             
        
        );
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#DDDDDD'
    },container2:{
        flex:4,
        backgroundColor:'#DDDDDD'
    },container3:{
        flex:2,
        backgroundColor:'#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    foto:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle:{
        color: '#DF4723',
        fontWeight: 'bold',
        fontSize: 35,
        paddingLeft: 25
    },
    tituloDescricao:{
        paddingTop:5,
        color: '#DF4723',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 25
    },
    textoDescricao:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 30
    },
    textoPagamento:{
        color: '#DF4723',
        fontWeight: 'bold',
        fontSize: 15,
    },
    buttonTextPagar:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    buttonPagar:{
        height:45,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius:4,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    });