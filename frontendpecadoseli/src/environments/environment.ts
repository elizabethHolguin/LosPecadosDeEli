// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpointDjango: "http://localhost:5000/api/v1/",
  endpointExpress: "http://localhost:5001/api/v1/",
  firebaseConfig: {
    apiKey: "AIzaSyCGXMVqBM2xCAkUmoJIvHvQ43oggfbw5QQ",
    authDomain: "pecadoseli.firebaseapp.com",
    databaseURL: "https://pecadoseli.firebaseio.com",
    projectId: "pecadoseli",
    storageBucket: "pecadoseli.appspot.com",
    messagingSenderId: "125312020137",
    appId: "1:125312020137:web:e067d702aef432122103b8",
    measurementId: "G-0NKGGNE9D0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
