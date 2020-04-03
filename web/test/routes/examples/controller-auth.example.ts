import { Controller, Delete, Get, Patch, Post, Put } from '../../../src/routes/routes.decorators';
import { Request } from '../../../src/routes/routes.shared';

@Controller({ urlBase: '/secured-path' })
export class ControllerAuthExample {

	// Mix of securities

	@Get({ security: ['basic', 'jwt'], config: { testKey: 'testValue' } })
	public async getTest(req: Request) {
		return { method: 'getTest', jwtPayload: req.jwtPayload };
	}

	@Post({ security: ['basic', 'jwt'], config: { testKey: 'testValue' }  })
	public async postTest(req: Request) {
		return { method: 'postTest', jwtPayload: req.jwtPayload };
	}

	@Put({ security: ['basic'], config: { testKey: 'testValue' }  })
	public async putTest(req: Request) {
		return { method: 'putTest', jwtPayload: req.jwtPayload };
	}

	@Delete({ security: ['jwt'], config: { testKey: 'testValue' }  })
	public async deleteTest(req: Request) {
		return { method: 'deleteTest', jwtPayload: req.jwtPayload };
	}

	@Patch({ security: 'jwt', config: { testKey: 'testValue' }  })
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

	@Get('/custom', { security: 'custom' })
	public async getTestCustom(req: Request) {
		return { method: 'getTestCustom', myHeader: req.customData.myHeader };
	}

}
