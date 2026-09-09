import {createOrderSchema} from "../../front-part/src/js/schemas/createOrderSchema.js";
export default function FormMiddleware(req, res, next) {
    const result = createOrderSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: 'Invalid request data',
            errors: data.error.flatten()
        })

    }
     req.body=result.data;
    next()
}
