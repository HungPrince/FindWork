import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { User } from './../user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class JobInformationProvider {
    rootPage: any;
    userId: any;
    listJob: any;

    constructor(public afDB: AngularFireDatabase, public userProvider: User) {
        console.log('Hello JobInformationProvider Provider');
        this.userProvider.authState.subscribe(res => {
            if (res) {
                this.userId = res.uid;
            } else {
                this.rootPage = 'LoginPage';
            }
        })

    }

    getUser(): Observable<any> {
        return this.afDB.list(`userProfile`, ref => ref.orderByKey().equalTo(this.userId)).snapshotChanges().map(actions => {
            return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        });
    }

    getListUser() {
        return this.afDB.list(`userProfile`).snapshotChanges().map(actions => {
            return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        });
    }

    getUserInfor() {
        return this.afDB.object(`userProfile/${this.userId}`).valueChanges();
    }

    updateProfile(userInfor) {
        return this.afDB.object(`userProfile/` + this.userId).update(userInfor);
    }

    getJobs() {
        return this.afDB.list(`jobInformation`).snapshotChanges().map(actions => {
            return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        });
    }

    getJobDetail(jobId) {
        return this.afDB.object(`jobInformation/${jobId}`).valueChanges();
    }

    getManageJobs() {
        return this.afDB.list(`jobInformation`, ref => ref.orderByChild('userId').equalTo(this.userId)).snapshotChanges().map(actions => {
            return actions.map(action => ({ key: action.key, ...action.payload.val() }))
        })
    }

    getListFav() {
        return this.afDB.object(`userProfile/${this.userId}/listFav`).valueChanges();
    }

    getListUserSelected(jobId) {
        return this.afDB.object(`jobInformation/${jobId}/listSelected`).valueChanges();
    }

    selectJob(id, countSelected) {
        this.afDB.object('/jobInformation/' + id).update({ count: countSelected + 1 });
        this.afDB.list('/jobInformation/' + id + '/listSelected/').update(this.userId, { userId: this.userId });
        this.afDB.list('/userProfile/' + this.userId + '/listFav/').update(id, { userId: id });
    }

    unSelectJob(id, countSelected) {
        this.afDB.object('/jobInformation/' + id).update({ count: countSelected - 1 });
        this.afDB.list('/jobInformation/' + id + '/listSelected/').remove(this.userId);
        this.afDB.list('/userProfile/' + this.userId + '/listFav/').remove(id);
    }

    editItem(id, jobInf) {
        return this.afDB.object(`jobInformation/` + id).update(jobInf);
    }

    createItem(jobInf) {
        jobInf.userId = this.userId;
        return this.afDB.list(`jobInformation`).push(jobInf);
    }

    deleteItem(jobId) {
        this.afDB.list('/jobInformation/').remove(jobId);
    }
}
