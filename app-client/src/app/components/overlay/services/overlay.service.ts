import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { PlugOverlayComponent } from '../components/overlay.component';

@Injectable({
	providedIn: 'root'
})
export class PlugOverlayService {

	private overlayRef: OverlayRef;
	private currExec: string[] = [];

	constructor(private overlay: Overlay) { }

	start(id: string) {
		this.currExec.push(id);
		setTimeout(() => {
			if (!this.overlayRef && (this.currExec.find(currId => currId === id)) !== undefined) {
				const config = new OverlayConfig();
				config.positionStrategy = this.overlay.position().global();
				config.hasBackdrop = true;
				this.overlayRef = this.overlay.create(config);
				this.overlayRef.attach(new ComponentPortal(PlugOverlayComponent));
			}
		}, 100);
	}

	stop(id: string) {
		const ceI = this.currExec.indexOf(id);
		if (ceI > -1) {
			this.currExec.splice(ceI, 1);
		}
		if (this.currExec.length === 0 && this.overlayRef) {
			this.overlayRef.dispose();
			this.overlayRef = null;
		}
	}

}
