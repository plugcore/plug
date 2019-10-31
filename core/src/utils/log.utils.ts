/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export class LogUtils {

	/**
	 * Creates a "Self and total Time from start" indicating how
	 * long some timer has been clocking for this specific block
	 * of code and for the one enblogin this one
	 */
	public static selfAndTotalTimeFromStart(selfStart: number, totalStart: number) {
		const now = (new Date()).getTime();
		return `Self time from start: ${this.getMs(now, selfStart)},\t` +
			`Total time from start: ${this.getMs(now, totalStart)}`;
	}

	private static getMs(now: number, start: number) {
		return  `${((now - start).toLocaleString()).replace(/,/g, '.')} ms`;
	}

}
