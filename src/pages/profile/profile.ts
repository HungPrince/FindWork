import { JobInformationProvider } from './../../providers/job-information/job-information';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	account: {name: string, age: string, avatar: string, sex: string, sexStatus: boolean
						phone: string, school: string, address: string, description: string } = {
	    name: '',
	    age: '',
	    avatar: '',
	    sex: "Male",
			sexStatus: true,
			phone: '',
			school: '',
			address: '',
			description: ''
	};
	avatar: any;
	storage = firebase.storage().ref();

	  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService,
					public actionSheetController: ActionSheetController, public camera: Camera, public jobInf: JobInformationProvider, 
					public viewCtrl: ViewController) {

  	}

 	ionViewDidLoad() {
		this.jobInf.getUserInfor().subscribe((userInfor:any) => {
			this.account.name = userInfor.name;
			this.account.age = userInfor.age;
			this.account.avatar = userInfor.avatar;
			this.account.sex = userInfor.gender ? "Male" : "Famale";
			this.account.sexStatus = userInfor.gender;
			this.account.phone = userInfor.phone;
			this.account.school = userInfor.school;
			this.account.address = userInfor.address;
			this.account.description = userInfor.description;
    })
  	}

  	changeSex (sex) {
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
				this.takePicture(0)
			  }
			},
			{
			  text: 'Capture picture',
			  handler: () => {
				this.takePicture(1)
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
			this.avatar = imageSnapshot.downloadURL;
		  });
		}, (err) => {
		  // Handle error
		});
		}
		
		updateProfile(){
    this.jobInf.updateProfile(this.account).then(res =>{
      console.log(res)
      this.viewCtrl.dismiss();
    })
		}
}
