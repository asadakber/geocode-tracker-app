import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public form: FormGroup;
  public geoForm: FormGroup;
  public geocoded: boolean;
  public results: string;
  public filter: string = 'Search by Coordinates';
  public displayForward: boolean = true;
  public displayReverse: boolean = false;
  constructor(public platform: Platform,public fb: FormBuilder,public geocodeprovider: GeocoderProvider,public navCtrl: NavController) {
    this.form = fb.group({
      'keyword' : ['', Validators.required]
    })

    this.geoForm = fb.group({
      'latitude' : ['', Validators.required],
      'longitude' : ['', Validators.required]
    })
  }

  filterForm() {
    if(this.displayForward) {
      this.filter = 'Search by keyword';
      this.displayReverse = true;
      this.displayForward = false;
    }
    else {
      this.filter = 'Search by Co-ordinates';
      this.displayReverse = false;
      this.displayForward = true;
    }
  }

  performReverseGeocoding(val) {
    this.platform.ready()
    .then((data: any) => {
      let latitude: any = parseFloat(this.geoForm.controls["latitude"].value),
          longitude: any = parseFloat(this.geoForm.controls["longitude"].value)
      this.geocodeprovider.reverseGeocode(latitude, longitude)
      .then((data: any) => {
        this.geocoded = true;
        this.results = data;
      })
      .catch((error: any) => {
        this.geocoded = true;
        this.results = error.message;
      })
    })
  }

  performFormwardGeocoding(val) {
    this.platform.ready()
    .then((data: any) => {
      let keyword : string = this.form.controls["keyword"].value;
      this.geocodeprovider.forwardGeocode(keyword)
      .then((data: any) => {
        this.geocoded = true;
        this.results = data;
      })
      .catch((error: any) => {
        this.geocoded = true;
        this.results = error.message;
      })
    })
  }

}
