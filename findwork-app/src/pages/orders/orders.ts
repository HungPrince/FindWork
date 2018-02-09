import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobInformationProvider } from '../../providers/job-information/job-information';
import { User } from '../../providers/providers';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders: any;
  listJobs: any;
  listFav: any;
  listUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public jobInf: JobInformationProvider) {
  
  }

  ionViewDidLoad() {
    this.getJobs();
    this.getListUser();
  }

  getListUser() {
    this.jobInf.getListUser().subscribe(listUser => {
      this.listUser = listUser;
    });
  }
  getListFav() {
    this.listFav = [];
    this.jobInf.getListFav().subscribe(listFav => {
      for (let key in listFav) {
        let findJob = this.listJobs.findIndex(x=>x.key == key);
        let checkJob = this.listFav.findIndex(x=>x.key == key)
        if(findJob >= 0 && checkJob < 0){
          let findUser = this.listUser.findIndex(x => x.key == this.listJobs[findJob].userId);
          this.listJobs[findJob].postBy = this.listUser[findUser].name;
          this.listJobs[findJob].avatar = this.listUser[findUser].avatar;
          this.listFav.push(this.listJobs[findJob]);
        }
      }
    });
  }

  getJobs() {
    this.jobInf.getJobs().subscribe(jobs => {
      this.listJobs = jobs;
      this.getListFav();
    })
  }

  unSelectJob(keyId, count){
    this.jobInf.unSelectJob(keyId, count)
  }

  openItem(jobId) {
    this.navCtrl.push('ItemDetailPage', {
      jobId: jobId
    });
  }

}
