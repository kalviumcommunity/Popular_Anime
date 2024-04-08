const Joi = require("joi");

const validator = (schema) =>(payload)=>
    schema.validate(payload,{abortEarly:false});

    const animeSchema = Joi.object({
        anime: Joi.string().required(),
        authorname: Joi.string().required(),
        start_date: Joi.string().required(),
        theme: Joi.string().required(), 
        character: Joi.string().required(), 
        image_url: Joi.string(),
        updated_user: Joi.string()
    })

exports.validateAnime = validator(animeSchema)