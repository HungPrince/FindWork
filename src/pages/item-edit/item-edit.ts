import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { JobInformationProvider } from '../../providers/job-information/job-information';

/**
 * Generated class for the ItemEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-edit',
  templateUrl: 'item-edit.html',
})
export class ItemEditPage {
  jobId: any;
  jobDetail = {  };
  today = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public jobInf: JobInformationProvider) {
    
  }

  ionViewDidLoad() {
    this.jobId = this.navParams.get('jobId');
    this.jobInf.getJobDetail(this.jobId).subscribe(obj => {
      this.jobDetail = obj;
      console.log(this.jobDetail)
    })
  }

  editItem(){
    let data = this.jobDetail;
    this.jobInf.editItem(this.jobId, data).then(res =>{
      console.log(res)
      this.viewCtrl.dismiss();
    })
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
