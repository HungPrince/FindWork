import { JobInformationProvider } from './../../providers/job-information/job-information';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  jobId: any;
  jobDetail: any;

  constructor(public navCtrl: NavController, navParams: NavParams, public jobInf: JobInformationProvider) {
    this.jobId = navParams.get('jobId');
    this.jobInf.getJobDetail(this.jobId).subscribe(jobDetail => {
      console.log(jobDetail);
      this.jobDetail = jobDetail;
    })

  }

}
