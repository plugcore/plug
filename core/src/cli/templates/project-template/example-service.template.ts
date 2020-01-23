
export const exampleServiceTemplate = `
import { InjectConfiguration, Logger, OnInit, Service } from '@plugcore/core';
import { Collection, MongoDbDatasource } from '@plugcore/ds-mongodb';
import { CustomConfiguration } from '../configuration/custom.configuration';
import { Example } from './example.shared';

@Service({ connection: 'mymongodb' })
export class ExamlpleServie implements OnInit {

	private collection: Collection<Example>;

	constructor(
		private log: Logger,
		@InjectConfiguration() private configuration: CustomConfiguration,
		private mongoDbConnection: MongoDbDatasource
	) {}

	public async onInit() {
		this.collection = await this.mongoDbConnection.getCollection<Example>('example');
		this.log.info('Example of property from configuration: ' + this.configuration.custom.example);
	}

	public async findAll(): Promise <Example[]> {
		return this.collection.find({}).toArray();
	}

	public async create(example: Example) {
		return this.collection.insert(example);
	}

	public async findById(id: string): Promise <Example | null> {
		return this.collection.findOne({ id });
	}

	public async update(example: Example) {
		return this.collection.updateOne({ id: example.id }, example);
	}

	public async remove(id: string) {
		return this.collection.remove({ id });
	}

}

`;


