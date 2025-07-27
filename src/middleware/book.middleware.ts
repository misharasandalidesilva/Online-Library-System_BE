// @ts-ignore
import { plainToClass } from "class-transformer";
// @ts-ignore
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware<T>(type: new () => T) {
    return (req: Request, res: Response, next: NextFunction) => {
        const dtoObj = plainToClass(type, req.body);

        validate(dtoObj, { skipMissingProperties: true }).then(
            (errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const messages = errors
                        .map((error) =>
                            Object.values(error.constraints ?? {}).join(", ")
                        )
                        .join("; ");
                    res.status(400).json({ message: messages });
                } else {
                    next();
                }
            }
        );
    };
}
