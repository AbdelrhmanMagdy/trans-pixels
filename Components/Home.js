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
    title: "Transpixel"

  };


  render() {
    const {
      navigate
    } = this.props.navigation;
    return ( 
    <View>
      <Text>Home</Text>
      { <Button title = 'go to map'
        onPress = {
          // () => this.callOCR()
          () => navigate("Camera", {})
        }
      />} 
    </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-between'
  }
});