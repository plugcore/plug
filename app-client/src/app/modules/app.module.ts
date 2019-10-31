import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../components/app.component';
import { PlugOverlayModule } from '../components/overlay/modules/overlay.module';
import { PlugToastModule } from '../components/toast/modules/toast.module';
import { AppRoutesModule } from './app.routes.module';
import { PlugLayoutModule } from '../components/layout/modules/layout.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutesModule,
		PlugLayoutModule,
		PlugToastModule,
		PlugOverlayModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(@Optional() @SkipSelf() parentModule: AppModule) {
		if (parentModule) {
			throw new Error(
				'AppCoreModule is already loaded. Import it in the AppRoutesModule only');
		}
	}
}
