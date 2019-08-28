import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'plug-json-navigation-json-view',
	templateUrl: './json-view.component.html',
	styleUrls: ['./json-view.component.scss']
})
export class JsonNavigationJsonViewComponent implements OnInit {

	@Input() public data: Object;
	@Output() public eventEmmiter = new EventEmitter<any>();

	prettyJSON;

	constructor() { }

	ngOnInit() {
		this.output(this.syntaxHighlight(JSON.stringify(this.data, undefined, 4)));
	}

	syntaxHighlight(json) {
		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
			function (match) {
				let cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'key';
					} else {
						cls = 'string';
					}
				} else if (/true|false/.test(match)) {
					cls = 'boolean';
				} else if (/null/.test(match)) {
					cls = 'null';
				}
				return '<span class="' + cls + '">' + match + '</span>';
			});
	}

	output(inp) {
		document.getElementById('json-view').innerHTML = inp;
	}

}
