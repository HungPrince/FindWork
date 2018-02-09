import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class User {
    user: firebase.User;
    authState: Observable<firebase.User>;

    constructor(public api: Api, public afAuth: AngularFireAuth,
        public afd: AngularFireDatabase) {
        this.authState = afAuth.authState;

        this.authState.subscribe(user => {
            this.user = user;
        });
    }
    login(accountInfo: any) {
        return this.afAuth.auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);

    }

    signup(email: any, password: any) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    logout() {
        return this.afAuth.auth.signOut();
    }
}
