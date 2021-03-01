export interface ApiServiceConfig
{
	router: string;
	name: string;
	verboseDebug: boolean;
	webFormReceiver: string;

	server: {
		port: number;
		version: string;
	};

	service?:
	{
		mailer: string;
	}
}
