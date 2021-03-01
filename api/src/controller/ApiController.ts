import { Logger } from '@excalibur-enterprise/liqd-logger';
import { Controller } from 'tsoa';
import { ApiError, EApiError } from '../error/ApiError';

declare const LOG: Logger;

export abstract class ApiController extends Controller
{
	protected trycatch<T>( fnc: () => Promise<T> ): Promise<T>
	{
		try
		{
			return fnc();
		}
		catch ( error )
		{
			LOG.error( error );
			console.log( error );

			throw new ApiError( EApiError.UNEXPECTED_ERROR, [ error.message ] );
		}
	}
}
