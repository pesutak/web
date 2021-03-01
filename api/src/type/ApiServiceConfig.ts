export interface ApiServiceConfig
{
	router: string;
	name: string;
	verboseDebug: boolean;

	server: {
		port: number;
		version: string;
	};

	service?:
	{
		mailer: string;
	}
}
