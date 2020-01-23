
export const exampleControllerTemplate = `
import { Logger, StringUtils } from '@plugcore/core';
import { Controller, DefaultResponseModel, Delete, Get, Post, Request, Response } from '@plugcore/web';
import { ExampleIdParam, ExampleResponse, ExampleUpdateRequest } from './example.api';
import { ExamlpleServie } from './example.service';
import { Example } from './example.shared';

@Controller({ urlBase: '/example' })
export class ExampleController {

	constructor(
		private examlpleServie: ExamlpleServie,
		private log: Logger,
	) { }

	//
	// Public API
	//

	@Get({
		routeSchemas: {
			response: { model: ExampleResponse, isArray: true }
		},
		onRequest: ExampleController.prototype.findAllOnRequest
	})
	public async findAll(): Promise<ExampleResponse[]> {
		return this.examlpleServie.findAll();
	}

	@Get('/:id', {
		routeSchemas: {
			urlParameters: ExampleIdParam,
			response: ExampleResponse
		}
	})
	public async findById(req: Request<undefined, ExampleIdParam>): Promise<ExampleResponse> {
		const result = await this.examlpleServie.findById(req.params.id);
		if (!result) {
			throw new Error('Example not found with id ' + req.params.id);
		} else {
			return result;
		}
	}

	@Post({
		routeSchemas: {
			request: ExampleUpdateRequest,
			response: ExampleIdParam
		}
	})
	public async create(req: Request<ExampleUpdateRequest>) {
		const example: Example = {
			id: StringUtils.createRandomId(),
			...req.body
		}
		await this.examlpleServie.create(example);
		return { id: example.id };
	}

	@Delete('/:id', {
		routeSchemas: {
			urlParameters: ExampleIdParam,
			response: DefaultResponseModel
		}
	})
	public async remove(req: Request<undefined, ExampleIdParam>) {
		await this.examlpleServie.remove(req.params.id);
		return { success: true };
	}

	//
	// Events
	//

	private async findAllOnRequest(req: Request, res: Response) {
		this.log.debug('Example of http event: ' + req.raw.url);
	}

}

`;
