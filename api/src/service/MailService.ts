import { Logger } from '@excalibur-enterprise/liqd-logger';
import { MailDto } from '../dtos/MailDto';
import { ApiServiceConfig } from '../models/ApiServiceConfig';

declare const LOG: Logger;

export class MailService
{
	static instance: MailService;

	static createInstance( options: ApiServiceConfig, getService: any ): void
	{
		this.instance = new MailService( options, getService );
	}

	protected constructor( protected options: ApiServiceConfig, protected getService: any )
	{
		LOG.info( `Service '${this.constructor.name}' initialized` );
	}

	async sendMail( data: MailDto ): Promise<void>
	{
		const result = await this.mailerService.sendWebFormContent(
			this.options.webFormReceiver,
			data.email,
			data.message
		);

		if ( !result )
		{
			throw new Error( 'Sending email failed' );
		}
	}

	protected get mailerService(): any
	{
		return this.getService( this.options.service.mailer );
	}
}
