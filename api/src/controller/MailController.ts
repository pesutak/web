/* eslint-disable new-cap */
import
{
	Body,
	Post,
	Route,
	Tags
} from 'tsoa';
import { ApiController } from './ApiController';
import { MailService } from '../service/MailService';
import { MailDto } from '../type/MailDto';

@Route( 'api/mails' )
@Tags( 'mail' )
export class UserController extends ApiController
{
	@Post( )
	public findAllAsCodelist( @Body() mail: MailDto ): Promise<boolean>
	{
		return this.trycatch( () => MailService.instance.sendMail( mail ) );
	}
}
