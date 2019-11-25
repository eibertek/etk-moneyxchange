import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex:1,
        width:'80%',
        alignSelf:"center",
    },
    logo:{
        width:100,
        height:100,
        marginTop:10,
        alignSelf:"center",
    },
    h1: {
        color:'blue',
        alignSelf:"center",
    },
    loginForm:{
    },    
    loginMailInput:{
        marginBottom:10,
    },    
    loginPasswordInput:{
        marginBottom:20,
    },    
    loginButtonContainer:{
        marginBottom:20,
        justifyContent:'center',
        alignItems: 'center',
    },   
    loginButton:{
        width:'80%',
        backgroundColor:'#1122FF',
    }, 
    loginDivider:{
        marginTop:40,        
        justifyContent:'center',
        alignItems:"center",
        marginLeft:40,
        width:'80%',
    },
    loginDividerText:{
        alignItems:'center',
        top:0,
        backgroundColor:'#FFFFFF',
    },    
    loginToolsContainer:{
        marginTop:40,        
    },    
    loginGoogleButton:{},    
});
