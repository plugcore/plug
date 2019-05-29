import { ExtConfiguration } from './ext-configuration.interface';

export class DefaultExtConfiguration implements ExtConfiguration {
	public id: 'plugdata-ext';
	public baseFolder: '';
	public distFolder: 'dist';
}
