/**
* PHP Email Form Validation - v3.0
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
( function ()
{
	"use strict";

	let forms = document.querySelectorAll( '.php-email-form' );

	forms.forEach( function ( form )
	{
		form.addEventListener( 'submit', function ( event )
		{
			event.preventDefault();

			let formData = {
				email: '',
				message: ''
			}
		
			for ( let property in formData )
			{
				formData[ property ] = form.elements[ property ].value
			}

			let thisForm = this;

			let action = MAIL_URL;
			let recaptcha = thisForm.getAttribute( 'data-recaptcha-site-key' );

			if ( !action )
			{
				displayError( thisForm, 'The form action property is not set!' )
				return;
			}
			thisForm.querySelector( '.loading' ).classList.add( 'd-block' );
			thisForm.querySelector( '.error-message' ).classList.remove( 'd-block' );
			thisForm.querySelector( '.sent-message' ).classList.remove( 'd-block' );

			if ( recaptcha )
			{
				if ( typeof grecaptcha !== "undefined" )
				{
					grecaptcha.ready( function ()
					{
						try
						{
							grecaptcha.execute( recaptcha, { action: 'php_email_form_submit' } )
								.then( token =>
								{
									formData.set( 'recaptcha-response', token );
									php_email_form_submit( thisForm, action, formData );
								} )
						} catch ( error )
						{
							displayError( thisForm, error )
						}
					} );
				} else
				{
					displayError( thisForm, 'The reCaptcha javascript API url is not loaded!' )
				}
			} else
			{
				php_email_form_submit( thisForm, action, formData );
			}
		} );
	} );

	function php_email_form_submit( thisForm, action, formData )
	{
		DOM_awaitRequest( 'POST', action, formData )
			.then( response =>
			{
				thisForm.querySelector( '.loading' ).classList.remove( 'd-block' );
				if ( response.status === 200 )
				{
					thisForm.querySelector( '.sent-message' ).classList.add( 'd-block' );
					thisForm.reset();
				} else
				{
					console.log(`Form submission failed:`, response);
					throw new Error( 'Form submission failed' );
				}
			} )
			.catch( ( error ) =>
			{
				displayError( thisForm, error );
			} );
	}

	function displayError( thisForm, error )
	{
		thisForm.querySelector( '.loading' ).classList.remove( 'd-block' );
		thisForm.querySelector( '.error-message' ).innerHTML = error;
		thisForm.querySelector( '.error-message' ).classList.add( 'd-block' );
	}

} )();
