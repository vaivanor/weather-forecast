import Joi from "joi";

const nameRegex = /^[A-Za-zÀ-žŠšŽžŲųŪūĮįĘęČč\s'-]+$/;

export const citySchema = Joi.object({
  city: Joi.string().trim().min(1).pattern(nameRegex).required().messages({
    "string.base": "City must be a string.",
    "any.required": "City is required.",
    "string.empty": "City cannot be empty.",
    "string.pattern.base": "City must contain only valid letters.",
  }),
});
