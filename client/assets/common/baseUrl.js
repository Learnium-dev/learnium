import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://192.168.30.16:3000/api/v1/'
: baseURL = 'http://10.0.2.2:3000/api/v1/'
}

export default baseURL;
