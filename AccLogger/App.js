import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [data, setData] = useState({});
  const [dataWasUploaded, setdataWasUploaded] = useState(true);
  
  async function saveDataToDB(){
    try {
      const response = await api.post('newdata',{
        params:{
          data
        }
      });
      setdataWasUploaded(true)
    }
    catch (e) {
      setdataWasUploaded(false)
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
    saveDataToDB();
  }, [data]);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(10);
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
  Accelerometer.setUpdateInterval(10)
  return (
    <View>
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
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 1000000) / 1000000;
}
