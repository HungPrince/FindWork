import { CameraOptions, Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ActionSheetController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})

export class SignupPage {

    account: { name: string, email: string, password: string, passwordConfirm: string, age: string, avatar: string, sex: string, sexStatus: boolean, phone: string, address: string, school: string, description: string } = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        age: '',
        sex: "Male",
        avatar: '',
        sexStatus: true,
        phone: '',
        address: '',
        school: '',
        description: ''
    };

    private signupErrorString: string;

    storage = firebase.storage().ref();

    constructor(public navCtrl: NavController,
        public user: User,
        public toastCtrl: ToastController,
        public translateService: TranslateService,
        public afDb: AngularFireDatabase,
        public actionSheetController: ActionSheetController,
        public camera: Camera) {

        this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
            this.signupErrorString = value;
        })
    }

    doSignup() {
        if (this.account.password != this.account.passwordConfirm) {
            let toast = this.toastCtrl.create({
                message: "Password and Password confirm must be match!",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        }
        let updateProfile = {
            email: this.account.email,
            name: this.account.name,
            gender: this.account.sexStatus,
            age: this.account.age,
            avatar: this.account.avatar,
            phone: this.account.phone,
            address: this.account.address,
            school: this.account.school,
            description: this.account.description,
            create_at: new Date()
        }
        this.user.signup(this.account.email, this.account.password).then(res => {
            this.afDb.list(`/userProfile`).update(res.uid, updateProfile);
            this.navCtrl.setRoot(MainPage);
        }, (err) => {

            let toast = this.toastCtrl.create({
                message: this.signupErrorString,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    }

    changeSex(sex) {
        this.account.sex = sex ? "Male" : "Female"
    }

    chooseAvatar() {
        let actionSheet = this.actionSheetController.create({
            title: 'Choose avatar',
            buttons: [
                {
                    text: 'Get picture from gallery',
                    role: 'destructive',
                    handler: () => {
                        this.takePicture(0);
                    }
                },
                {
                    text: 'Capture picture',
                    handler: () => {
                        this.takePicture(1);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }

    takePicture(sourceType) {
        let options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            destinationType: this.camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true,
            correctOrientation: true
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            const filename = Math.floor(Date.now() / 1000);
            const imageRef = this.storage.child(`images/${filename}.jpg`);
            imageRef.putString(base64Image, firebase.storage.StringFormat.DATA_URL).then((imageSnapshot) => {
                // Do something here when the data is succesfully uploaded!
                this.account.avatar = imageSnapshot.downloadURL;
            });
        }, (err) => {
            // Handle error
        });
    }
}
