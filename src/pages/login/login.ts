import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, MenuController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../pages';

@IonicPage()

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    account: { email: string, password: string } = {
        email: '',
        password: ''
    };

    private loginErrorString: string;

    constructor(public navCtrl: NavController,
        public user: User,
        public toastCtrl: ToastController,
        public translateService: TranslateService, public menuCtrl: MenuController) {

        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
        })
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
        }

    signup() {
        this.navCtrl.push('SignupPage');
    }

    doLogin() {
        this.user.login(this.account).then((resp) => {
            this.navCtrl.push(MainPage);
        }, (err) => {
            let toast = this.toastCtrl.create({
                message: this.loginErrorString,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    }
}
