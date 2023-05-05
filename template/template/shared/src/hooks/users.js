import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogin, userAuth } from '../services/users';
import { useQuery, useMutation } from 'react-query';
import Global from '../global';
import conf from '../config';
import { useSelector, useDispatch } from 'react-redux'
// 登录
export const login = ({ mutationKey }) => {
  const dispatch = useDispatch()
  const mutation = useMutation({
    mutationKey,
    mutationFn: userLogin,
    onSuccess: async data => {
      if (data?.token && data?.data) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.data));
        dispatch({
          type: "global/update",
          payload: {
            token: data.token,
            userData: JSON.stringify(data.data)
          }
        })
        if (Global.navigation) {
          Global.navigation.replace('Tab');
        }
      } else if (data && data.message) {
        Alert.alert(`Login failed - ${data.error}`, data.message);
      }
    },
  });
  return mutation;
};

// 验证token
export const useAuthToken = () => {
  const { token } = useSelector(state => state.global)
  const dispatch = useDispatch()
  const mutation = useMutation({
    mutationFn: userAuth,
    onMutate: async () => {
      let host = await AsyncStorage.getItem('apihost');
      if (!host && conf.hosts[0]) {
        await AsyncStorage.setItem('apihost', JSON.stringify(conf.hosts[0]));
        dispatch({
          type: "global/update",
          payload: {
            apihost: conf.hosts[0]
          }
        })
      }
      if (!token) {
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('token');
      }
    },
    onSuccess: async data => {
      if (data?.token) {
        dispatch({
          type: "global/update",
          payload: {
            token: data.token,
            authState: true
          }
        })
      } else {
        dispatch({
          type: "global/update",
          payload: {
            authState: true,
            token: null
          }
        })
      }
    },
  });
  return mutation;
};
