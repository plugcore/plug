import { Controller, Delete, Get, Patch, Post, Put } from '../../../src/routes/routes.decorators';
import { Request } from '../../../src/routes/routes.shared';

@Controller({ urlBase: '/secured-path' })
export class ControllerAuthExample {

	// Mix of securities

	@Get({ security: ['basic', 'jwt'] })
	public async getTest(req: Request) {
		return { method: 'getTest', jwtPayload: req.jwtPayload };
	}

	@Post({ security: ['basic', 'jwt'] })
	public async postTest(req: Request) {
		return { method: 'postTest', jwtPayload: req.jwtPayload };
	}

	@Put({ security: ['basic'] })
	public async putTest(req: Request) {
		return { method: 'putTest', jwtPayload: req.jwtPayload };
	}

	@Delete({ security: ['jwt'] })
	public async deleteTest(req: Request) {
		return { method: 'deleteTest', jwtPayload: req.jwtPayload };
	}

	@Patch({ security: 'jwt' })
	public async patchTest(req: Request) {
		return { method: 'patchTest', jwtPayload: req.jwtPayload };
	}

	// No security by default

	@Get('/no-security')
	public async getTest2(req: Request) {
		return { method: 'getTest2', jwtPayload: req.jwtPayload };
	}

	@Post('/no-security')
	public async postTest2(req: Request) {
		return { method: 'postTest2', jwtPayload: req.jwtPayload };
	}

	@Put('/no-security')
	public async putTest2(req: Request) {
		return { method: 'putTest2', jwtPayload: req.jwtPayload };
	}

	@Delete('/no-security')
	public async deleteTest2(req: Request) {
		return { method: 'deleteTest2', jwtPayload: req.jwtPayload };
	}

	@Patch('/no-security')
	public async patchTest2(req: Request) {
		return { method: 'patchTest2', jwtPayload: req.jwtPayload };
	}

}
