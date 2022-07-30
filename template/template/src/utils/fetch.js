import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import Global from '../global';

export default async function request(url, options) {
  let {method = 'POST', body = '', serverId = 'projectId', formdataBody, headers, ...params} = options || {};
  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }
  const header = {
    Accept: 'application/json',
    'content-type': 'application/json',
    ...headers,
  };
  const token = await AsyncStorage.getItem('token');

  let host = await AsyncStorage.getItem('apihost');
  if (host) {
    host = JSON.parse(host);
    host = host.url;
  }
  if (token) {
    header.Authorization = token;
  }
  if (formdataBody) {
    // header['content-type'] = 'application/x-www-form-urlencoded';
    header['content-type'] = 'multipart/form-data';
    params.processData = false;
    params.contentType = false;
    let formdata = new FormData();
    Object.keys(formdataBody).forEach(keyName => {
      formdata.append(keyName, String(formdataBody[keyName]));
    });
    body = formdata;
  }
  const fetchURL = `${host}/${url.replace(/^\//, '')}`;
  // console.log('=> body:', method, fetchURL, body);
  // console.log('=> header:', header);
  // console.log('=> header:', header['x-auth']);
  return fetch(fetchURL, {
    method,
    body: body,
    headers: {...header},
    ...params,
  })
    .then(async response => {
      const data = await response.json();
      if (/(200|201)/.test(response.status)) {
        return data;
      }
      if (/(401)/.test(response.status)) {
        Global.navigation.navigate('SignIn');
        return;
      }
      Alert.alert(`Request Error ${response.status}`, `E2111: ${data.message} - ${fetchURL} - ${JSON.stringify(data)}`);
    })
    .catch(error => {
      Alert.alert('Service abnormal please check server', `E2112:${fetchURL} \n\n ${error.toString()} ${JSON.stringify(body)}`);
    });
}
