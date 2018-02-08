import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
@Injectable()
export class GeocoderProvider {

  constructor(public http: Http, private geocode: NativeGeocoder) {
    console.log('Hello GeocoderProvider Provider');
  }

  reverseGeocode(lat : number, lng: number) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.geocode.reverseGeocode(lat, lng)
      .then((result: NativeGeocoderReverseResult) => {
        let str: string = `The reverseGeocode address is in ${result.countryCode}`;
        resolve(str);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
    });
  }

  forwardGeocode(keyword: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.geocode.forwardGeocode(keyword)
      .then((coordinates: NativeGeocoderForwardResult) => {
        let str : string = `The coordinates are latitude=${coordinates.latitude} and longitude=${coordinates.longitude}`;
        resolve(str);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      })
    })
  }

}

