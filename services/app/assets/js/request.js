function DOM_awaitRequest( method, url, data, options = {} )
{
	return new Promise( ( resolve, reject ) =>
	{
		DOM_request( method, url, data, ( response ) =>
		{
			resolve( response );
		}, {
			...options, reject
		} )
	} )
}

function DOM_request( method, url, data, callback, options = {} )
{
	var methods = {
		'PUT': 'application/json', //application/octet-stream | application/x-www-form-urlencoded;charset=UTF-8
		'GET': '',
		'POST': 'application/json',
		'PATCH': 'application/json',
		'DELETE': 'application/json'
	}

	if ( Object.keys( methods ).indexOf( method ) === -1 )
	{
		console.log( 'Unsupported method ' + method );
		return null;
	}
	if ( typeof data == 'function' )
	{
		callback = data; data = {};
	}

	let requestOptions = {
		method,
		credentials: 'include',
		headers: new Headers( {
			'Content-Type': methods[ method ],
			'Cache-Control': 'no-cache',
			'x-requested-with': 'XMLHttpRequest'
		} )
	};

	if ( typeof options.signal !== 'undefined' )
	{
		requestOptions[ 'signal' ] = options.signal;
	}

	if ( method === 'GET' )
	{
		if ( data && Object.keys( data ).length > 0 )
		{
			let params = '';
			for ( let param in data )
			{
				params += ( ( params.length ) ? '&' : '' ) + param + '=' + encodeURIComponent( ( typeof data[ param ] != 'string' ? JSON.stringify( data[ param ] ) : data[ param ] ) );
			}
			url += '?' + params;
		}
	}
	else
	{
		requestOptions.body = JSON.stringify( data );
	}

	if ( options.history )
	{
		DOM_History.push( 'window', '', url );
	}

	fetch( url, requestOptions )
		.then( async ( response ) =>
		{
			let body = '';
			if ( response.headers.get( 'Content-Type' ).indexOf( 'application/json' ) > -1 )
			{
				body = response.json();
			}
			else
			{
				body = response.text().then( text =>
				{
					if ( text[ 0 ] === '{' && text[ text.length - 1 ] === '}' )
					{
						try
						{
							return JSON.parse( text );
						}
						catch ( e )
						{
							return text;
						}
					}
					return text;
				} )
			}

			return {
				status: response.status,
				body: await body
			};
		} )
		.then( ( response ) =>
		{
			if ( response.status === 401 )
			{
				location.reload(); /*Unauthorized*/
			}
			callback( response );
		} )
		.catch( e =>
		{
			if ( typeof options.reject != 'undefined' )
			{
				options.reject( e )
			}
			//console.log( e, 'Exception' );
		} );
}