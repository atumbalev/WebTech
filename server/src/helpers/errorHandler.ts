import {Request, Response} from 'express';

const errorCatch = (middlewareId: (req: Request, res: Response, next?:any) => void) => {
    const handleError = async (req: Request, res: Response, next:any) => {
        try {
            await middlewareId(req, res, next);
        } catch(error) {
            res.status(200).json(error);
        }
    };
    return handleError;
};

export default errorCatch;