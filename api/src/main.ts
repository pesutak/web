import dotenv from 'dotenv';

dotenv.config();

import path from 'path';
import express, { Response as ExResponse, Request as ExRequest } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { StatusCodes as HttpStatusCodes } from 'http-status-codes';

import { RegisterRoutes as registerRoutes } from './routes';
import requestDebuger from './midleware/requestDebuger';
import errorHandler from './midleware/errorHandler';
import routeNotFound from './midleware/routeNotFound';

import { Config } from '@excalibur-enterprise/utils-js';
import { Logger, LoggerConfigModel, printError } from '@excalibur-enterprise/liqd-logger';

import { ApiService } from './service/ApiService';
import { ApiServiceConfig } from './models/ApiServiceConfig';
import { Options } from './options';

declare const global
{
	LOG: Logger;
}
declare const LOG: Logger;

async function initLogger(): Promise<void>
{
	const config = await Config.readJson<LoggerConfigModel>( Options.LOGGER_CONFIG_PATH );

	const logger = new Logger( config );

	global.LOG = logger;
}

function initServer( port: number ): express.Express
{
	const app = express();

	app.use( cors() );
	app.use( bodyParser.json() );
	app.use( bodyParser.urlencoded( { extended: true } ) );
	app.use( requestDebuger ); // this works only here, not after registerRoutes
	app.use( '/docs', swaggerUi.serve, async ( request: ExRequest, response: ExResponse ) =>
	{
		try
		{
			const swaggerFilePath = path.join( __dirname, '../config', 'swagger.json' );

			LOG.debug( `Loading swagger configuration from '${swaggerFilePath}'` );

			const fileContent = await Config.readJson( swaggerFilePath );

			LOG.debug( 'Swagger config loaded successfully' );

			const html = swaggerUi.generateHTML( fileContent );

			LOG.debug( 'Swagger documentation generated' );

			response.status( HttpStatusCodes.OK );
			response.write( html );

			LOG.debug( 'Swagger documentation sent in response' );
		}
		catch ( error )
		{
			LOG.error( 'Serving \'/docs\' route raised error', error );

			response.status( HttpStatusCodes.INTERNAL_SERVER_ERROR );
			response.write( error.message );
		}

		response.end();
	} );

	registerRoutes( app );

	app.use( errorHandler );
	app.use( routeNotFound );

	app.listen( port, () =>
	{
		global.LOG.info( `API service server listening on port ${port}` );
	} );

	return app;
}

function initService( config: ApiServiceConfig ): Promise<void>
{
	const api = new ApiService( config );

	return api.initialize();
}

async function main()
{
	try
	{
		const schemePath = path.join(__dirname, '../schemes/ApiServiceConfig.scheme.json');
		const scheme = await Config.readJson( schemePath );
		const config = await Config.readJson<ApiServiceConfig>( Options.API_CONFIG_PATH, scheme );

		await initLogger();
		await initService( config );

		initServer( config.server.port || 3001 );
	}
	catch ( error )
	{
		printError( error.stack ?? error.toString() );

		process.exit( 1 );
	}
}

main();
