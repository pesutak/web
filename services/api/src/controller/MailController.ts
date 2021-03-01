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
import { MailDto } from '../dtos/MailDto';

@Route( 'api/mails' )
@Tags( 'mail' )
export class MailController extends ApiController
{
	@Post()
	public sendMail( @Body() mail: MailDto ): Promise<void>
	{
		return this.trycatch( () => MailService.instance.sendMail( mail ) );
	}
}
