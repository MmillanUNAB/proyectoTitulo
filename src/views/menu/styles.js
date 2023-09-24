import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
    bgMain: {
        flex: 1, 
        backgroundColor: '#000',
        resizeMode: 'contain',
        backgroundColor: 'rgba(0,0,0,.9)',
        width: '100%'
    },
    titleContainer: {
        marginTop: '10%'
    },
    title: {
        color: '#000',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitleContainer: {
        marginTop: '10@vs',
    },
    subtitle:{
        color:'#000',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center'
    },
    siteListContainer:{
        marginTop: '5@vs',
        borderBottomWidth:2,
        borderBottomColor:'#000',
        paddingLeft:15,
        paddingVertical:10,
        flexDirection:'row'
    },
    siteName:{
        flexDirection:'row',
        color:'#000',
    },
    iconImage:{
        width:60,
        height:60,
        marginRight:10
    },
    ButtonContainer: {
        alignItems: 'flex-end',
        display: 'flex',
    },
    ButtonOn: {
        backgroundColor: '#223bc9',
        borderRadius: 10,
        borderWidth: 2,
        marginVertical: '5@vs',
        paddingVertical: '7@vs',
        width: 110
    },
    ButtonOff: {
        backgroundColor: '#223bc9',
        borderRadius: 10,
        borderWidth: 2,
        marginVertical: '5@vs',
        marginTop:'21@vs',
        paddingVertical: '7@vs',
        width: 115,
        lineHeight:10,
        marginLeft:'10@vs'
    },
    textButton: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center'
    }

})