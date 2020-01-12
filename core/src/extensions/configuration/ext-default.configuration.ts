import { ExtConfiguration } from './ext-configuration.interface';

export class DefaultExtConfiguration implements ExtConfiguration {
	public id: 'plugcore-ext';
	public baseFolder: '';
	public distFolder: 'dist';
}
