import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';

const timerStartValue = '25:00';
const format = 'mm:ss';

const MainScreen = () => {
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(timerStartValue);
  const timerId = useRef<NodeJS.Timer>();

  const onPause = () => {
    setStarted(false);
    clearInterval(timerId.current);
  };

  const onStart = () => {
    setStarted(true);
    timerId.current = setInterval(() => {
      setTimer(prev => {
        let currentTime = moment(prev, format);
        if (currentTime > moment(timerStartValue, format))
          clearInterval(timerId.current);
        return currentTime.subtract(1, 'second').format(format);
      });
    }, 1000);
  };

  const onStop = () => {
    setStarted(false);
    setTimer(timerStartValue);
    clearInterval(timerId.current);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.groupText}>
        <Text style={styles.timer}>{timer}</Text>
        <Text style={styles.currentActivity}>Current activity</Text>
      </View>
      <View style={styles.groupButton}>
        {(timer !== timerStartValue || started) && (
          <TouchableOpacity style={styles.stopButton} onPress={onStop}>
            <Image
              style={styles.stopIcon}
              source={require('../../assets/img/mdi_stop.png')}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.playButton}
          onPress={started ? onPause : onStart}>
          <Image
            style={styles.playIcon}
            source={
              started
                ? require('../../assets/img/mdi_pause.png')
                : require('../../assets/img/mdi_play.png')
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupText: {
    marginTop: 'auto',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  currentActivity: {
    marginTop: 16,
    fontSize: 17,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#000',
  },
  timer: {
    fontSize: 90,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#000',
  },
  groupButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  stopButton: {
    marginBottom: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 100,
    width: 80,
    height: 80,
  },
  playButton: {
    marginBottom: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  playIcon: {
    width: 48,
    height: 48,
    resizeMode: 'center',
  },
  stopIcon: {
    width: 32,
    height: 32,
    resizeMode: 'center',
  },
});

export default MainScreen;
