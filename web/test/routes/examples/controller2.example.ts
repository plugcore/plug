import { Controller, Delete, Get, Head, Options, Patch, Post, Put } from '../../../src/routes/routes.decorators';

@Controller({ urlBase: '/test2' })
export class Controller2Example {

	@Get()
	public async getTest() {
		return { method: 'getTest', test: 2 };
	}

	@Head()
	public async headTest() {
		return { method: 'headTest', test: 2 };
	}

	@Post()
	public async postTest() {
		return { method: 'postTest', test: 2 };
	}

	@Put()
	public async putTest() {
		return { method: 'putTest', test: 2 };
	}

	@Delete()
	public async deleteTest() {
		return { method: 'deleteTest', test: 2 };
	}

	@Options()
	public async optionsTest() {
		return { method: 'optionsTest', test: 2 };
	}

	@Patch()
	public async patchTest() {
		return { method: 'patchTest', test: 2 };
	}

}
