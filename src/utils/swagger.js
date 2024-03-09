import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions = swaggerJSDoc({
    definition:{
        openapi: '3.0.1',
        info:{
            version: '1',
            title: 'Eccomerce de coderhouse',
            description: 'Documentacion para el proyecto de eccomerce de coderhouse'
        }
    },
    apis:['./docs/**/*.yaml']
})
