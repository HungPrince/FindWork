import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { DataProvider } from '../../providers/data/data';
import { JobInformationProvider } from '../../providers/job-information/job-information';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
  province: String;
  district: String;
  provinces: Array<Object> = [];
  districts: Array<Object> = [];
  listJob: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items,
    public dataProvider: DataProvider, public jobInf: JobInformationProvider,
    public modalCtrl: ModalController) {
    dataProvider.getProvince().subscribe(data => {
      this.provinces = data;
      this.province = "01";
      this.loadDistrict(this.province);
    })
  }


  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    this.currentItems = [];
    let val = ev.target.value;
    this.jobInf.getJobs().subscribe(list => {
      for (let i = 0; i < list.length; i++) {
        let checkJob = this.currentItems.findIndex(x => x.key == list[i].key)
        if (checkJob < 0) {
          if (list[i].title.toLowerCase().indexOf(val.toLowerCase()) !== -1 || list[i].description.toLowerCase().indexOf(val.toLowerCase()) !== -1 || list[i].workplace.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
            this.currentItems.push(list[i]);
          }
        }
      }
    })
    // if (!val || !val.trim()) {
    //   this.currentItems = [];
    //   return;
    // }
    // this.currentItems = this.items.query({
    //   name: val
    // });
  }

  /**
   * Navigate to the detail page for this item.
   */

  selectProvince(province: String) {
    this.loadDistrict(province);
  }

  loadDistrict(provinceId: String) {
    this.dataProvider.getDistrictByProvince(provinceId).subscribe(data => {
      this.districts = data;
      this.district = data[0]['districtid'];
    })
  }

  selectJobSearch(keyId, count) {
    this.jobInf.selectJob(keyId, count)
  }

  unSelectJob(keyId, count) {
    this.jobInf.unSelectJob(keyId, count)
  }
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    // addModal.onDidDismiss(item => {
    //   if (item) {
    //     this.items.add(item);
    //   }
    // })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(jobId) {
    this.navCtrl.push('ItemDetailPage', {
      jobId: jobId
    });
  }
}
