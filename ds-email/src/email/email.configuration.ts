import { ConnectionConfiguration, IsArray, IsBoolean, IsNumber, IsObject, IsString, Required } from '@plugcore/core';
import { Address } from 'nodemailer/lib/mailer';
import * as SMTPConnection from 'nodemailer/lib/smtp-connection';
import * as tls from 'tls';

export class EmailAddress implements Address {

	@Required()
	@IsString()
	name: string;

	@Required()
	@IsString({ format: 'email' })
	address: string;

}

export class GmailApiConfiguration {

	@Required()
	@IsString()
	public clientEmail: string;

	@Required()
	@IsString()
	public privateKey: string;

	@Required()
	@IsString()
	public userId: string;

}

export class EmailDatasourceConfiguration implements ConnectionConfiguration, SMTPConnection.Options {

	@Required()
	@IsString({ pattern: 'email' })
	public type: 'email';

	/** If set, defines the 'from' field of all mails sent */
	@IsObject(EmailAddress)
	public defaultFrom?: EmailAddress;

	/** the hostname or IP address to connect to (defaults to ‘localhost’) */
	@IsString()
	public host?: string;

	/** the port to connect to (defaults to 25 or 465) */
	@IsNumber()
	public port?: number;

	/** defines authentication data */
	/* @IsObject() */ // TODO
	public auth?: SMTPConnection.AuthenticationType;

	/** defines if the connection should use SSL (if true) or not (if false) */
	@IsBoolean()
	public secure?: boolean;

	/** turns off STARTTLS support if true */
	@IsBoolean()
	public ignoreTLS?: boolean;

	/** forces the client to use STARTTLS. Returns an error if upgrading the connection is not possible or fails. */
	@IsBoolean()
	public requireTLS?: boolean;

	/** tries to use STARTTLS and continues normally if it fails */
	@IsBoolean()
	public opportunisticTLS?: boolean;

	/** optional hostname of the client, used for identifying to the server */
	@IsString()
	public name?: string;

	/** the local interface to bind to for network connections */
	@IsString()
	public localAddress?: string;

	/** how many milliseconds to wait for the connection to establish */
	@IsNumber()
	public connectionTimeout?: number;

	/** how many milliseconds to wait for the greeting after connection is established */
	@IsNumber()
	public greetingTimeout?: number;

	/** how many milliseconds of inactivity to allow */
	@IsNumber()
	public socketTimeout?: number;

	/** defines preferred authentication method, e.g. ‘PLAIN’ */
	@IsString()
	public authMethod?: string;

	/** defines additional options to be passed to the socket constructor, e.g. {rejectUnauthorized: true} */
	/* @IsObject() */ // TODO
	public tls?: tls.ConnectionOptions;

	@IsObject(GmailApiConfiguration)
	public gSuiteApi?: GmailApiConfiguration;

	@IsArray({ items: EmailAddress })
	public ccOnAllEmails?: EmailAddress[];

	@IsArray({ items: EmailAddress })
	public bccOnAllEmails?: Address[];

}

