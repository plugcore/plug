import { Component, OnInit } from '@angular/core';
import { PlugsService } from '../../../services/plugs.service';
import { Plug } from '../../../models/plugs.model';

@Component({
	selector: 'plug-plugs-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class PlugsStatusComponent implements OnInit {

	public tourUrl = 'https://png.pngtree.com/svg/20150528/tour_guide_962360.png';
	public hotelUrl = 'https://library.kissclipart.com/20180902/yje/kissclipart-hotel-icon-png-clipart-hotel-clip-art-d8bc8f1e610824d6.png';
	public rentacarUrl = 'https://static.thenounproject.com/png/386502-200.png';
	public flightUtl = 'https://static.thenounproject.com/png/465400-200.png';

	public plugs: Plug[] = [];

	constructor(
		private plugsService: PlugsService
	) {
		this.plugsService.search().subscribe(res => {
			this.plugs = res.data;
		});
	}

	ngOnInit() {
	}

}
