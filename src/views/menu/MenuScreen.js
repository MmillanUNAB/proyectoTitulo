import React,{useState} from 'react';
import {FlatList, View, SafeAreaView,StatusBar, StyleSheet,Text,TouchableOpacity, Image, ImageBackground, Linking, Alert} from 'react-native';

import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, API_URL } from '../../config/constants';

export default function MenuScreen({route,navigation}){
    
    console.log('parametros del menu', route.params.sitios);
    const [sitios, setSitios] = useState(route.params.sitios);

    const options = (sitio) => {
      navigation.navigate('Options',{sitio})
    }
    //TITULOS PANTALLA MENU
    const renderTitle = () => {
        return (
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Menu generadores</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style ={styles.subtitle}>Selecciona un generador para ver las opciones disponibles</Text>
                </View>
            </View>
        )
    }

    //LISTAR LOS SITIOS OBTENIDOS DESDE LA API
    const renderSitios = () => {
        return(
            <View>
                    <FlatList
                    data={sitios}
                    renderItem={({item}) => <SiteListItem site={item}/>}
                    keyExtractor={item=> item.idsitios} 
                    />
            </View>
        )

    }

    //VALORES A MOSTRAR EN EL LISTADO DE SITIOS POR CADA UNO
    const SiteListItem =({site}) => {
        return (
            <View>
                <View style={styles.siteListContainer}>
                    <TouchableOpacity onPress={()=>options(site)}>
                        <Image source={require('../../assets/img/gen-icon.png')} style={styles.iconImage}></Image>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.siteName}>{site.nombre + ' - '+ site.codigo}</Text>

                        <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.ButtonOn} onPress={()=> handleSmsPress(site.gps[0])}>
                            <Text style={styles.textButton}>Encender</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.ButtonOff} onPress={()=> handleSmsPress(site.gps[1])}>
                                <Text style={styles.textButton}>Apagar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        )
    }

    //ADMINISTRAR ENVIO DE SMS encendido y apagado
    const handleSmsPress = async (gpS) => {
        console.log('hla',gpS)
        let body = '';
        switch(gpS.accion){
            case 'encender generador':
                // TODO:
                body = 'stop123456';
                break;
            case 'apagar generador':
                // TODO:
                body = 'resume123456';
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
             '¿Está seguro de realizar esta acción?', [
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

    return (
      <ImageBackground source={require('../../assets/img/bg-menu.jpg')} style={styles.bgMain} imageStyle={{opacity: .9}}>
          {renderTitle()}
          {renderSitios()}
      </ImageBackground>
    )     
}