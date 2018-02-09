import { User } from './../providers/user/user';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { Settings } from '../providers/providers';
import { JobInformationProvider } from '../providers/job-information/job-information';

@Component({
    templateUrl: `app.html`
})
export class MyApp {
    rootPage: any;
    userLocal: any = {};

    @ViewChild(Nav) nav: Nav;

    pages: any[] = [
        { title: 'Orders', component: 'OrdersPage', img: 'orders.png' },
        { title: 'Manage Posts', component: 'ManagePostsPage', img: 'post.png' },
        { title: 'List Jobs', component: 'ListMasterPage', img: 'job.png' },
        { title: 'Settings', component: 'SettingsPage', img: 'settings.png' },
        { title: 'Search', component: 'SearchPage', img: 'search.png' }
    ];

    constructor(private translate: TranslateService, platform: Platform,
        settings: Settings, private config: Config,
        private statusBar: StatusBar, private splashScreen: SplashScreen,
        public user: User, public jobInf: JobInformationProvider) {
        platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            user.authState.subscribe(user => {
                if (user) {
                    this.rootPage = 'ListMasterPage';
                } else {
                    this.rootPage = 'LoginPage';
                }
            });
        });
        this.initTranslate();
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');

        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('en'); // Set your language here
        }

        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    }

    logout() {
        this.user.logout().then(() => {
            this.nav.setRoot("LoginPage");
        })
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

    goProfile() {
        this.nav.push('ProfilePage');
    }
}
