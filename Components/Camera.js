import React from 'react';
import { Text, View, TouchableOpacity , ToastAndroid, ActivityIndicator} from 'react-native';
import { Camera, Permissions } from 'expo';
import MapScreen from './Map';

export default class CameraC extends React.Component {

  camera = null;
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    ready:false,
    showSpinner: false
  };

  static navigationOptions = {
    title: "Scan"
};
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  getMyLocation(img){
    const url = 'http://192.168.1.30:5000/mark'
    const data = new FormData();
    const imguri = img.uri
    const imgName = imguri.split('/').pop()
    const imgType = imgName.split('.').pop()
    data.append('image', {
      uri: imguri,
      type: `image/${imgType}`,
      name: imgName
    });
    options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: data,
    }
    return fetch(url, options)
      .then(res=>JSON.parse(res._bodyText))
      .catch(console.log);
  }

  // capture the photo
  snap = async () => {
    let { photo } = this.state;
    const { navigate } =  this.props.navigation;
    if (this.camera) {
      photo = await this.camera.takePictureAsync();
      this.setState({ready:true});
      // Http Request
      let {src, location} = await this.getMyLocation(photo)
      if (src){
        navigate('Map', {image: photo })
      }else{
        ToastAndroid.showWithGravityAndOffset(
          "invalid image!",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    }
  }


  render() {
    const { hasCameraPermission, showSpinner } = this.state;
    const msg = "invalid image!"
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;}
    else {
      return (

        <View style={{ flex: 1 }
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
              </TouchableOpacity>

            </View>
          </Camera>
        </View >
      )
    }
  }
}
