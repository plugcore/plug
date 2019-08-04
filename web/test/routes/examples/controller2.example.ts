import { Controller, Get, Head, Post, Put, Delete, Options, Patch } from '../../../src/routes/routes.decorators';
import { Request, Response } from '../../../src/routes/routes.shared';

@Controller({ urlBase: '/test2' })
export class Controller2Example {

	@Get()
	public async getTest(req: Request, res: Response) {
		return { method: 'getTest', test: 2 };
	}

	@Head()
	public async headTest(req: Request, res: Response) {
		return { method: 'headTest', test: 2 };
	}

	@Post()
	public async postTest(req: Request, res: Response) {
		return { method: 'postTest', test: 2 };
	}

	@Put()
	public async putTest(req: Request, res: Response) {
		return { method: 'putTest', test: 2 };
	}

	@Delete()
	public async deleteTest(req: Request, res: Response) {
		return { method: 'deleteTest', test: 2 };
	}

	@Options()
	public async optionsTest(req: Request, res: Response) {
		return { method: 'optionsTest', test: 2 };
	}

	@Patch()
	public async patchTest(req: Request, res: Response) {
		return { method: 'patchTest', test: 2 };
	}

}
