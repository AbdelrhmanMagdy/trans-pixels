import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  camera = null;
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    let { photo } = this.state;
    if (this.camera) {
      photo = await this.camera.takePictureAsync();
      // Http Request

      this.props.getImage(photo);
    }
  }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (

        < View style={{ flex: 1 }
        }>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={cam => { this.camera = cam; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >

              <TouchableOpacity
                style={{
                  flex: 0.3,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={this.snap}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, marginLeft: 10, color: 'white' }}
                >Capture</Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={{
                  flex: 0.3,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={this.props.enableCamera}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, marginLeft: 80, color: 'white' }}
                >Back</Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-start',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {' '}
                  Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View >
      )
    }
  }
}

