import {AppRegistry,Text} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import React from 'react';

// const App = ()=>{
// return(
//     <Text>helloworld</Text>
// )
// }

AppRegistry.registerComponent(appName, () => App);
