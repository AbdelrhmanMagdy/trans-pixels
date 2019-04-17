import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';

import Camera from './Components/Camera';


export default class App extends React.Component {
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
      } : styles.container}>
        {enableCamera ?
          <Camera
            getImage={this.getImage}
            enableCamera={this.enableCamera}
          />
          : <Button title="Enable Camera" onPress={this.enableCamera} />
        }
        {
          enableCamera ? null : photo
            ?
            <Image
              style={{ width: 100, height: 100, marginTop: 20 }}
              source={photo} />
            : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
