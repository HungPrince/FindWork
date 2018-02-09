import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ManagePostsPage } from './managePosts';

@NgModule({
  declarations: [
    ManagePostsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagePostsPage),
    TranslateModule.forChild()
  ],
  exports: [
    ManagePostsPage
  ]
})
export class ManagePostsPageModule { }
