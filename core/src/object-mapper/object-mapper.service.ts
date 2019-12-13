
import * as objectMapper from 'object-mapper';
import { Service } from '../dependecy-injection/di.decorators';
import { DeepPartial } from '../utils/typescript.utils';
import { ObjectMapping, ObjectMappingDefinition } from './object-mapper.interfaces';

@Service()
export class ObjectMapper {

	/**
	 * Given an object mappeing definiton creates a new object with that
	 * structure
	 * @param sourceObject
	 * @param objectMapping
	 */
	public map<T1, T2>(objectMapping: ObjectMappingDefinition<T1>, sourceObject: T1): T2 {
		return objectMapper.merge<T1, T2>(sourceObject, objectMapping);
	}

	/**
	 * Given an object mappeing definiton creates a new object with that
	 * structure and merges it with the secondg object
	 * @param sourceObject
	 * @param objectMapping
	 */
	public mapAndMerge<T1, T2>(objectMapping: ObjectMappingDefinition<T1>, sourceObject: T1, targetObject: DeepPartial<T2>): T2 {
		return objectMapper.merge<T1, T2>(sourceObject, targetObject, objectMapping);
	}

	/**
	 * Creates a function that already has stored an object mapping and has the correct types
	 * for source object and target object. This functions accepts a source objects ands performs
	 * the stored mapping
	 * @param objectMapping
	 */
	public createMapping<T1, T2>(objectMapping: ObjectMappingDefinition<T1>): ObjectMapping<T1, T2> {
		return (sourceObject: T1) => this.map<T1, T2>(objectMapping, sourceObject);
	}

}


