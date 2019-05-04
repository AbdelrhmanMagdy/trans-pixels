import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
const util = require('util');
import Camera from './Camera';

class Home extends React.Component {

  static navigationOptions = {
    title: "Transpixel",
    headerLayoutPreset: 'center',
    headerStyle: {
      backgroundColor: '#5ca0d3',
      
      
    },
    headerTintColor: '#f3f9fb',
    headerTitleStyle: {
      fontWeight: 'bold',     
      marginLeft:150
    },


  };


  render() {
    const {
      navigate
    } = this.props.navigation;
    return ( 
      <View style = {styles.container}>
      <Text style={styles.text}>Lost Your Way ?</Text>
      <TouchableOpacity title='go to map' onPress={()=>navigate("Camera",{})} style = {styles.scan} >
        {/* <Text style={styles.btnText}>Help</Text> */}
        <Image
        style={styles.btnText}
        source={require('../assets/finger.png')}
      />
      </TouchableOpacity>
    </View>
    );
  }
}

export default Home ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5ca0d3',
    alignItems: 'center',
    // alignContent:'center',
    justifyContent: 'space-around',
    padding:10,

  },
  text:{
    fontSize:90,
    fontWeight:'bold',
    alignSelf:'center',
    marginLeft:90,
    color:'#e3e7f1'

  },
  scan:{
    width:100,
    height:120,
    backgroundColor: "#f3f9fb",
    borderWidth: 1,
    borderColor: '#f3f9fb',
    borderRadius: 60,
    alignItems:'center',
    justifyContent: 'center',
  },
  btnText:{
    // color:'#5ca0d3',
    // fontSize:25,
    // fontWeight:'bold',
    width:100,
    height:100
    
  }
});