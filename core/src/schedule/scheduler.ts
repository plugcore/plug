import { setTimeout } from 'timers';

export class CronUtils {

	private static cronPattern: RegExp = /^\d+$|^\*$|^\*\/\d+$/;
	private static rangeRegex: RegExp = /(\d+)-(\d+)/;

	private static months = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
		'august', 'september', 'october', 'november', 'december'];
	private static shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug',
		'sep', 'oct', 'nov', 'dec'];

	private static weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday',
		'friday', 'saturday'];
	private static shortWeekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

	private static wildCard = '*';
	private static hyphen = '-';
	private static comma = ',';

	private static ranges: any = {
		minute: {
			min: 0,
			max: 59
		},
		hour: {
			min: 0,
			max: 23
		},
		dayMonth: {
			min: 1,
			max: 31
		},
		month: {
			min: 0,
			max: 11
		},
		dayWeek: {
			min: 0,
			max: 27
		}
	};

	public static createCronJob(expression: string, method: Function, clazz?: string | Function) {

		let clazzName: string;
		if (typeof (clazz) === 'function') {
			clazzName = (<Function>clazz).constructor.name;
		} else {
			clazzName = <string>clazz;
		}

		const parsedExp = this.validateCron(expression);

		const timeoutMS: number = this.getTimeInMs(parsedExp);

		// Persist another way
		/* this.contentService.updateWithQuery<RegisteredJob>({ nextTimeExecuted: timeoutMS }, RegisteredJob,
			{ idJob: `${clazzName}.${method.name}` }); */

		if (timeoutMS < 2147483647) {

			setTimeout(() => {

				this.manageCronExecution(expression, method, clazzName);
			}, timeoutMS);
		} else {
			setTimeout(() => {

				this.createCronJob(expression, method, clazzName);
			}, 2147483647);
		}
	}

	private static async manageCronExecution(expression: string, method: Function, clazzName: string): Promise<any> {

		/* const initDate = new Date().getTime();

		let result;
		let status;
		try {

			result = await method();
			status = CronStatus.OK;
		} catch (error) {
			result = error.toString();
			status = CronStatus.ERROR;
		}

		const endDate = new Date().getTime(); */

		/* const executedJob: ExecutedJob = {
			initialDate: initDate,
			endDate: endDate,
			outputLog: result,
			status: status,
			idJob: method.name,
			data: undefined,
			executionCron: expression
		}; */

		// TODO: Persist another way
		/* this.contentService.updateWithQuery<RegisteredJob>({ lastTimeExecuted: initDate }, RegisteredJob,
			{ idJob: `${clazzName}.${method.name}` });

		this.contentService.create(executedJob, 'Jander', '0000000cb430c320689f0897', ExecutedJob); */

		this.createCronJob(expression, method, clazzName);
	}

	public static getTimeInMs(cronExp: number[][]): number {

		const actualDate: Date = new Date();
		actualDate.setMinutes(actualDate.getMinutes() + 1);
		cronExp.unshift([actualDate.getFullYear(), actualDate.getFullYear() + 1]);
		const dateArray = [actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate(), actualDate.getHours(), actualDate.getMinutes()];

		const nextTimeout: number[] = [];
		const acceptedValues: number[][] = [];

		let late = false;

		dateArray.forEach((element, index) => {
			acceptedValues[index] = cronExp[index].filter(value => value >= element);

			if (late) {
				nextTimeout[index] = cronExp[index][0];

			} else {

				if (element <= acceptedValues[index][0]) {
					nextTimeout[index] = acceptedValues[index][0];

				} else if (element > acceptedValues[index][acceptedValues.length - 1] || acceptedValues[index].length === 0) {
					nextTimeout[index] = cronExp[index][0];
					this.checkRange(nextTimeout, acceptedValues, index - 1);
					late = true;
				}
			}

		});

		const nextInMs =
			new Date(nextTimeout[0], nextTimeout[1], nextTimeout[2], nextTimeout[3], nextTimeout[4]).getTime() - new Date().getTime();

		return nextInMs;
	}

	private static checkRange(nextTimeout: number[], acceptedValues: number[][], index: number): void {

		if (acceptedValues[index][1]) {
			nextTimeout[index] = acceptedValues[index][1];
		} else {
			this.checkRange(nextTimeout, acceptedValues, index - 1);
		}
	}

	public static validateCron(expression: string) {

		const fields = expression.split(' ');
		const parsedExp = [];
		try {

			// if regex de mirar si es mes o día no numerico, entrar en la verificacion de meses y dias a numeros

			parsedExp[3] = CronUtils.replaceWildCard(fields[0], 'minute');
			parsedExp[2] = CronUtils.replaceWildCard(fields[1], 'hour');
			parsedExp[1] = CronUtils.replaceTextToNumber(fields[2], 'dayMonth', this.weekDays, this.shortWeekDays);
			parsedExp[0] = CronUtils.replaceTextToNumber(fields[3], 'month', this.months, this.shortMonths);
			// parsedExp[4] = CronUtils.replaceWildCard(fields[4], 'dayWeek');

		} catch (error) {
			console.log(error);
		}

		return parsedExp;
	}

	/**
	 * 1. We parse the non numeric values
	 * @param value
	 * @param field
	 * @param longVals
	 * @param shortVals
	 */
	private static replaceTextToNumber(value: string, field: string, longVals: string[], shortVals: string[]): number[] {

		longVals.forEach((val, index) => {
			value = value.replace(new RegExp(val, 'gi'), (index + 1).toString());
		});

		shortVals.forEach((val, index) => {
			value = value.replace(new RegExp(val, 'gi'), (index + 1).toString());
		});

		return CronUtils.replaceWildCard(value, field);
	}

	/**
	 * 2. Translate all wildcards to a given range of values
	 * @param value
	 * @param field
	 */
	private static replaceWildCard(value: string, field: string): number[] {

		if (value.includes(CronUtils.wildCard)) {
			value = value.replace('*', `${CronUtils.ranges[field].min}-${CronUtils.ranges[field].max}`);
		}
		return this.replaceRanges(value, field);
	}

	/**
	 * 3. Parse ranges to plane numbers and return the values joined
	 * @param value
	 * @param field
	 */
	private static replaceRanges(value: string, field: string): number[] {

		const listSeparated: string[] = value.split(this.comma);
		const ranges: number[] = [];

		listSeparated.forEach(lvalue => {

			if (this.rangeRegex.test(lvalue)) {

				const splitValues = lvalue.split(this.hyphen);

				this.parseRanges(+splitValues[0], +splitValues[1], field).forEach(val => { ranges.push(val); });

			} else {
				ranges.push(+lvalue);

			}
		});
		value = listSeparated.join();

		return ranges;
	}

	private static parseRanges(firstRange: number, secondRange: number, field: string) {

		if (firstRange > secondRange) {
			throw new Error(`Unnacepted relation of range values  ${field}`);
		}

		if (firstRange < this.ranges[field].min || secondRange > this.ranges[field].max) {
			throw new Error(`Unnacepted values at  ${field}`);
		} else {
			const numbers: number[] = [];

			for (let i = firstRange; i <= secondRange; i++) {
				numbers.push(i);
			}
			return numbers;
		}

	}
}
