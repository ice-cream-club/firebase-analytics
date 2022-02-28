var capacitorPlugin = (function (exports, core) {
    'use strict';

    const FirebaseAnalytics = core.registerPlugin("FirebaseAnalytics", {
        web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.FirebaseAnalyticsWeb()),
    });

    var __rest = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    class FirebaseAnalyticsWeb extends core.WebPlugin {
        constructor() {
            super();
            this.not_supported_mssg = "This method is not supported";
            this.options_missing_mssg = "Firebase options are missing";
            this.analytics_missing_mssg = "Firebase analytics is not initialized. Make sure initializeFirebase() is called once";
            this.ready = new Promise((resolve) => (this.readyResolver = resolve));
            this.readyResolver();
        }
        /**
         * Configure and Initialize FirebaseApp if not present
         * @param options - web app's Firebase configuration
         * @returns firebase analytics object reference
         * Platform: Web
         */
        initializeFirebase(options) {
            return new Promise(async (resolve, reject) => {
                await this.ready;
                if (!options) {
                    reject(this.options_missing_mssg);
                    return;
                }
                let app;
                if (options.app) {
                    app = options.app;
                }
                if (options.firebase) {
                    const { firebase, firebaseAppName } = options, rest = __rest(options, ["firebase", "firebaseAppName"]);
                    app = firebase.initializeApp(rest, firebaseAppName || undefined);
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
        setUserId(options) {
            return new Promise(async (resolve, reject) => {
                await this.ready;
                if (!this.analyticsRef) {
                    reject(this.analytics_missing_mssg);
                    return;
                }
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
        setUserProperty(options) {
            return new Promise(async (resolve, reject) => {
                await this.ready;
                if (!this.analyticsRef) {
                    reject(this.analytics_missing_mssg);
                    return;
                }
                const { name, value } = options || { name: undefined, value: undefined };
                if (!name) {
                    reject("name property is missing");
                    return;
                }
                if (!value) {
                    reject("value property is missing");
                    return;
                }
                let property = {};
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
        getAppInstanceId() {
            return new Promise((resolve, _reject) => resolve);
        }
        /**
         * Sets the current screen name, which specifies the current visual context in your app.
         * @param options - screenName: the activity to which the screen name and class name apply.
         *                  nameOverride: the name of the current screen. Set to null to clear the current screen name.
         * Platform: Android/iOS
         */
        setScreenName(_options) {
            return new Promise((resolve, _reject) => resolve);
        }
        /**
         * Clears all analytics data for this app from the device and resets the app instance id.
         * Platform: Android/iOS
         */
        reset() {
            return new Promise((resolve, _reject) => resolve);
        }
        /**
         * Logs an app event.
         * @param options - name: unique name of the event
         *                  params: the map of event parameters.
         * Platform: Web/Android/iOS
         */
        logEvent(options) {
            return new Promise(async (resolve, reject) => {
                await this.ready;
                if (!this.analyticsRef) {
                    reject(this.analytics_missing_mssg);
                    return;
                }
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
        setCollectionEnabled(options) {
            return new Promise(async (resolve, reject) => {
                await this.ready;
                if (!this.analyticsRef) {
                    reject(this.analytics_missing_mssg);
                    return;
                }
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
        setSessionTimeoutDuration(_options) {
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
        enable() {
            return new Promise(async (resolve, reject) => {
                await this.ready;
                if (!this.analyticsRef) {
                    reject(this.analytics_missing_mssg);
                    return;
                }
                this.analyticsRef.setAnalyticsCollectionEnabled(true);
                resolve();
            });
        }
        disable() {
            return new Promise(async (resolve, reject) => {
                await this.ready;
                if (!this.analyticsRef) {
                    reject(this.analytics_missing_mssg);
                    return;
                }
                this.analyticsRef.setAnalyticsCollectionEnabled(false);
                resolve();
            });
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        FirebaseAnalyticsWeb: FirebaseAnalyticsWeb
    });

    exports.FirebaseAnalytics = FirebaseAnalytics;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
