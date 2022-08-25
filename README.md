# marvel-catalog
Simple Website for displaying a listing of marvel characters and their details gotten from the public Marvel Developers API.
## File/System Structure
 - marvel-backend
	 - Based on: 
		 - Lumen 9.0
		 - PHP 8.0
	 - Using:
		 - VHosts: 
			 - Domain: https://marvel.local
			 - SSL: Implemented creating SSL Certs using [mkcert](https://github.com/FiloSottile/mkcert)
	 - Considerations
		 - Edit .env APP_URL variable to define the backend endpoints URL 
 - marvel-frontend
	 - Based on:
		 - React 18.2.0
		 - MUI 5.10.2
	 - Using:
		 - Domain: localhost:3000
	 - Considerations
		 - Edit config.json on [marvel-frontend/src/config/config.json](https://github.com/JavQuijano/marvel-catalog/blob/main/marvel-frontend/src/config/config.json) for defining the URL of the backend endpoints
