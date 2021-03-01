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


	sendMail( mail: MailDto ): Promise<boolean>
	{
		return this.mailer.sendMail( mail );
	}

	protected get mailer(): any
	{
		return this.getService( this.options.service.mailer );
	}
}
