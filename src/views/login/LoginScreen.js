import React,{useState} from "react";
import {View, Text,TextInput, ImageBackground, TouchableOpacity, Image,secureTextEntry, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import { API_KEY, API_URL } from "../../config/constants";

export default function LoginScreen({ navigation }){

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState ('');
    
    const login = async () => {
        if(usuario === '' || password === ''){
            Alert.alert(
                'Error',
                'Debe ingresar su usuario y contraseña', [
                    {
                        text: 'Cerrar',
                        style: 'cancel'
                    },
                ],
            );
            return;
        }
        try {
            const req = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY
                },
                body: JSON.stringify({
                    usuario, password
                })
            });
            const data = await req.json();
            console.log(data);
            if(!data.ok || (data.ok && !data.data)){
                Alert.alert(
                    'Error',
                    'El usuario o la contraseña son incorrectos', [
                        {
                            text: 'Cerrar',
                            style: 'cancel'
                        },
                    ],
                );
                return;
            }

            await AsyncStorage.setItem('@user_data', JSON.stringify(data.data.usuario));
            await AsyncStorage.setItem('@sitios_data',JSON.stringify(data.data.sitios));
            navigation.navigate('Menu', {sitios:data.data.sitios});
            
        } catch (error) {
            console.log('ERROR DE LOGIN: ', error);
        }
    }

    const setInputValue = (input, value) => {
        switch(input){
            case 'usuario':
                setUsuario(value);
                break;
            case 'password':
                setPassword(value);
            default: 
                break;
        }
    }

    const renderTitle =() => {
        return(
            <View>
                <View style={styles.titleContainer}>
                    <Text style ={styles.title}>Bienvenido a</Text>
                    <View style={styles.logoContainer}>
                        <Image source={require ('../../assets/img/logo.png')} style={styles.logoImage}/>
                    </View>
                    <Text style ={styles.title2}>REM <Text style={styles.title3}> GEN</Text></Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style ={styles.subtitle}> controlador remoto de generadores</Text>
                </View>
            </View>
            
        );
    }

    const renderForm = () => {
        return (
            <View>
                <View style={styles.formContainer}>
                    <TextInput 
                        placeholder='Ingresa tu nombre de usuario'
                        value={usuario}
                        style={styles.formInput}
                        onChangeText={(text) => setInputValue('usuario', text)}
                    />
                    <TextInput 
                        placeholder='Ingresa tu contraseña'
                        value={password}
                        secureTextEntry={true}
                        style={styles.formInput}
                        onChangeText={(text) => setInputValue('password', text)}
                    />
                </View>
                <View style={styles.formButtonContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress= {login}>
                        <Text style={styles.textButton}>Ingresar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    

    return(
            <ImageBackground source={require('../../assets/img/bg-login.png')} style={styles.bgLogin}>
                {renderTitle()}
                {renderForm()}
            </ImageBackground>
    )
}