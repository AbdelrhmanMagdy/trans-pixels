import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
const util = require('util');
import Camera from './Camera';


 class Home extends React.Component {

  static navigationOptions = {
    title: "Transpixel"

};

// render(){
//   const {navigate} = this.props.navigation;
//   return(
//     <View>
//       <Text>Home</Text>
//       {/* <Button title='go to map' onPress={()=>navigate("Map",{})} /> */}
//     </View>
//   );
// }

  state = {
    enableCamera: false,
    photo: null
  };

  getImage = (image) => {
    this.setState({
      photo: image,
      enableCamera: false
    })
  }

  enableCamera = () => {
    this.setState(() => {
      let { enableCamera } = this.state
      return {
        enableCamera: !enableCamera
      }
    });
  };

  render() {
    const { enableCamera, photo } = this.state;
    return (
  <View style={enableCamera ? {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
      } : styles.container} >
        {enableCamera ?
          <Camera
            getImage={this.getImage}
            enableCamera={this.enableCamera}
            />
          :<View>
               <Button title="Enable Camera" onPress={this.enableCamera} />
          {/* <Button
          title="Go to Map "
          onPress={() => this.props.navigation.navigate("Map")}/> */}
        </View>   }
  
  </View>
    );
}
 }
export default Home ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent:'space-between',
    justifyContent: 'space-between'
  }
});
