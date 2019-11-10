import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { ChartType } from '../models/api.model';
import { ApiStatusService } from '../services/status.service';
import { ApiStatusFilterComponent } from './filter/filter.component';
import { TablesApiTokenService } from '../../api-token/services/api-token.service';

@Component({
	selector: 'plug-api-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class ApiStatusComponent implements OnInit {

	public chartType: ChartType = {
		name: 'Api Calls'
	};

	private isRespTime = false;
	private apiStats: {
		date: number;
		responseTime: {
			api: string;
			byToken: {
				token: string;
				value: number;
			}[];
		}[];
		apiCalls: {
			api: string;
			byToken: {
				token: string;
				value: number;
			}[];
		}[];
	}[] = [];
	private apis = [
		{ apiName: 'Find tours in city', apiMethod: 'GET /tours/find-future-tours-in-city/{cityId}' },
		{ apiName: 'Find realted products for tour', apiMethod: 'GET /tours/find-related-products-for-tour/{tourId}' },
		{ apiName: 'Create reservation', apiMethod: 'POST /reservations/' },
		{ apiName: 'Find user reservations', apiMethod: 'GET /reservations/find-user-reservations/{userId}' },
		{ apiName: 'Cancel reservation', apiMethod: 'DELETE /reservations/cancel-reservation/{reservationId}' }
	];
	private fitlersConfiguration: {
		optionSelected: string;
		apisSelected: string[];
		tokensSelected: string[];
		startDate: Date;
		endDate: Date;
		apis: any[];
	};


	chartTypes: ChartType[] = [
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
				duration: 300,
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
				duration: 300,
				easing: 'linear',
				startup: true
			}
		},
		height: 600
	};

	chartSelected = this.callsChart;

	constructor(
		private tablesApiTokenService: TablesApiTokenService,
		private plugDialogService: PlugDialogService
	) {
		this.fitlersConfiguration = {
			optionSelected: '1',
			apisSelected: this.apis.map(a => a.apiName),
			tokensSelected: this.tablesApiTokenService.data.map(t => t.name),
			startDate: moment().subtract(7, 'days').toDate(),
			endDate: moment().toDate(),
			apis: this.apis
		};
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.appyFilters();
	}

	public ngOnInit() {
		this.loadApis();
		this.appyFilters();
	}

	public openFilter() {
		this.plugDialogService.openModal<{
			optionSelected: string;
			apisSelected: string[];
			tokensSelected: string[];
			startDate: Date;
			endDate: Date;
		}>(ApiStatusFilterComponent, 'API Status Filter', this.fitlersConfiguration).subscribe(res => {
			if (res) {
				this.fitlersConfiguration = {
					optionSelected: res.optionSelected,
					apisSelected: res.apisSelected,
					tokensSelected: res.tokensSelected,
					startDate: res.startDate,
					endDate: res.endDate,
					apis: this.apis
				};
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
			lastApiCall[api.apiName] = this.randomInt(3, 1850);
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
				lastApiCall[api.apiName] = lastApiCall[api.apiName] + (this.randomInt(0, 100) * (addOrSubstract1 === 0 ? 1 : -1));
				lastRespTime[api.apiName] = lastRespTime[api.apiName] + (this.randomInt(0, 50) * (addOrSubstract2 === 0 ? 1 : -1));
				if (lastApiCall[api.apiName] <= 0) {
					lastApiCall[api.apiName] = this.randomInt(3, 1850);
				}
				if (lastRespTime[api.apiName] <= 0) {
					lastRespTime[api.apiName] = this.randomInt(100, 2500);
				}

				apiDay.apiCalls.push({
					api: api.apiName, byToken: this.tablesApiTokenService.data.map(t => ({
						token: t.name,
						value: Math.ceil(lastApiCall[api.apiName] * (Math.random() + 0.5))
					}))
				});
				apiDay.responseTime.push({
					api: api.apiName, byToken: this.tablesApiTokenService.data.map(t => ({
						token: t.name,
						value: Math.ceil(lastRespTime[api.apiName] * (Math.random() + 0.5))
					}))
				});

			}
			this.apiStats.push(apiDay);
		}

	}

	private dataToChartData(apis: string[], tokens: string[], dateFrom: number, dateTo: number) {
		const response: any[][] = [];
		const resultDays = this.apiStats.filter(d => d.date >= dateFrom && d.date <= dateTo);
		for (const apiDay of resultDays) {
			const respDay: any[] = [moment(apiDay.date).format('DD-MM-YYYY')];
			for (const api of apis) {
				const apiVal = (this.isRespTime ? apiDay.responseTime : apiDay.apiCalls)
					.find(a => a.api === api);
				const tokenVals = apiVal ? apiVal.byToken.filter(t => tokens.includes(t.token)) : [];
				respDay.push(tokenVals.reduce((prev, curr) => prev + curr.value, 0));
			}
			response.push(respDay);
		}
		return response.reverse();
	}

	private appyFilters() {

		const chart = this.isRespTime ? this.responseTimeChart : this.callsChart;
		const startAndEnd = this.getStartAndEnd();
		const newData = this.dataToChartData(
			this.fitlersConfiguration.apisSelected, this.fitlersConfiguration.tokensSelected,
			startAndEnd.start, startAndEnd.end
		);
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
			case '2': return {
				start: moment().subtract(14, 'days').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			case '3': return {
				start: moment().subtract(28, 'days').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			case '4': return {
				start: moment().subtract(1, 'months').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			case '5': return {
				start: moment().subtract(3, 'months').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			case '6': return {
				start: moment().subtract(6, 'months').endOf('day').valueOf(),
				end: moment().endOf('day').valueOf()
			};
			default: return {
				start: this.fitlersConfiguration.startDate.valueOf(),
				end: this.fitlersConfiguration.endDate.valueOf()
			};
		}
	}

	private randomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}
