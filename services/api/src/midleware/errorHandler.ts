import { Logger, LoggerError } from '@excalibur-enterprise/liqd-logger';
import { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import { ValidateError } from 'tsoa';

declare const LOG: Logger;

export default function (
	err: unknown,
	req: ExRequest,
	res: ExResponse,
	next: NextFunction
): ExResponse | void
{
	if ( err instanceof ValidateError )
	{
		LOG.warning( `Caught Validation Error for ${req.path}:`, err.fields );

		return res
			.status( 422 )
			.json( {
				code: 422,
				message: 'Validation Failed',
				data: err?.fields,
			} );
	}
	if ( err instanceof LoggerError )
	{
		return res
			.status( err.httpCode ?? 500 )
			.json( {
				code: err.code,
				message: err.message,
				data: err.data,
			} );
	}
	if ( err instanceof Error )
	{
		return res
			.status( 500 )
			.json( {
				code: 500,
				message: 'Internal Server Error',
				data: err.message
			} );
	}
	if ( err && typeof err === 'object'
		&& ( err as any ).code
		&& ( err as any ).message
		&& ( err as any ).data )
	{
		return res.status( 500 ).json( err );
	}

	return next();
}
