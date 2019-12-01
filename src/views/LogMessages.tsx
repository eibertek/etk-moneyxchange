import React, { useEffect, useState } from 'react'
import { View} from 'react-native'
import { connect } from 'react-redux';
import { getLatestAction, CREDENTIALS } from '../store/redux/actions';
import { Input, Text, Image, Button  } from 'react-native-elements';
import DashboardStyles from './DashboardStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { valueToNode } from '@babel/types';
import Login from '../components/Login';

const Dashboard = (props) => {
    useEffect(() => {
        props.getLatest();
        props.getCredentials();
        return () => {};
    }, ['']);
    const { name, photo, email} = props.credentials && props.credentials.user || {};
    return (
        <>
        <View style={DashboardStyles.container}>
            {props.loading && <Text>LOADING DATA</Text>}
            <ScrollView>
                {props.loggedMessage && props.loggedMessage.map(error => <Text>{error}</Text>)}         
            </ScrollView>
            {props.credentials && <View style={DashboardStyles.credentialsContainer}>
                    <Image source={{uri:photo}} style={DashboardStyles.credentialsPhoto} />
                    <View style={{flex:1, flexDirection:"column", width:500}}>
                        <Text style={DashboardStyles.credentialsText}>{name}</Text>
                        <Text style={DashboardStyles.credentialsText}>{email}</Text>
                    </View>
                    <Button 
                        onPress={()=> { Login.googleSignOut(); props.navigation.navigate('Auth')}} 
                        title="Sign Out"                          
                        buttonStyle={DashboardStyles.credentialsLogOutButton}/>
                </View>}            
        </View>
        </>
    )
}

const mapStateToProps = (state) => ({
    moneyxchange: state.services.moneyxchange, 
    historical: state.services.historical, 
    messages: state.services.messages,  
    loggedMessage: state.services.loggedMessage,  
    loading: state.services.loading,   
    credentials: state.services.credentials,
});
const mapDispatchToProps = (dispatch) => ({
    getLatest: () => dispatch(getLatestAction()),
    getCredentials: () => dispatch({ type: CREDENTIALS.REQUESTED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
