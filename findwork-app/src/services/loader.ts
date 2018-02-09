import {LoadingController} from 'ionic-angular';

export class LoaderService{
    constructor(public loadingCtr : LoadingController){
        
    }

   public loader(content, time){
        let loader = this.loadingCtr.create({
            content:content,
            duration:time
        });
        loader.present();
    }
}