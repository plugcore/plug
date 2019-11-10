import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../components/table/interfaces/table.interface';
import { DataModelFromDb, DataModel, DmMetaDatabase, DmMetaPlug } from '../models/data-models.model';

@Injectable({
	providedIn: 'root'
})
export class DataModelsService {

	data: DataModelFromDb[] = [
		<Required<DataModel<DmMetaDatabase>>>{
			id: 'reservation',
			name: 'Tour reservation',
			desc: 'A reservation that the user makes selection a tour, flights, hotel and vehicle',
			type: 'database',
			meta: {
				databaseName: 'PGsrv01',
				databaseType: 'Postgres',
				schema: 'reservations'
			},
			attributes: {
				'title': 'Reservartion',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'userId': {
						'title': 'UserId',
						'type': 'string'
					},
					'hotel': {
						'title': 'HorelRoom',
						'type': 'object',
						'properties': {
							'id': {
								'title': 'Id',
								'type': 'string'
							},
							'hotel': {
								'title': 'Hotel',
								'type': 'string'
							},
							'roomType': {
								'title': 'RoomType',
								'type': 'string',
								'pattern': 'big|small'
							},
							'checkInDate': {
								'title': 'CheckInDate',
								'type': 'number'
							},
							'checkOutDate': {
								'title': 'CheckOutDate',
								'type': 'number'
							},
							'price': {
								'title': 'Price',
								'type': 'array',
								'contains': {
									'title': 'PriceInCurrencies',
									'type': 'object',
									'properties': {
										'price': {
											'title': 'Price',
											'type': 'string'
										},
										'currency': {
											'title': 'Currency',
											'type': 'number'
										}
									},
									'required': [
										'price',
										'currency'
									]
								},
								'minItems': 1,
								'uniqueItems': true
							}
						},
						'required': [
							'id',
							'hotel',
							'roomType',
							'checkInDate',
							'checkOutDate',
							'price'
						]
					},
					'flights': {
						'title': 'ReservartionFlights',
						'type': 'object',
						'properties': {
							'departingFlight': {
								'title': 'Flight',
								'type': 'object',
								'properties': {
									'id': {
										'title': 'Id',
										'type': 'string'
									},
									'departureAirport': {
										'title': 'DepartureAirport',
										'type': 'string'
									},
									'arrivalAirport': {
										'title': 'ArrivalAirport',
										'type': 'string'
									},
									'departureDate': {
										'title': 'DepartureDate',
										'type': 'number'
									},
									'arrivalDate': {
										'title': 'ArrivalDate',
										'type': 'number'
									},
									'price': {
										'title': 'Price',
										'type': 'array',
										'contains': {
											'title': 'PriceInCurrencies',
											'type': 'object',
											'properties': {
												'price': {
													'title': 'Price',
													'type': 'string'
												},
												'currency': {
													'title': 'Currency',
													'type': 'number'
												}
											},
											'required': [
												'price',
												'currency'
											]
										},
										'minItems': 1,
										'uniqueItems': true
									}
								},
								'required': [
									'id',
									'departureAirport',
									'arrivalAirport',
									'departureDate',
									'arrivalDate',
									'price'
								]
							},
							'returningFlight': {
								'title': 'Flight',
								'type': 'object',
								'properties': {
									'id': {
										'title': 'Id',
										'type': 'string'
									},
									'departureAirport': {
										'title': 'DepartureAirport',
										'type': 'string'
									},
									'arrivalAirport': {
										'title': 'ArrivalAirport',
										'type': 'string'
									},
									'departureDate': {
										'title': 'DepartureDate',
										'type': 'number'
									},
									'arrivalDate': {
										'title': 'ArrivalDate',
										'type': 'number'
									},
									'price': {
										'title': 'Price',
										'type': 'array',
										'contains': {
											'title': 'PriceInCurrencies',
											'type': 'object',
											'properties': {
												'price': {
													'title': 'Price',
													'type': 'string'
												},
												'currency': {
													'title': 'Currency',
													'type': 'number'
												}
											},
											'required': [
												'price',
												'currency'
											]
										},
										'minItems': 1,
										'uniqueItems': true
									}
								},
								'required': [
									'id',
									'departureAirport',
									'arrivalAirport',
									'departureDate',
									'arrivalDate',
									'price'
								]
							}
						}
					},
					'vehicle': {
						'title': 'Vehicle',
						'type': 'object'
					}
				},
				'required': [
					'id',
					'userId',
					'hotel',
					'flights'
				]
			}
		},
		<Required<DataModel<DmMetaDatabase>>>{
			id: 'reservation-log',
			name: 'Reservation log',
			desc: 'A register of a user search of tours',
			type: 'database',
			meta: {
				databaseName: 'MySQLsrv02',
				databaseType: 'MySQL',
				schema: 'reservation_logs'
			},
			attributes: {
				'$schema': 'http://json-schema.org/draft-07/schema#',
				'title': 'ReservartionLog',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'date': {
						'title': 'Date',
						'type': 'number'
					},
					'userLocation': {
						'title': 'UserLocation',
						'type': 'string'
					},
					'searchedCity': {
						'title': 'SearchedCity',
						'type': 'string'
					},
					'purchased': {
						'title': 'Purchased',
						'type': 'boolean'
					}
				},
				'required': [
					'id',
					'date',
					'userLocation',
					'searchedCity',
					'purchased'
				]
			}
		},
		<Required<DataModel<DmMetaDatabase>>>{
			id: 'plugcore-log',
			name: 'Plug core log',
			desc: 'A register of some interation with this Plugcore instnace',
			type: 'database',
			meta: {
				databaseName: 'MongoDbsrv03',
				databaseType: 'MongoDb',
				schema: 'plugcore_logs'
			},
			attributes: {
				'$schema': 'http://json-schema.org/draft-07/schema#',
				'title': 'PlugCoreLog',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'name': {
						'title': 'Name',
						'type': 'string'
					},
					'level': {
						'title': 'Level',
						'type': 'string'
					},
					'time': {
						'title': 'Time',
						'type': 'number'
					},
					'pid': {
						'title': 'Pid',
						'type': 'number'
					},
					'hostname': {
						'title': 'Hostname',
						'type': 'string'
					},
					'v': {
						'title': 'V',
						'type': 'string'
					},
					'msg': {
						'title': 'Msg',
						'type': 'string'
					}
				},
				'required': [
					'id',
					'name',
					'level',
					'time',
					'pid',
					'hostname',
					'v',
					'msg'
				]
			}
		},
		<Required<DataModel<DmMetaDatabase>>>{
			id: 'plugcore-user',
			name: 'Plug core user',
			desc: 'A dashboard user definition',
			type: 'database',
			meta: {
				databaseName: 'MongoDbsrv03',
				databaseType: 'MongoDb',
				schema: 'plugcore_users'
			},
			attributes: {
				'title': 'PlugCoreUser',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'name': {
						'title': 'Name',
						'type': 'string'
					},
					'passwordHash': {
						'title': 'PasswordHash',
						'type': 'string'
					},
					'email': {
						'title': 'Email',
						'type': 'string'
					},
					'lastLogin': {
						'title': 'LastLogin',
						'type': 'number'
					},
					'roles': {
						'title': 'Roles',
						'type': 'array',
						'contains': {
							'title': 'availablePaths',
							'type': 'array',
							'items': {
								'type': 'string'
							}
						},
						'uniqueItems': true
					}
				},
				'required': [
					'id',
					'name',
					'passwordHash',
					'email',
					'lastLogin',
					'roles'
				]
			}
		},
		<Required<DataModel<DmMetaDatabase>>>{
			id: 'plugcore-rol',
			name: 'Plug core rol',
			desc: 'A dashboard rol definition',
			type: 'database',
			meta: {
				databaseName: 'MongoDbsrv03',
				databaseType: 'MongoDb',
				schema: 'plugcore_rols'
			},
			attributes: {
				'title': 'PlugCoreRol',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'name': {
						'title': 'Name',
						'type': 'string'
					},
					'translatedLabel': {
						'title': 'TranslatedLabel',
						'type': 'array',
						'contains': {
							'title': 'LabelTranslation',
							'type': 'object',
							'properties': {
								'language': {
									'title': 'Language',
									'type': 'string'
								},
								'value': {
									'title': 'Value',
									'type': 'string'
								}
							},
							'required': [
								'language',
								'value'
							]
						},
						'minItems': 1,
						'uniqueItems': true
					},
					'availableActions': {
						'title': 'AvailableActions',
						'type': 'array',
						'contains': {
							'title': 'availablePaths',
							'type': 'array',
							'items': {
								'type': 'string'
							}
						},
						'uniqueItems': true
					},
					'isAdmin': {
						'title': 'IsAdmin',
						'type': 'boolean'
					}
				},
				'required': [
					'id',
					'name',
					'translatedLabel',
					'isAdmin'
				]
			}
		},
		<Required<DataModel<DmMetaDatabase>>>{
			id: 'plugcore-api-token',
			name: 'Plug core API Token',
			desc: 'An API token that enabe access to certain method calls',
			type: 'database',
			meta: {
				databaseName: 'MongoDbsrv03',
				databaseType: 'MongoDb',
				schema: 'plugcore_apitokens'
			},
			attributes: {
				'title': 'PlugCoreApiToken',
				'type': 'object',
				'properties': {
					'token': {
						'title': 'Token',
						'type': 'string'
					},
					'availablePaths': {
						'title': 'AvailablePaths',
						'type': 'array',
						'contains': {
							'title': 'availablePaths',
							'type': 'array',
							'items': {
								'type': 'string'
							}
						},
						'uniqueItems': true
					},
					'allPathsAvailable': {
						'title': 'AllPathsAvailable',
						'type': 'boolean'
					},
					'validityStart': {
						'title': 'ValidityStart',
						'type': 'number'
					},
					'validityEnd': {
						'title': 'ValidityEnd',
						'type': 'number'
					}
				},
				'required': [
					'token',
					'allPathsAvailable',
					'validityStart',
					'validityEnd'
				]
			}
		},
		<Required<DataModel<DmMetaDatabase>>>{
			id: 'plugcore-api-log',
			name: 'Plug core API log',
			desc: 'An API special log that contains information about the dall and it\'s duration',
			type: 'database',
			meta: {
				databaseName: 'MongoDbsrv03',
				databaseType: 'MongoDb',
				schema: 'plugcore_apilog'
			},
			attributes: {
				'title': 'PlugCoreApiLog',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'date': {
						'title': 'Date',
						'type': 'number'
					},
					'path': {
						'title': 'Path',
						'type': 'string'
					},
					'httpMethod': {
						'title': 'HttpMethod',
						'type': 'string'
					},
					'apiToken': {
						'title': 'ApiToken',
						'type': 'string'
					},
					'callDuration': {
						'title': 'CallDuration',
						'type': 'number'
					}
				},
				'required': [
					'date',
					'path',
					'httpMethod',
					'apiToken',
					'callDuration'
				]
			}
		},
		<Required<DataModel<DmMetaPlug>>>{
			id: 'holidayhotels-hotelroom',
			name: 'Room information',
			desc: 'Information related to an specific room attributes and price form an hotel',
			type: 'plug',
			meta: {
				plug: 'holiday-hotels'
			},
			attributes: {
				'title': 'HorelRoom',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'hotel': {
						'title': 'Hotel',
						'type': 'string'
					},
					'roomType': {
						'title': 'RoomType',
						'type': 'string',
						'pattern': 'big|small'
					},
					'checkInDate': {
						'title': 'CheckInDate',
						'type': 'number'
					},
					'checkOutDate': {
						'title': 'CheckOutDate',
						'type': 'number'
					},
					'price': {
						'title': 'Price',
						'type': 'array',
						'contains': {
							'title': 'PriceInCurrencies',
							'type': 'object',
							'properties': {
								'price': {
									'title': 'Price',
									'type': 'string'
								},
								'currency': {
									'title': 'Currency',
									'type': 'number'
								}
							},
							'required': [
								'price',
								'currency'
							]
						},
						'minItems': 1,
						'uniqueItems': true
					}
				},
				'required': [
					'id',
					'hotel',
					'roomType',
					'checkInDate',
					'checkOutDate',
					'price'
				]
			}
		},
		<Required<DataModel<DmMetaPlug>>>{
			id: 'myrentacar-car',
			name: 'Car information',
			desc: 'Information related to an specific car rent with the price',
			type: 'plug',
			meta: {
				plug: 'my-rentacar'
			},
			attributes: {
				'title': 'Car',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'brand': {
						'title': 'Brand',
						'type': 'string'
					},
					'model': {
						'title': 'Model',
						'type': 'string'
					},
					'price': {
						'title': 'Price',
						'type': 'array',
						'contains': {
							'title': 'PriceInCurrencies',
							'type': 'object',
							'properties': {
								'price': {
									'title': 'Price',
									'type': 'string'
								},
								'currency': {
									'title': 'Currency',
									'type': 'number'
								}
							},
							'required': [
								'price',
								'currency'
							]
						},
						'minItems': 1,
						'uniqueItems': true
					},
					'pickupDate': {
						'title': 'PickupDate',
						'type': 'number'
					},
					'dropDate': {
						'title': 'DropDate',
						'type': 'number'
					}
				},
				'required': [
					'brand',
					'model',
					'price',
					'pickupDate',
					'dropDate'
				]
			}
		},
		<Required<DataModel<DmMetaPlug>>>{
			id: 'worldairlines-fight',
			name: 'Flight information',
			desc: 'Information related to an specific flight with the price',
			type: 'plug',
			meta: {
				plug: 'world-airlines'
			},
			attributes: {
				'title': 'Flight',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'departureAirport': {
						'title': 'DepartureAirport',
						'type': 'string'
					},
					'arrivalAirport': {
						'title': 'ArrivalAirport',
						'type': 'string'
					},
					'departureDate': {
						'title': 'DepartureDate',
						'type': 'number'
					},
					'arrivalDate': {
						'title': 'ArrivalDate',
						'type': 'number'
					},
					'price': {
						'title': 'Price',
						'type': 'array',
						'contains': {
							'title': 'PriceInCurrencies',
							'type': 'object',
							'properties': {
								'price': {
									'title': 'Price',
									'type': 'string'
								},
								'currency': {
									'title': 'Currency',
									'type': 'number'
								}
							},
							'required': [
								'price',
								'currency'
							]
						},
						'minItems': 1,
						'uniqueItems': true
					}
				},
				'required': [
					'departureAirport',
					'arrivalAirport',
					'departureDate',
					'arrivalDate',
					'price'
				]
			}
		},
		<Required<DataModel<DmMetaPlug>>>{
			id: 'besttours-tour',
			name: 'Tour information',
			desc: 'Information related to an specific tour with the price',
			type: 'plug',
			meta: {
				plug: 'best-tours'
			},
			attributes: {
				'title': 'Tour',
				'type': 'object',
				'properties': {
					'id': {
						'title': 'Id',
						'type': 'string'
					},
					'name': {
						'title': 'Name',
						'type': 'string'
					},
					'description': {
						'title': 'Description',
						'type': 'string'
					},
					'longDescription': {
						'title': 'LongDescription',
						'type': 'string'
					},
					'imageUrl': {
						'title': 'ImageUrl',
						'type': 'string'
					},
					'prices': {
						'title': 'Prices',
						'type': 'array',
						'contains': {
							'title': 'TourPrices',
							'type': 'object',
							'properties': {
								'price': {
									'title': 'Price',
									'type': 'string'
								},
								'currency': {
									'title': 'Currency',
									'type': 'number'
								}
							},
							'required': [
								'price',
								'currency'
							]
						},
						'minItems': 1,
						'uniqueItems': true
					}
				},
				'required': [
					'id',
					'name',
					'description',
					'longDescription',
					'imageUrl',
					'prices'
				]
			}
		}
	];

	public search(): Observable<ITablesResults<DataModelFromDb>> {

		const lenght = this.data.length;
		const result: ITablesResults<DataModelFromDb> = {
			data: this.data,
			total: lenght
		};
		return of(result);
	}

	public findById(id: string): Observable<DataModelFromDb> {
		const dataModel = this.data.find(dm => {
			return dm.id === id;
		});
		return of(dataModel);
	}

}

