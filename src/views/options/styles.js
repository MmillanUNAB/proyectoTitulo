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
    buttonsContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    moveButtons: {
        backgroundColor: '#223bc9',
        borderRadius: 10,
        borderWidth: 2,
        marginTop:'15@vs',
        marginBottom:10,
        paddingVertical: '10@vs',
        width: '70%'
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    listContainer:{
        marginTop: '2@vs',
        paddingLeft:10,
        paddingVertical:4,
        flexDirection: 'column'
    },
    actionButtons: {
        backgroundColor: '#223bc9',
        borderRadius: 10,
        borderWidth: 2,
        marginVertical: '5@vs',
        marginTop:'15@vs',
        paddingVertical: '7@vs',
        width: 170
    },
    iconImage:{
        width:100,
        height:100,
        marginRight:10,
        marginLeft:10
    },
    siteDataContainer:{
        alignItems:'center',
        marginTop: '5@vs',
        paddingLeft:10,
        paddingVertical:10,
        flexDirection:'row'
    },
    siteDataText:{
        textAlign: 'left',
        marginTop: '4@vs',
        color:'#000'

    },
    reportLinetext:{
        flexDirection:'row',
        textAlignVertical:'bottom',
        marginLeft:40
    },
    aquiButton:{
        color:'#223bc9',
        textDecorationLine:'underline',
        fontSize: 14,
        fontWeight:'bold',
        textAlignVertical:'top',

    }
})