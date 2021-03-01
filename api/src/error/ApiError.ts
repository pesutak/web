import { ErrorModel, ErrorType, Logger, SimpleType, TypedLoggerError } from '@excalibur-enterprise/liqd-logger';
import { StatusCodes } from 'http-status-codes';

declare const LOG: Logger;

export enum EApiError
{
	/**
	 * @param msg of error
	 */
	UNEXPECTED_ERROR = -505
}

const errorMessages: ErrorType =
{

	[ EApiError.UNEXPECTED_ERROR ]: {
		message: 'Unexpected server error',
		data: '{0}'
	} as ErrorModel
};

const httpCodeMapping = {
	[ EApiError.UNEXPECTED_ERROR ]: StatusCodes.INTERNAL_SERVER_ERROR
};

export class ApiError extends TypedLoggerError<EApiError>
{
	constructor( code: EApiError, params?: SimpleType[] )
	{
		super( code, params ?? [], errorMessages );
		this.httpCode = httpCodeMapping[ code ];

		LOG.error( this );
	}
}
