import { Component, OnInit } from '@angular/core';
import * as SwaggerUI from 'swagger-ui';

@Component({
	selector: 'plug-plugs-documentation',
	templateUrl: './documentation.component.html',
	styleUrls: ['./documentation.component.scss']
})
export class PlugsDocumentationComponent implements OnInit {

	constructor(
	) {
	}

	ngOnInit() {
		const swaggerUi = new SwaggerUI({
			url: '/assets/swagger-plug.json',
			dom_id: '#swagger'
		});
	}
}
