document
	.getElementById( "contact-form" )
	.addEventListener( 'submit', function ( event )
	{
		event.preventDefault();
		sendMail( this );

		return false;
	} );

function sendMail( form )
{
	let schema = {
		email: '',
		message: ''
	}
	let data = {};

	for ( let property in schema )
	{
		data[ property ] = form.elements[ property ].value
	}

	console.log( data );
	// form.querySelector( '#username' ).removeClass( 'error' ); form.querySelector( '#password' ).removeClass( 'error' );
	// if ( form.querySelector( '#submit' ).hasClass( 'loader' ) ) { return false; }
	// if ( form.querySelector( '#username' ).value == '' ) { setError( 'empty_name' ); form.querySelector( '#username' ).addClass( 'error' ); return false; }
	// if ( form.querySelector( '#password' ).value == '' ) { setError( 'empty_password' ); form.querySelector( '#password' ).addClass( 'error' ); return false; }

	// form.querySelector( '#submit' ).addClass( 'loader' );
	DOM_request( 'POST', MAIL_URL, data, ( e ) => console.log( 'success?', e ) );
};