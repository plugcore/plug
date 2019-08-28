import { Component } from '@angular/core';

@Component({
	selector: 'plug-system-configuration',
	templateUrl: './configuration.component.html',
	styleUrls: ['./configuration.component.scss']
})
export class SystemConfigurationComponent {

	logsConfig = {
		i1: 'a',
		i2: 'b',
		i3: {
			i31: [
				{ a: 'a' },
				99,
				'test'
			]
		},
		i4: {
			i41: 'aaa',
			i42: {
				i421: [
					{ a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
					{
						i421: [
							{ a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
							{
								i421: [
									{ a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
									{
										i421: [
											{ a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
											{
												i421: [
													{ a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
													{
														i421: [
															{ a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
															{
																i421: [
																	{ a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
																	{
																		i421: [
																			{ a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
																			{
																				i421: [
																					{
																						a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
																							'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
																					},
																					99,
																					'test'
																				]
																			}
																		]
																	}
																]
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
		}
	};

	constructor(
	) {
	}

}
