import { request } from "express"


const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => {
                console.error("Async Handler Error:", error);
                res.status(500).json({
                    success: false,
                    message: error.message || "Internal Server Error",
                });
            });
    }
};


export { asyncHandler }




// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Internal Server Error',
//         });
        
//     }
// }