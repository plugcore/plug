import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { ApiFromDb, IApiInternal, IApiProxy } from '../models/designer.model';

@Injectable({
	providedIn: 'root'
})
export class TablesApiDesignerService {

	public data: ApiFromDb[] = [
		<IApiInternal>{
			id: 1,
			method: 'GET',
			uri: '/tours/find-future-tours-in-city/:cityId',
			description: 'Returns a list of future tours for a given city',
			tags: ['tours'],
			jsClass: 'ToursController',
			jsMethod: 'findFutureToursInCity',
			documentation: {
				urlparameters: {
					'title': 'FindFutureToursInCityUrlParameters',
					'type': 'object',
					'properties': {
						'cityId': {
							'title': 'CityId',
							'type': 'string'
						}
					},
					'required': [
						'cityId'
					]
				},
				response: {
					'title': 'FindFutureToursInCityResponse',
					'type': 'array',
					'items': {
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
							'price': {
								'title': 'Price',
								'type': 'array',
								'items': {
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
							'name',
							'description',
							'longDescription',
							'imageUrl',
							'price'
						]
					}
				}
			}
		},
		<IApiInternal>{
			id: 2,
			method: 'GET',
			uri: '/tours/find-related-products-for-tour/:tourId',
			description: 'Given a tour it tries to offer all related products',
			tags: ['tours'],
			jsClass: 'ToursController',
			jsMethod: 'findRelatedProducts',
			documentation: {
				urlparameters: {
					'title': 'FindRelatedProductsUrlParameters',
					'type': 'object',
					'properties': {
						'tourId': {
							'title': 'TourId',
							'type': 'string'
						}
					},
					'required': [
						'tourId'
					]
				},
				response: {
					'title': 'TourRelatedProducts',
					'type': 'object',
					'properties': {
						'departingFlights': {
							'title': 'DepartingFlights',
							'type': 'array',
							'items': {
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
										'items': {
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
							'minItems': 1,
							'uniqueItems': true
						},
						'returningFlights': {
							'title': 'ReturningFlights',
							'type': 'array',
							'items': {
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
										'items': {
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
							'minItems': 1,
							'uniqueItems': true
						},
						'vehicles': {
							'title': 'Vehicles',
							'type': 'array',
							'items': {
								'title': 'VehicleModel',
								'type': 'object',
								'properties': {
									'id': {
										'title': 'Id',
										'type': 'number'
									},
									'model': {
										'title': 'Model',
										'type': 'string'
									},
									'year': {
										'title': 'Year',
										'type': 'number'
									}
								},
								'required': [
									'id',
									'model',
									'year'
								]
							},
							'minItems': 1,
							'uniqueItems': true
						},
						'hotelRooms': {
							'title': 'HotelRooms',
							'type': 'array',
							'items': {
								'title': 'HotelRoom',
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
										'items': {
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
							'minItems': 1,
							'uniqueItems': true
						}
					},
					'required': [
						'departingFlights',
						'returningFlights',
						'vehicles',
						'hotelRooms'
					]
				}
			}
		},
		<IApiProxy>{
			id: 3,
			method: 'POST',
			uri: '/reservations',
			description: 'Creates a new reservation composed of a tour and complement products',
			tags: ['reservations'],
			targetUrl: 'http://192.168.77.89/reservations/create',
			retries: 5,
			timeout: 10,
			documentation: {
				request: {
					'title': 'ReservationReferences',
					'type': 'object',
					'properties': {
						'userId': {
							'title': 'UserId',
							'type': 'string'
						},
						'tourId': {
							'title': 'TourId',
							'type': 'string'
						},
						'hotelRoomId': {
							'title': 'HotelRoomId',
							'type': 'string'
						},
						'flights': {
							'title': 'ReservationFlightsReferences',
							'type': 'object',
							'properties': {
								'departingFlight': {
									'title': 'DepartingFlight',
									'type': 'string'
								},
								'returningFlight': {
									'title': 'ReturningFlight',
									'type': 'string'
								}
							},
							'required': [
								'departingFlight',
								'returningFlight'
							]
						},
						'vehicleId': {
							'title': 'VehicleId',
							'type': 'string'
						}
					},
					'required': [
						'userId',
						'tourId',
						'hotelRoomId',
						'flights',
						'vehicleId'
					]
				}
			}
		},
		<IApiProxy>{
			id: 4,
			method: 'GET',
			uri: '/find-user-reservations/:userId',
			description: 'Returns all the reservation the user made until now',
			tags: ['reservations'],
			targetUrl: 'http://192.168.77.89/reservations/find-by-user-id',
			retries: 5,
			timeout: 10,
			documentation: {
				urlParameters: {
					'title': 'FindUserReservationsUrlParameters',
					'type': 'object',
					'properties': {
						'userId': {
							'title': 'UserId',
							'type': 'string'
						}
					},
					'required': [
						'userId'
					]
				},
				response:  {
					'title': 'Price',
					'type': 'array',
					'items': {
						'title': 'Reservation',
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
								'title': 'HotelRoom',
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
										'items': {
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
								'title': 'ReservationFlights',
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
												'items': {
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
												'items': {
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
				}
			}
		},
		<IApiProxy>{
			id: 5,
			method: 'DELETE',
			uri: '/cancel-reservation/:reservationId',
			description: 'Cancels a tour reservation and all the related products',
			tags: ['reservations'],
			targetUrl: 'http://192.168.77.89/reservations/cancel',
			retries: 5,
			timeout: 10,
			documentation: {
				request: {
					'title': 'FindRelatedProductsUrlParameters',
					'type': 'object',
					'properties': {
						'tourId': {
							'title': 'TourId',
							'type': 'string'
						}
					},
					'required': [
						'tourId'
					]
				}
			}
		}
	];

	public search(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<ApiFromDb>> {

		const lenght = this.data.length;
		this.data = this.applySort(this.data, activeSort, direction);
		const newData = this.applyPagination(this.data, pageIndex, pageSize);
		const result: ITablesResults<ApiFromDb> = {
			data: newData,
			total: lenght
		};
		return of(result);
	}

	public findAll(): ApiFromDb[] {
		return this.data;
	}

	public update(api: ApiFromDb): Observable<any> {
		if (api.id) {
			let foundApi = this.data.find(r => {
				return r.id === api.id;
			});
			foundApi = Object.assign(foundApi, api);
		} else {
			const newId = Math.max(...this.data.map(r => r.id)) + 1;
			api.id = newId;
			this.data.push(api);
		}
		return of(true);
	}

	public delete(id: number): Observable<any> {
		const index = this.data.findIndex(r => r.id === id);
		this.data.splice(index, 1);
		return of(true);
	}

	public findById(id: number): Observable<ApiFromDb> {
		const token = this.data.find(r => {
			return r.id === id;
		});
		return of(token);
	}

	private applySort(data: ApiFromDb[], activeSort: string, direction: number): ApiFromDb[] {
		console.log(direction);
		if (activeSort !== undefined) {
			if (direction === 1) {
				data.sort((a, b) => {
					if (a[activeSort] < b[activeSort]) {
						return -1;
					}
					if (a[activeSort] > b[activeSort]) {
						return 1;
					}
					return 0;
				});
			} else {
				data.sort((a, b) => {
					if (a[activeSort] > b[activeSort]) {
						return -1;
					}
					if (a[activeSort] < b[activeSort]) {
						return 1;
					}
					return 0;
				});
			}
		}
		return data;
	}

	private applyPagination(data: ApiFromDb[], pageIndex: number, pageSize: number): ApiFromDb[] {
		const temp: ApiFromDb[] = [];
		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}

