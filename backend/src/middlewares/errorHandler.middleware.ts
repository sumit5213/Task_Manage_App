import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config"
import { AppError } from "../utils/appError"
import { z, ZodError } from "zod"
import { appendFile } from "fs";
import { ErrorCodeEnum } from "../enums/error-code.enum"

const formatZodError = (res: Response, error: z.ZodError) => {
    const errors = error?.issues?.map((err) => ({
        feild: err.path.join("."),
        message: err.message
    }));
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "validation failed",
        error: errors,
        errorCode: ErrorCodeEnum.VALIDATION_ERROR
    })
}


export const errorHandler: ErrorRequestHandler = (
    error, req, res, next): any => {
    console.log(`error occured in ${req.path}`, error)

    if (error instanceof SyntaxError) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            message: " invalid json format. please check your request body"
        }

        )
    }

    if (error instanceof ZodError) {
        return formatZodError(res, error)
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode,
        })
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error?.message || "Unknown error occured"
    })

}

