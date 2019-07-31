import { Logger } from '@plugdata/core';
import { Controller, Delete, Get, Head, Options, Patch, Post, Put } from '../../../src/routes/routes.decorators';
import { Request, Response } from '../../../src/routes/routes.shared';
import { ExampleHeaders, ExampleRequest, ExampleResponse, ExampleParams } from './route-validators.example';

@Controller({ urlBase: '/test' })
export class ControllerExample {
	
	public onRequestCalled = false;
	public preParsingCalled = false;
	public preValidationCalled = false;
	public preHandlerCalled = false;
	public preSerializationCalled = false;
	public loggerNotNull = false;

	constructor(
		private logger: Logger
	) {}

	@Get()
	public async getTest(req: Request, res: Response) {
		return { method: 'getTest', test: 1 };
	}

	@Head()
	public async headTest(req: Request, res: Response) {
		return { method: 'headTest', test: 1 };
	}

	@Post('', {
		routeValidation: {
			request: ExampleRequest,
			response: ExampleResponse,
			parameters: ExampleParams,
			headers: ExampleHeaders
		},
		onRequest: ControllerExample.prototype.onRequest,
		preParsing: ControllerExample.prototype.preParsing,
		preValidation: ControllerExample.prototype.preValidation,
		preHandler: ControllerExample.prototype.preHandler,
		preSerialization: ControllerExample.prototype.preSerialization
	})
	public async postTest(req: Request, res: Response) {
		return <ExampleResponse>{ success: true };
	}

	@Put()
	public async putTest(req: Request, res: Response) {
		return { method: 'putTest', test: 1 };
	}

	@Delete()
	public async deleteTest(req: Request, res: Response) {
		return { method: 'deleteTest', test: 1 };
	}

	@Options()
	public async optionsTest(req: Request, res: Response) {
		return { method: 'optionsTest', test: 1 };
	}

	@Patch()
	public async patchTest(req: Request, res: Response) {
		return { method: 'patchTest', test: 1 };
	}

	public async onRequest(req: Request, res: Response) {
		if (this.logger !== null) {
			this.loggerNotNull = true;
		}
		this.onRequestCalled = true;
	}

	public async preParsing(req: Request, res: Response) {
		this.preParsingCalled = true;
	}

	public async preValidation(req: Request, res: Response) {
		this.preValidationCalled = true;
	}

	public async preHandler(req: Request, res: Response) {
		this.preHandlerCalled = true;
	}

	public async preSerialization(req: Request, res: Response, payload: any) {
		this.preSerializationCalled = true;
	}

}
