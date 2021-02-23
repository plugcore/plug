import { Configuration, DataSource, InjectConfiguration, InjectConnection, ObjectUtils } from '@plugcore/core';
import * as mail from 'nodemailer';
import * as SMTPConnection from 'nodemailer/lib/smtp-connection';
import { Readable } from 'stream';
import { EmailAddress, EmailDatasourceConfiguration, GmailApiConfiguration } from './email.configuration';

@DataSource({ type: 'email' })
export class EmailDataSource {

	private dsConfiguration: EmailDatasourceConfiguration;
	private transport: mail.Transporter;
	private defaultFrom: EmailAddress;

	constructor(
		@InjectConfiguration() private configuration: Configuration,
		@InjectConnection() private connection?: string
	) {
		if (this.connection) {
			this.dsConfiguration = this.configuration.getConnectionConfiguration(
				EmailDatasourceConfiguration, this.connection);


			if (this.dsConfiguration.gSuiteApi) {
				this.createGmailTransport(this.dsConfiguration.gSuiteApi);
			} else {
				this.createNormalTransport(this.dsConfiguration);
			}

			if (this.dsConfiguration.defaultFrom) {
				this.defaultFrom = ObjectUtils.deepClone(this.dsConfiguration.defaultFrom);
			}
		}
	}

	/**
	 * Sends mails with thisconfiguration https://nodemailer.com/message/
	 * Default 'from' can be configured
	 * @param options
	 */
	public async sendMail(options: mail.SendMailOptions): Promise<mail.SentMessageInfo> {

		if (!this.dsConfiguration) {
			throw new Error('Invalid email configuration');
		}
		if (this.defaultFrom) {
			options.from = this.defaultFrom;
		}

		if (this.dsConfiguration.ccOnAllEmails) {
			options.cc = options.cc || ObjectUtils.deepClone(this.dsConfiguration.ccOnAllEmails || {}) as any;
		}
		if (this.dsConfiguration.bccOnAllEmails) {
			options.bcc = options.bcc || ObjectUtils.deepClone(this.dsConfiguration.bccOnAllEmails || {}) as any;
		}

		return this.transport.sendMail(options);

	}

	private async createNormalTransport(cfg: SMTPConnection.Options) {
		this.transport = mail.createTransport(cfg);
	}

	private async createGmailTransport(apiCfg: GmailApiConfiguration) {

		const { google } = require('googleapis');
		const gmail = google.gmail('v1');

		const transport: mail.Transport = {
			name: 'gsuiteemail',
			version: '0.1.0',
			send: (mail, callback) => {
				this.sendEmail(mail.message.createReadStream(), apiCfg, google, gmail, callback);
			}
		};

		this.transport = mail.createTransport(transport);

	}

	private async sendEmail(
		stream: Readable, apiCfg: GmailApiConfiguration,
		google: any, gmail: any,
		callback: (err: Error | null, info: mail.SentMessageInfo) => void
	) {

		try {
			const base64String = await this.getStream(stream);
			const jwtClient = new google.auth.JWT(
				apiCfg.clientEmail,
				null,
				apiCfg.privateKey,
				['https://www.googleapis.com/auth/gmail.send'],
				apiCfg.userId // User who will be impersonated with this JWT client
			);

			const params = {
				auth: jwtClient,
				userId: 'me',
				resource: {
					raw: base64String
				}
			};

			const result = await gmail.users.messages.send(params);

			callback(null, result);
		} catch (error) {
			callback(error, {});
		}

	}

	private async getStream(stream: Readable) {
		return new Promise((resolve, reject) => {
			const chunks: any[] = [];

			stream.on('data', chunk => chunks.push(chunk));
			stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
			stream.on('error', error => reject(error));
		});
	}

}
