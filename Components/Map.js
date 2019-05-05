import React from 'react';
import { StyleSheet, Text, TextInput,View, TouchableOpacity, Button, Image, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
const util = require('util');


class MapScreen extends React.Component {

    constructor(props){
      super(props);
      const {src, image} = this.props.navigation.state.params;

      this.state={
  
        src : src,
        dst: '',
        image: image
  
      }
      console.log(this.state.src)
    }
    



    static navigationOptions = {
        title: "Map",
        headerLayoutPreset: 'center',
        headerStyle: {
          backgroundColor: '#5ca0d3',
          
          
        },
        headerTintColor: '#f3f9fb',
        headerTitleStyle: {
          fontWeight: 'bold',     
        
        },
    };




    updatePath=()=>{
      fetch(`${global.baseURL}/locate?src=${this.state.src}&&dst=${this.state.dst}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            image:responseJson.src
          })
        })
        .catch((error) => {
          console.log(error)
        });
    }

    render(){
        return(
          <View style={styles.container}> 
          <View style={styles.inputGroup}>
            <Button title='Go To' style={styles.btn}
            onPress={this.updatePath}
            ></Button>
          <TextInput
          style={styles.TextInput}
             placeholder="Hall Number"
           onChangeText={(dst)=>{this.setState({dst})}}
           />
          </View>
          <View>
          <ImageZoom cropWidth={350}
                       cropHeight={500}
                       imageWidth={350}
                       imageHeight={500}
                       >
                <Image 
                      style={styles.map}
                      source={{uri:this.state.image}}/>
            </ImageZoom>
          </View>
            
          </View>
        );
      }
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9fb",
    alignItems: 'center',
    alignContent:'center',
    justifyContent: 'space-around',
    padding:10,

  },
  map:{
    width:350,
    height:500,
    borderWidth: 3,
    borderColor: '#5ca0d3',
    borderRadius: 10,
  },
  inputGroup:{
    flexDirection:'row',
    height:45,
  },
  TextInput:{
    height:45,
    width:150,
    backgroundColor:"#fff",
    // borderRightWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    paddingLeft:10

  },
  btn:{
    height:45,
    borderLeftWidth:1,
    borderColor: '#5ca0d3',
    borderRadius: 2,
    marginBottom: 20
  }
});
