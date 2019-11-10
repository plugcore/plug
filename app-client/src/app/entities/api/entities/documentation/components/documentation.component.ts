import { Component, OnInit } from '@angular/core';
import * as SwaggerUI from 'swagger-ui';

@Component({
	selector: 'plug-api-documentation',
	templateUrl: './documentation.component.html',
	styleUrls: ['./documentation.component.scss']
})
export class ApiDocumentationComponent implements OnInit {

	constructor(
	) {
	}

	ngOnInit() {
		const swaggerUi = new SwaggerUI({
			url: '/assets/swagger-pets.json',
			dom_id: '#swagger'
		});
	}

}
