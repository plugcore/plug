import { Logger, FsUtils } from '@plugcore/core';
import { Controller, Delete, Get, Head, Options, Patch, Post, Put } from '../../../src/routes/routes.decorators';
import { Request, Response } from '../../../src/routes/routes.shared';
import { ExampleHeaders, ExampleParams, ExampleRequest, ExampleResponse } from './route-validators.example';
import { MimeTypes } from '../../../src/routes/routes.constants';

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
	) { }

	@Get()
	public async getTest() {
		return { method: 'getTest', test: 1 };
	}

	@Head()
	public async headTest() {
		return { method: 'headTest', test: 1 };
	}

	@Post('/upload', {
		schema: {
			body: {
				type: 'object',
				properties: {
					upfile: {
						type: 'object',
						isFileType: true
					},
					upfileArray: {
						type: 'array',
						oasFieldStyle: 'form',
						items: {
							type: 'object',
							isFileType: true
						}
					},
					nonFileArray: {
						type: 'array',
						oasFieldStyle: 'form',
						items: {
							type: 'string'
						}
					}
				},
				required: ['upfile']
			}
		},
		routeSchemas: {
			query: ExampleParams,
			headers: ExampleHeaders,
			tags: ['customTag'],
			consumes: [MimeTypes.multipartFormData],
			operationId: 'testid',
			description: 'Some description postTestUpload',
			summary: 'This is a summary postTestUpload',
			produces: [MimeTypes.jpeg]
		},
		onRequest: ControllerExample.prototype.onRequest,
		preParsing: ControllerExample.prototype.preParsing,
		preValidation: ControllerExample.prototype.preValidation,
		preHandler: ControllerExample.prototype.preHandler,
		preSerialization: ControllerExample.prototype.preSerialization
	})
	public async postTestUpload(req: Request<any>, res: Response) {
		res.header('Content-Disposition', `attachment; filename="${req.body.upfile.fileName}"`);
		res.type(MimeTypes.jpeg);
		return FsUtils.createReadStream(req.body.upfile.filePath);
	}


	@Post('', {
		routeSchemas: {
			request: ExampleRequest,
			response: ExampleResponse,
			query: ExampleParams,
			headers: ExampleHeaders,
			tags: ['customTag']
		},
		onRequest: ControllerExample.prototype.onRequest,
		preParsing: ControllerExample.prototype.preParsing,
		preValidation: ControllerExample.prototype.preValidation,
		preHandler: ControllerExample.prototype.preHandler,
		preSerialization: ControllerExample.prototype.preSerialization
	})
	public async postTest(req: Request) {
		req.log.debug('Test route debug from log');
		req.log.info({ num: 12, str: 'Test route debug from log object' });
		return <ExampleResponse>{ success: true };
	}

	@Put()
	public async putTest() {
		return { method: 'putTest', test: 1 };
	}

	@Delete()
	public async deleteTest() {
		return { method: 'deleteTest', test: 1 };
	}

	@Options()
	public async optionsTest() {
		return { method: 'optionsTest', test: 1 };
	}

	@Patch()
	public async patchTest() {
		return { method: 'patchTest', test: 1 };
	}

	public async onRequest() {
		if (this.logger !== null) {
			this.loggerNotNull = true;
		}
		this.onRequestCalled = true;
	}

	public async preParsing() {
		this.preParsingCalled = true;
	}

	public async preValidation() {
		this.preValidationCalled = true;
	}

	public async preHandler() {
		this.preHandlerCalled = true;
	}

	public async preSerialization() {
		this.preSerializationCalled = true;
	}

}
