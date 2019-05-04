import React from 'react';
import { Text, View, TouchableOpacity , ToastAndroid, ActivityIndicator, StyleSheet} from 'react-native';
import { Camera, Permissions } from 'expo';
import MapScreen from './Map';

class CameraC extends React.Component {

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
    const url = 'http://192.168.1.8:5000/mark'
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
        navigate('Map', {src: location, image:src })
      }else{
        ToastAndroid.showWithGravityAndOffset(
          "invalid image!",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          1000,
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
                flexDirection: 'row',
                justifyContent:'center'
              }}
            >

              <TouchableOpacity
                style={styles.capture}
                onPress={this.snap}
              >
                <View style={styles.inCap}></View>
              </TouchableOpacity>


            </View>
          </Camera>
        </View >
      )
    }
  }
}

export default CameraC ;

const styles = StyleSheet.create({
  cam: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent:'center',

  },

  capture:{
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor:'transparent',
    width:70,
    height:70,
    borderWidth: 2,
    borderColor: '#e3e7f1',
    borderRadius: 40,
    marginBottom: 15,
    justifyContent:'center',
    alignItems:'center'
  },

  inCap:{
    backgroundColor:'#fff',
    width:60,
    height:60,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
  }
  

});