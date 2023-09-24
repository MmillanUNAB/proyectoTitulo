import React, {useState} from 'react';
import {FlatList, View, SafeAreaView,StatusBar, StyleSheet,Text,TouchableOpacity, Image, ImageBackground, Linking, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { API_KEY, API_URL } from '../../config/constants';


export default function OptionsScreen({ route,navigation }){

    
    console.log('parametros de las opciones', route.params.sitio);
    const [sitio, setSitios] = useState(route.params.sitio);
    console.log('parametros opciones', sitio.gps);
    

    const login = () => {
        navigation.navigate('Login')
      }

    const renderTitle = () => {
        return (
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Opciones</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style ={styles.subtitle}>Opciones a realizar en el generador</Text>
                </View>
            </View>
        )
    }

    const renderDatosSitio= () => {
        return(
            <View>
                <View style={styles.siteDataContainer}>
                    <Image source={require('../../assets/img/gen-icon.png')} style={styles.iconImage}></Image>
                    <View>
                        <Text style={styles.siteDataText}> Sitio {sitio.codigo +' '+ sitio.nombre +', generador : '}</Text>
                        <Text style={styles.siteDataText}>{sitio.tipogg}</Text>
                    </View>
                </View>
                
            </View>
        )

    }
    
    const renderGps = () => {
        return (
            <View>
                    <FlatList
                    data={sitio.gps}
                    renderItem={({item}) => <GpsListItem gpS={item}/>}
                    />
            </View>
        )
    } 
    
    const GpsListItem =({gpS}) => {
        return (
            <View style={styles.listContainer}>
                <View>
                    <Text style={styles.subtitle}>Opcion</Text>
                </View>
                <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.actionButtons} onPress={()=> handleSmsPress(gpS)}>
                            <Text style={styles.textButton}>{gpS.accion}</Text>
                        </TouchableOpacity>
                        </View>
            </View> 
        )
    }

    const handleSmsPress = async (gpS) => {
        console.log('hla',gpS)
        let body = '';
        switch(gpS.accion){
            case 'encender generador':
                // TODO:
                body = 'stop123456';
                break;
            case 'apagar generador':
                //TODO:
                body ='resume123456';
                break;
            case 'encender controladora':
                //TODO:
                body = 'resume123456';
                break;
            case 'apagar controladora':
                // TODO:
                body = 'stop123456';
                break;
            default:
                break;
        }

        try {
            await registrarAccion(gpS.idgps, gpS.accion);
        } catch (error) {
            
        }

        Alert.alert(
            'confirmar acción',
             `¿Está seguro de realizar la acción - ${gpS.accion}?`, [
                {
                    text: 'Volver',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    style: 'default',
                    onPress: async() => await Linking.openURL(`sms:${gpS.numero}?body=${body}`)
                },
            ],
        );
    }


    const renderButtonsBottom =() => {
        return(

            <View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.moveButtons} onPress={() => navigation.goBack()}>
                        <Text style={styles.textButton}>Volver</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.moveButtons} onPress={login}>
                        <Text style={styles.textButton}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const registrarAccion = async (idGps, accion) => {
        try {
            const usuario = await AsyncStorage.getItem('@user_data');
            console.log(JSON.parse(usuario))
            const request = await fetch(`${API_URL}/accion/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': API_KEY
                },
                body: JSON.stringify({
                    accion,
                    idGps,
                    idUsuario: JSON.parse(usuario).id_usuarios
                })
            });
            const data = await request.json();
            console.log (data)
        } catch (error) {
            console.log('Error al registrar acción: ', error);
        }
    }

    const renderReport =() =>{
        return(
            <View style={styles.reportLinetext}>
                <Text >Para descargar el reporte historico haga click
                </Text>
                <TouchableOpacity onPress={() => descargarReporte()}>
                    <Text style={styles.aquiButton}> AQUÍ</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const descargarReporte = async () => {
        try {
            const request = await fetch(`${API_URL}/accion/descargar`, {
                method: 'GET',
                headers: {
                    'Authorization': API_KEY
                },
            });
            const data = await request.json();
            console.log(data);
            let url = data.data.url;
            console.log("esta es la url del excel",url);
            await download(url);
    
        } catch (error) {
            console.log('Error al descargar reporte: ', error);
        }
    }

    const download = async(url) => {
        console.log('enlace',url)
        const supported = await Linking.canOpenURL(url);
        
        if (supported) {
        await Linking.openURL(url);
        } else {
        console.log('No se pudo descargar archivo');
        }
    }
   

    

    return (
        <ImageBackground source={require('../../assets/img/bg-menu.jpg')} style={styles.bgMain} imageStyle={{opacity: .9}}>
            {renderTitle()}
            {renderDatosSitio()}
            {renderGps()}
            {renderReport()}
            {renderButtonsBottom()}
        </ImageBackground>
      )     







}