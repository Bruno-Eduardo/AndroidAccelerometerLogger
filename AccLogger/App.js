import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import api from './src/services/api';

export default function App() {
  const [semaphoreStopAppending, setSemaphoreStopAppending] = useState(false);
  const [data, setData] = useState({});
  const [dataArray, setDataArray] = useState([]);
  const [dataWasUploaded, setdataWasUploaded] = useState(false);

  async function saveDataToArray(){
    timedData = {...data,
                 ...{'time':date.getTime()}
                 }
    setDataArray([...dataArray, timedData]);
  }

  async function sendDataArrayToDB(dataArray){
    try {
      const response = await api.post('newdata', dataArray);
      setdataWasUploaded(true);
      return true;
    }
    catch (e) {
      console.log(e);
      setdataWasUploaded(false);
      return false
    }
  }

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!semaphoreStopAppending && dataArray.length < 500){ // will  lose data while creating readyDataArray
      saveDataToArray();
    }
    else{
      setSemaphoreStopAppending(true)
      console.log('critical area');
      sendDataArrayToDB(dataArray);
      setDataArray([]);
      setSemaphoreStopAppending(false);
    }
  }, [data]);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(2);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;
  Accelerometer.setUpdateInterval(10);
  const date = new Date();
  return (
    <View style={styles.container}>
      <Text>Accelerometer: (in Gs where 1 G = 9.81 m s^-2) {FileSystem.documentDirectory}</Text>
      <Text>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View>
        <TouchableOpacity onPress={_toggle}>
          <Text>Toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
      <Text>Last upload status: {String(dataWasUploaded)}</Text>
      <Text>Main List length: {dataArray.length}</Text>
      <Text>Time: {date.getTime()}</Text>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 1000000) / 1000000;
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
  }
})
