import { Component, OnInit, HostListener } from '@angular/core';
import * as moment from 'moment';
import { PlugDialogService } from '../../../../../../components/dialog/services/dialog.service';
import { PlugsStatusFilterComponent } from './filter/filter.component';
import { ActivatedRoute } from '@angular/router';
import { map, takeWhile, tap, switchMap } from 'rxjs/operators';

@Component({
	selector: 'plug-plugs-status-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class PlugsStatusInfoComponent implements OnInit {

	public chartType: any = {
		name: 'Api Calls'
	};

	private isRespTime = false;
	private apiStats: {
		date: number;
		responseTime: { api: string, value: number }[];
		apiCalls: { api: string, value: number }[];
	}[] = [];

	private plugApis: Record<string, any> = {
		'best-tours': [
			{ apiName: 'Find tours in city', apiMethod: 'GET /plug/best-tours/find-tours-in-city/{cityId}' },
			{ apiName: 'Purchase tour', apiMethod: 'POST /plug/best-tours/purchase-tour}' },
			{ apiName: 'Cancel tour', apiMethod: 'DELETE /plug/best-tours/cancel-tour' }
		],
		'holiday-hotels': [
			{ apiName: 'Find rooms in city', apiMethod: 'GET /plug/holiday-hotels/find-rooms-in-city' },
			{ apiName: 'Book room', apiMethod: 'POST /plug/holiday-hotels/book-room' },
			{ apiName: 'Cancel room', apiMethod: 'DELETE /plug/holiday-hotels/cancel-room' }
		],
		'my-rentacar': [
			{ apiName: 'Find vehicles in city', apiMethod: 'GET /plug/my-rentacar/find-vehicles-in-city' },
			{ apiName: 'Rent vehicle', apiMethod: 'POST /plug/my-rentacar/rent-vehicle' },
			{ apiName: 'Cancel rent', apiMethod: 'DELETE /plug/my-rentacar/cancel-rent' }
		],
		'world-airlines': [
			{ apiName: 'Find flights', apiMethod: 'GET /plug/world-airlines/find-flights' },
			{ apiName: 'Book flight', apiMethod: 'POST /plug/world-airlines/book-flight' },
			{ apiName: 'Cancel flight', apiMethod: 'DELETE /plug/world-airlines/cancel-flight' }
		]
	};

	private apis: any[];
	private fitlersConfiguration: {
		optionSelected: string;
		apisSelected: string[];
		startDate: Date;
		endDate: Date;
		apis: any[];
	};


	chartTypes: any[] = [
		{ name: 'Api Calls' },
		{ name: 'Response Time' }
	];

	callsChart = {
		title: 'API CALLS',
		type: 'LineChart',
		data: [],
		columnNames: [],
		options: {
			hAxis: { title: 'Time' },
			vAxis: { title: 'Calls' },
			animation: {
				duration: 500,
				easing: 'linear',
				startup: true
			}
		},
		height: 600
	};

	responseTimeChart = {
		title: 'API RESPONSE TIME',
		type: 'LineChart',
		data: [],
		columnNames: [],
		options: {
			hAxis: { title: 'Time' },
			vAxis: { title: 'Response Time (ms)' },
			animation: {
				duration: 500,
				easing: 'linear',
				startup: true
			}
		},
		height: 600
	};

	chartSelected = this.callsChart;

	constructor(
		private plugDialogService: PlugDialogService,
		private route: ActivatedRoute
	) {
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.appyFilters();
	}

	public ngOnInit() {
		this.route.params.pipe(
			map(params => params['id']),
			takeWhile(id => typeof id === 'string')
		).subscribe(selectedApi => {
			this.apis = this.plugApis[selectedApi];
			this.fitlersConfiguration = {
				optionSelected: '1',
				apisSelected: this.apis.map(a => a.apiName),
				startDate: moment().subtract(7, 'days').toDate(),
				endDate: moment().toDate(),
				apis: this.apis
			};
			this.loadApis();
			this.appyFilters();
		});
	}

	public openFilter() {
		console.log(this.fitlersConfiguration);
		this.plugDialogService.openModal<{
			optionSelected: string;
			apisSelected: string[];
			startDate: Date;
			endDate: Date;
		}>(PlugsStatusFilterComponent, 'Plug Status Filter', this.fitlersConfiguration).subscribe(res => {
			if (res) {
				this.fitlersConfiguration.optionSelected = res.optionSelected;
				this.fitlersConfiguration.apisSelected = res.apisSelected;
				this.fitlersConfiguration.startDate = res.startDate;
				this.fitlersConfiguration.endDate = res.endDate;
				this.appyFilters();
			}
		});
	}

	public chartTypeChanged(event: any) {
		if (event.value === 'Response Time') {
			this.isRespTime = true;
		} else {
			this.isRespTime = false;
		}
		this.appyFilters();
	}

	private loadApis() {

		const baseDay = moment().endOf('day');
		const nOfDays = 190;

		const lastApiCall: Record<string, number> = {};
		const lastRespTime: Record<string, number> = {};
		for (const api of this.apis) {
			lastApiCall[api.apiName] = this.randomInt(8000, 1600);
			lastRespTime[api.apiName] = this.randomInt(100, 2500);
		}

		for (let dayBack = 0; dayBack < nOfDays; dayBack++) {
			const date = baseDay.subtract(1, 'days');
			const apiDay = {
				date: date.valueOf(), responseTime: [], apiCalls: []
			};
			for (const api of this.apis) {
				const addOrSubstract1 = this.randomInt(0, 1);
				const addOrSubstract2 = this.randomInt(0, 1);
				lastApiCall[api.apiName] = lastApiCall[api.apiName] + (
					(addOrSubstract1 === 0 ? this.randomInt(0, 200) : this.randomInt(0, 200)) *
					(addOrSubstract1 === 0 ? 1 : -1)
				);
				lastRespTime[api.apiName] = lastRespTime[api.apiName] + (
					(addOrSubstract2 === 0 ? this.randomInt(0, 100) : this.randomInt(0, 100)) *
					(addOrSubstract2 === 0 ? 1 : -1)
				);
				if (lastApiCall[api.apiName] <= 0) {
					lastApiCall[api.apiName] = this.randomInt(3, 1850);
				}
				if (lastRespTime[api.apiName] <= 0) {
					lastRespTime[api.apiName] = this.randomInt(100, 2500);
				}
				apiDay.apiCalls.push({
					api: api.apiName, value: lastApiCall[api.apiName]
				});
				apiDay.responseTime.push({
					api: api.apiName, value: lastRespTime[api.apiName]
				});
			}
			this.apiStats.push(apiDay);
		}

	}

	private dataToChartData(apis: string[], dateFrom: number, dateTo: number) {
		const response: any[][] = [];
		const resultDays = this.apiStats.filter(d => d.date >= dateFrom && d.date <= dateTo);
		for (const apiDay of resultDays) {
			const respDay: any[] = [moment(apiDay.date).format('DD-MM-YYYY')];
			for (const api of apis) {
				const apiVal = (this.isRespTime ? apiDay.responseTime : apiDay.apiCalls)
					.find(a => a.api === api);
				respDay.push(apiVal ? apiVal.value : 0);
			}
			response.push(respDay);
		}
		return response.reverse();
	}

	private appyFilters() {

		const chart = this.isRespTime ? this.responseTimeChart : this.callsChart;
		const startAndEnd = this.getStartAndEnd();
		const newData = this.dataToChartData(this.fitlersConfiguration.apisSelected, startAndEnd.start, startAndEnd.end);
		chart.data = newData;
		chart.columnNames = ['APIS'].concat(
			this.apis
				.filter(a => this.fitlersConfiguration.apisSelected.includes(a.apiName))
				.map(a => `${a.apiName} [${a.apiMethod}]`)
		);
		this.chartSelected = chart;
	}

	private getStartAndEnd() {
		switch (this.fitlersConfiguration.optionSelected) {
			case '1': return {
				start: moment().subtract(7, 'days').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			case '2':  return {
				start: moment().subtract(14, 'days').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			case '3':  return {
				start: moment().subtract(28, 'days').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			case '4':  return {
				start: moment().subtract(1, 'months').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			case '5':  return {
				start: moment().subtract(3, 'months').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			case '6':  return {
				start: moment().subtract(6, 'months').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			default:  return {
				start: this.fitlersConfiguration.startDate.valueOf(),
				end: this.fitlersConfiguration.endDate.valueOf()
			};
		}
	}

	private randomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

}
