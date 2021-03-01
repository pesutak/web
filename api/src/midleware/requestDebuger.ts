import { Obj } from '@excalibur-enterprise/utils-js';
import { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';

export default function (
	req: ExRequest,
	res: ExResponse,
	next: NextFunction
): ExResponse | void
{
	Obj.inspect( 'method', req.method );
	Obj.inspect( 'path', req.path );
	Obj.inspect( 'cookies', req.cookies ?? '' );
	// Obj.inspect( 'userID', UserContext.get() ); // since this is placed before routes ( before actual auth handler )
	// we don't have user context set yet and this cannot be placed after routes, or it won't be called
	console.log( '---------------------------------------------------------------------' );

	return next();
}
