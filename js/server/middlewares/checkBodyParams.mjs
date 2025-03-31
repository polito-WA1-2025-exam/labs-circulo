export async function checkParams(params, res, paramList) {
    for (const param of paramList) {
        if (!params[param]) {
            return res.status(400).json({ error: `Missing parameter: ${param}` });
        }
    }
    return true;
}