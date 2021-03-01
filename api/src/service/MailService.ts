import { Logger } from '@excalibur-enterprise/liqd-logger';
import { MailDto } from '../type/MailDto';
import { ApiServiceConfig } from '../type/ApiServiceConfig';

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


	async sendMail( mail: MailDto ): Promise<{ status: boolean }>
	{
		const result = await this.mailer.sendWebFormContent( this.options.webFormReceiver, mail.email, mail.message );

		if ( !result )
		{
			throw new Error( 'Sending email failed' );
		}

		return {
			status: result
		};
	}

	protected get mailer(): any
	{
		return this.getService( this.options.service.mailer );
	}
}
