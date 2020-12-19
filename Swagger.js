const swaggerJSDoc = require("swagger-jsdoc");

const spec = swaggerJSDoc({
	swaggerDefinition: {
		info: {
			title: "API - Backend Festival Digital",
			version: "1.0.0",
			description: "API para parte de jogo do Festival Digital"
		},
		produces: [ "application/json" ],
		consumes: [ "application/json" ],
		securityDefinitions: {
			jwt: {
				type: "apiKey",
				name: "Authorization",
				in: "header"
			}
		},
		security: [ { jwt: [] } ]
	},
	apis: [ "services/*.js" ]
});
module.exports = spec;
