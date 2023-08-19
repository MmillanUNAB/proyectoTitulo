import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
    bgMain: {
        flex: 1, 
        backgroundColor: '#000',
        resizeMode: 'contain',
        backgroundColor: 'rgba(0,0,0,.6)',
        width: '100%'
    },
    titleContainer: {
        marginTop: '10%'
    },
    title: {
        color: '#151515',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitleContainer: {
        marginTop: '20@vs',
    },
    subtitle:{
        color:'#151515',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center'
    }

})