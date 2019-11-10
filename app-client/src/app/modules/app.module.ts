import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../components/app.component';
import { PlugLayoutModule } from '../components/layout/modules/layout.module';
import { PlugOverlayModule } from '../components/overlay/modules/overlay.module';
import { PlugToastModule } from '../components/toast/modules/toast.module';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { AppRoutesModule } from './app.routes.module';


@NgModule({
	imports: [
		BrowserModule,
		AppRoutesModule,
		PlugLayoutModule,
		PlugToastModule,
		PlugOverlayModule,
		HttpClientModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
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
