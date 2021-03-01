import { Response as ExResponse, Request as ExRequest } from 'express';

export default function ( req: ExRequest, res: ExResponse ): ExResponse | void
{
	res
		.status( 404 )
		.send( {
			code: 404,
			message: 'Route Not Found',
			data: `Route '${req.originalUrl}' not found`,
		} );
}
