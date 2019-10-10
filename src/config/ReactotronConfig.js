import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  /**
   * If using USB:
   * Reactotron.configure({ host: '192.168.0.2' })
   *  With the IP being your local machine
   *
   * If using an emulator and it doesn't work:
   * You'll have to redirect port with
   *  adb reverse tcp:9090 tcp:9090
   */
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
