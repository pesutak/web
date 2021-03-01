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
export class MailController extends ApiController
{
	@Post()
	public sendMail( @Body() mail: MailDto ): Promise<{ status: boolean }>
	{
		return this.trycatch( () => MailService.instance.sendMail( mail ) );
	}
}
