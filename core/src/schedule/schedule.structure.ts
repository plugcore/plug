/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export interface ExecutedJob {
	initialDate: number;
	endDate: number;
	outputLog: any;
	status: CronStatus;
	idJob: string;
	data: any;
	executionCron: string;
}

export interface RegisteredJob {
	idJob: string;
	defaultCron: string;
	lastTimeExecuted: number;
	nextTimeExecuted: number;
	defaultData?: any;
	repetible?: boolean;
}

export enum CronStatus {
	OK,
	WAITING,
	ERROR
}
