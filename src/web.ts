import { WebPlugin } from "@capacitor/core";

import { FirebaseAnalyticsPlugin, FirebaseInitOptions } from "./definitions";

declare var window: any;

export class FirebaseAnalyticsWeb
  extends WebPlugin
  implements FirebaseAnalyticsPlugin {
  private not_supported_mssg = "This method is not supported";
  private analytics_missing_mssg =
    "Firebase analytics is not initialized. Make sure initializeFirebase() is called once";

  private analyticsRef: any;

  /**
   * Configure and Initialize FirebaseApp if not present
   * @param options - web app's Firebase configuration
   * @returns firebase analytics object reference
   * Platform: Web
   */
  initializeFirebase(options: FirebaseInitOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {

      let app = options.app;
      if (!app) {
        reject(this.analytics_missing_mssg);
        return;
      }

      this.analyticsRef = app.analytics();
      resolve(this.analyticsRef);
    });
  }

  /**
   * Sets the user ID property.
   * @param options - userId: unique identifier of the user to log
   * Platform: Web/Android/iOS
   */
  setUserId(options: { userId: string; app: any }): Promise<void> {
    return new Promise(async (resolve, reject) => {

      let app = options.app;
      if (!app) {
        reject(this.analytics_missing_mssg);
        return;
      }

      this.analyticsRef = app.analytics();

      const { userId } = options || { userId: undefined };

      if (!userId) {
        reject("userId property is missing");
        return;
      }

      this.analyticsRef.setUserId(userId);
      resolve();
    });
  }

  /**
   * Sets a user property to a given value.
   * @param options - name: The name of the user property to set.
   *                  value: The value of the user property.
   * Platform: Web/Android/iOS
   */
  setUserProperty(options: { name: string; value: string; app: any }): Promise<void> {
    return new Promise(async (resolve, reject) => {

      let app = options.app;
      if (!app) {
        reject(this.analytics_missing_mssg);
        return;
      }

      this.analyticsRef = app.analytics();

      const { name, value } = options || { name: undefined, value: undefined };

      if (!name) {
        reject("name property is missing");
        return;
      }

      if (!value) {
        reject("value property is missing");
        return;
      }

      let property: any = {};
      property[name] = value;
      this.analyticsRef.setUserProperties(property);
      resolve();
    });
  }

  /**
   * Retrieves the app instance id from the service.
   * @returns - instanceId: current instance if of the app
   * Platform: Web/Android/iOS
   */
  getAppInstanceId(): Promise<{ instanceId: string }> {
    return new Promise((resolve, _reject) => resolve);
  }

  /**
   * Sets the current screen name, which specifies the current visual context in your app.
   * @param options - screenName: the activity to which the screen name and class name apply.
   *                  nameOverride: the name of the current screen. Set to null to clear the current screen name.
   * Platform: Android/iOS
   */
  setScreenName(_options: {
    screenName: string;
    nameOverride: string;
  }): Promise<void> {
    return new Promise((resolve, _reject) => resolve);
  }

  /**
   * Clears all analytics data for this app from the device and resets the app instance id.
   * Platform: Android/iOS
   */
  reset(): Promise<void> {
    return new Promise((resolve, _reject) => resolve);
  }

  /**
   * Logs an app event.
   * @param options - name: unique name of the event
   *                  params: the map of event parameters.
   * Platform: Web/Android/iOS
   */
  logEvent(options: { name: string; params: object; app: any }): Promise<void> {
    return new Promise(async (resolve, reject) => {

      let app = options.app;
      if (!app) {
        reject(this.analytics_missing_mssg);
        return;
      }

      this.analyticsRef = app.analytics();

      const { name, params } = options || {
        name: undefined,
        params: undefined,
      };

      if (!name) {
        reject("name property is missing");
        return;
      }

      this.analyticsRef.logEvent(name, params);
      resolve();
    });
  }

  /**
   * Sets whether analytics collection is enabled for this app on this device.
   * @param options - enabled: boolean true/false to enable/disable logging
   * Platform: Web/Android/iOS
   */
  setCollectionEnabled(options: { enabled: boolean; app: any }): Promise<void> {
    return new Promise(async (resolve, reject) => {

      let app = options.app;
      if (!app) {
        reject(this.analytics_missing_mssg);
        return;
      }

      this.analyticsRef = app.analytics();

      const { enabled } = options || { enabled: false };
      this.analyticsRef.setAnalyticsCollectionEnabled(enabled);
      resolve();
    });
  }

  /**
   * Sets the duration of inactivity that terminates the current session.
   * @param options - duration: duration of inactivity
   * Platform: Android/iOS
   */
  setSessionTimeoutDuration(_options: { duration: number }): Promise<void> {
    return new Promise((_resolve, reject) => {
      reject(this.not_supported_mssg);
    });
  }

  /**
   * Returns analytics reference object
   */
  get remoteConfig() {
    return this.analyticsRef;
  }

  enable(): Promise<void> {
    return new Promise((_resolve, reject) => {
      reject(this.not_supported_mssg);
    });
  }

  disable(): Promise<void> {
    return new Promise((_resolve, reject) => {
      reject(this.not_supported_mssg);
    });
  }
}