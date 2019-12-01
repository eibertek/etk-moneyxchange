import React, { useEffect, useState } from 'react'
import { View} from 'react-native'
import { connect } from 'react-redux';
import { getLatestAction, CREDENTIALS } from '../store/redux/actions';
import { Input, Text, Image, Button  } from 'react-native-elements';
import DashboardStyles from './DashboardStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { valueToNode } from '@babel/types';
import Login from '../components/Login';
import LogMessages from './LogMessages';

const Dashboard = (props) => {
    useEffect(() => {
        props.getLatest();
        props.getCredentials();
        return () => {};
    }, ['']);
    
    const [state, setState] = useState({ valueToConvert: 0});

    const base = props.moneyxchange && props.moneyxchange.base;
    const eur = props.moneyxchange && props.moneyxchange.rates && props.moneyxchange.rates.EUR;
    const usd = props.moneyxchange && props.moneyxchange.rates && props.moneyxchange.rates.USD;
    const { name, photo, email} = props.credentials && props.credentials.user || {};
    return (
        <>
        <View style={DashboardStyles.container}>
            {props.loading && <Text>LOADING DATA</Text>}
    {props.messages && props.messages.map ? props.messages.map(error => <Text>{error}</Text>) : <Text>{props.messages}</Text>}
            <Text h2>DASHBOARD</Text>
            <Text>{base} {eur} EUR = {usd} USD</Text>
            <Input keyboardType="decimal-pad"                   
                    leftIcon={<Text style={DashboardStyles.fromInputLeftIcon} >EUR</Text>} 
                    inputStyle={DashboardStyles.fromInputContainer} 
                    onChangeText={(base) => setState({ valueToConvert: parseFloat(base).toFixed(4) })}
                    />
            <Text h3 style={DashboardStyles.dividerContainer}>=</Text>
            <Input leftIcon={<Text style={DashboardStyles.fromInputLeftIcon}>USD</Text>} 
                    disabled
                    inputStyle={DashboardStyles.fromInputContainer} 
                    value={(state.valueToConvert*usd).toFixed(4).toString()} />
        </View>
        <View style={DashboardStyles.container}>
            <ScrollView>
                <View style={{ flex:1, flexDirection:'row'}}>
                    <Text style={{ width:80, fontWeight:'600', fontSize:20,}} >Date</Text>
                    <Text style={{ width:80, fontWeight:'600', fontSize:20, marginLeft:10, paddingLeft:10, borderLeftColor:'#00000', borderLeftWidth:1}}>Change</Text>
                    <Text style={{ width:80, marginLeft:10, fontSize:20, paddingLeft:10, borderLeftColor:'#00000', borderLeftWidth:1}}>in EUR</Text>
                </View>
                {props.historical.map(moneyDay => {
                    return <View style={{ flex:1, flexDirection:'row'}}>
                        <Text  style={{ width:80}}>{moneyDay.date}</Text>
                        <Text style={{ width:80, marginLeft:10, paddingLeft:10, borderLeftColor:'#00000', borderLeftWidth:1}}>{moneyDay.rates.USD.toFixed(4)}</Text>
                        <Text style={{ width:80, marginLeft:10, paddingLeft:10, borderLeftColor:'#00000', borderLeftWidth:1}}>{(state.valueToConvert*moneyDay.rates.USD).toFixed(4)}</Text>
                    </View>
                })}
            </ScrollView>           
        </View>
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
                    <Button 
                        onPress={()=> { props.navigation.navigate('Logger')}} 
                        title="Logger"                          
                        buttonStyle={DashboardStyles.credentialsLogOutButton}/>

                </View>} 
        </>
    )
}

const mapStateToProps = (state) => ({
    moneyxchange: state.services.moneyxchange, 
    historical: state.services.historical, 
    messages: state.services.messages,    
    loading: state.services.loading,   
    credentials: state.services.credentials,
});
const mapDispatchToProps = (dispatch) => ({
    getLatest: () => dispatch(getLatestAction()),
    getCredentials: () => dispatch({ type: CREDENTIALS.REQUESTED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
