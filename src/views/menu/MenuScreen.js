import React from 'react';
import {FlatList, View, SafeAreaView,StatusBar, StyleSheet,Text,TouchableOpacity, Image, ImageBackground} from 'react-native';

import styles from './styles';

export default function MenuScreen({ navigation }){

    const goToGps = (type) => {
      navigation.navigate('GoToGps', { type })
    }

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
    return (
      <ImageBackground source={require('../../assets/img/bg-menu.jpg')} style={styles.bgMain} imageStyle={{opacity: .9}}>
          {renderTitle()}
      </ImageBackground>
  )
}