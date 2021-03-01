import { WebSocketClient, ClusterOptions } from '@excalibur-enterprise/cluster';
import { Logger } from '@excalibur-enterprise/liqd-logger';

import { ApiServiceConfig } from '../type/ApiServiceConfig';

import { MailService } from '../service/MailService';

declare const LOG: Logger;

export class ApiService extends WebSocketClient
{
	constructor( private config: ApiServiceConfig )
	{
		super( config.router, config.name, null, {
			verboseDebug: false,
			verboseTrace: false
		} as ClusterOptions );

		LOG.info( 'API service started' );
	}

	public initialize(): Promise<void>
	{
		MailService.createInstance( this.config, this.getService.bind( this ) );

		return Promise.resolve();
	}
}
