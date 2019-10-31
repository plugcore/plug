export interface Role {
	name: string;
	permissions?: Permission;
	id?: number;
	create_date?: number;
	create_user?: string;
	modify_date?: number;
	modify_user?: string;
}

export type RoleFromDb = Required<Role>;

interface Permission {
	dataModelsDocumentation: boolean;
	databasesStatus: boolean;
	databasesDocumentation: boolean;
	databasesLog: boolean;
	apiStatus: boolean;
	apiDocumentation: boolean;
	apiLog: boolean;
	plugsStatus: boolean;
	plugsDocumentation: boolean;
	plugsLog: boolean;
	scheduledJobsStatus: boolean;
	scheduledJobsDocumentation: boolean;
	scheduledJobsLog: boolean;
	membershipUsers: boolean;
	membershipRoles: boolean;
	systemConfiguration: boolean;
	systemLog: boolean;
}
