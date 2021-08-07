import {getUniqueId, getVersion} from 'react-native-device-info';

export default {
  /**
   * AndroidX Support
   * This module defaults to AndroidX you should configure your library versions similar to
   * this in your `android/build.gradle` file's "ext" block
   * https://www.npmjs.com/package/react-native-device-info#androidx-support
   */
  uid: getUniqueId(),
  /**
   * Gets the application version.
   */
  version: getVersion(),
  /**
   * The production value is `true` and there is no host option interface.
   */
  production: false,
  /**
   * Default first.
   */
  hosts: [
    {
      label: 'Native Mock API',
      type: 'Test',
      url: 'http://localhost:3721',
    },
    {
      label: 'Production Environment',
      type: 'production',
      url: 'http://103.20.249.82:18901',
    },
  ],
};
