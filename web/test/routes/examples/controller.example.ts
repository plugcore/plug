import { Controller, Get, Head, Post, Put, Delete, Options, Patch } from '../../../src/routes/routes.decorators';

@Controller()
export class ControllerExample {

	@Get()
	public getTest() {

	}

	@Head()
	public headTest() {

	}

	@Post()
	public postTest() {

	}

	@Put()
	public putTest() {

	}

	@Delete()
	public deleteTest() {

	}

	@Options()
	public optionsTest() {

	}

	@Patch()
	public patchTest() {

	}

}
