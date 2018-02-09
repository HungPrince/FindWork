import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobInformationProvider } from '../../providers/job-information/job-information';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  jobId: any;
  users: any;
  listUserSelected: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public jobInf: JobInformationProvider) {
    this.jobId = navParams.get('jobId');
  }

  ionViewDidLoad() {
    this.getListUser();
  }

  getListUser() {
    this.jobInf.getListUser().subscribe(users => {
      this.users = users;
      this.getListUserSelected();
    })
  }

  getListUserSelected() {
    this.listUserSelected = [];
    this.jobInf.getListUserSelected(this.jobId).subscribe(listUser => {
      for (let key in listUser) {
        var findUser = this.users.findIndex(x => x.key == key);
        this.listUserSelected.push(this.users[findUser])
      }
      console.log(this.listUserSelected)
    })
  }
}
