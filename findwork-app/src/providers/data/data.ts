import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  getDistrictByProvince (provinceid) {
  	return this.http.get('assets/json/district.json')
    .map((res) => res.json())
    .map((data) => data.filter(item => item.provinceid == provinceid));
  }

  getProvince () {
  	return this.http.get('assets/json/province.json')
    .map((res) => res.json());
  }
}
