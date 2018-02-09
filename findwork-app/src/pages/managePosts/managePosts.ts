import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { JobInformationProvider } from '../../providers/job-information/job-information';

@IonicPage()
@Component({
    selector: 'page-manage-posts',
    templateUrl: 'managePosts.html'
})
export class ManagePostsPage {
    manageJobs: any;
    userLocal: any = {};
    constructor(public navCtrl: NavController, public jobInf: JobInformationProvider, public modalCtrl: ModalController) {
        // this.jobInf.getUser().subscribe((res) => {
        //     this.userLocal = res[0];
        //     console.log(this.userLocal);
        // })
    }

    ionViewDidLoad() {
        this.getManageJobs();
    }


    getManageJobs() {
        this.jobInf.getManageJobs().subscribe(list => {
            this.manageJobs = list.reverse();
        })
    }

    addItem() {
        let addModal = this.modalCtrl.create('ItemCreatePage');
        addModal.present();
    }

    editItem(jobId) {
        let editModal = this.modalCtrl.create("ItemEditPage", { jobId: jobId });
        editModal.present();
    }

    deleteItem(jobId) {
        this.jobInf.deleteItem(jobId);
    }

    openItem(jobId) {
        this.navCtrl.push('ItemDetailPage', {
            jobId: jobId
        });
    }

    goListUser(jobId) {
        this.navCtrl.push('UsersPage', {
            jobId: jobId
        });
    }
}
