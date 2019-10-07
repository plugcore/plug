/**
 * https://momentjs.com/
**/

import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class DateInternalService {

	public baseFormat = 'DD/MM/YYYY HH:mm';
	public hourMinFormat = 'HH:mm';
	public dFormat = 'DD/MM/YYYY';
	public GMT = '+00:00'; // GMT+0
	private readonly dayMils: number = 24 * 60 * 60 * 1000;

	constructor() { }

	public newDateNow() {
		return this.getMoment().toDate();
	}

	public newDate(date: any) {
		return this.getMoment(date).toDate();
	}

	public getDateCalendar(date: any) { // number to date
		return moment(date).toDate();
	}

	public getTimeCalendar(date: any): string { // number to date
		return this.getMoment(date).format(this.hourMinFormat);
	}

	public getFormatDateTime(date: any): string { // tz to date
		return this.getMoment(date).format(this.baseFormat);
	}

	public parseDate(date: any, time: any): any {
		return this.getMoment(date + ' ' + time).toDate().getTime();
	}

	public numberToHhmm(date: any) {
		return this.getMoment(date).format(this.hourMinFormat);
	}

	public getTime(date: any, hhmm: any) {
		let dateObj = moment(date).toDate();
		dateObj.setHours(hhmm.split(':')[0], hhmm.split(':')[1]);
		dateObj = this.getMoment(dateObj).toDate();
		return dateObj.getTime();
	}

	public dateToNumber(date: any) {
		return this.getMoment(date).toDate().getTime();
	}

	public hhmmToNumber(hhmm: any) {
		return this.getMoment(0).toDate().setHours(hhmm.split(':')[0], hhmm.split(':')[1]);
	}

	public hhmmToMinutesMils(hhmm: string) {
		const strArr = hhmm.split(':');
		const hours = (parseInt(strArr[0], 10) || 0) * 60 * 60 * 1000;
		const minutes = (parseInt(strArr[1], 10) || 0) * 60 * 1000;
		return hours + minutes;
	}

	public minutesMilsToHhmm(minutesMil: number) {
		const hours = Math.floor(minutesMil /  (60 * 60 * 1000));
		const minutes = (minutesMil - (hours * 60 * 60 * 1000)) / (60 * 1000);
		return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;
	}

	public minuteToNumber(minutes: number) {
		return moment.duration(minutes, 'minutes').asMilliseconds();
	}

	public numberToMinute(miliseconds: any) {
		return moment.duration(miliseconds).asMinutes();
	}

	public numberToDate(date: any) {
		return this.getMoment(date);
	}

	public numberToDateFormat(date: any) {
		return this.getMoment(date).format(this.dFormat);
	}

	public newDateToUTC(date: any) {
		return this.getMoment(date).toDate().toUTCString();
	}

	private getMoment(date?: any) {
		if (date) {
			return moment(date).utcOffset(this.GMT);
		} else {
			return moment().utcOffset(this.GMT);
		}
	}

	public genHourTxt(hour: number) {
		if (hour > 9) {
			return `${hour}:00`;
		} else {
			return `0${hour}:00`;
		}
	}

	public get0Hour(date: Date) {
		return new Date(Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			0, 0, 0, 0
		));
	}

	public get24Hour(date: Date) {
		return new Date(Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			23, 59, 56, 999
		));
	}

	public getDiffFrom0Hour(time: number) {
		const date = new Date(time);
		const date0Hour = this.get0Hour(date);
		return date.getTime() - date0Hour.getTime();
	}

	public getDiffFrom24Hour(time: number) {
		const date = new Date(time);
		const date24Hour = this.get24Hour(date);
		return this.dayMils - (date24Hour.getTime() - date.getTime());
	}

	public milToHours(mil: number) {
		return Math.floor(mil / 1000 / 60 / 60);
	}

	public hoursToMils(hours: number) {
		return Math.floor(hours * 60 * 60 * 1000);
	}

	public formatDay(date: Date, locale?: string) {
		return date.toLocaleDateString(locale || 'en-UK', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	public formatDayAndTime(date: Date, locale?: string) {
		return date.toLocaleDateString(locale || 'en-UK', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
			hour12: false,
			hour: 'numeric',
			minute: 'numeric'
		});
	}

	public formatDayMin(date: Date, locale?: string) {
		return date.toLocaleDateString(locale || 'en-UK', {
			day: 'numeric',
			month: 'numeric',
			year: '2-digit'
		});
	}

	public isValid(date: any) {
		return moment(date).isValid();
	}

	public isToday(date: any) {
		return moment(date, 'DD/MM/YYYY').isSame(this.getMoment(), 'day');
	}

	public getWeekDay(date: any) {
		return moment(date).weekday();
	}
}
