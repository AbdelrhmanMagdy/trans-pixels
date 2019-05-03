import React from 'react';
import {Text,View} from 'react-native';
import {StackNavigator} from 'react-navigation'
import MapScreen from './Components/Map';
import Home from './Components/Home';
import CameraC from './Components/Camera';


const Navigation = StackNavigator({
  Home :{screen:Home},
  Map :{screen:MapScreen},
  Camera:{screen:CameraC}

});

export default Navigation ;