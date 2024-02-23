function validateApiKey(req, res, next) {
    const apiKeyHeader = req.headers['x-api-key'];

    if (!apiKeyHeader) {
        return res.status(401).json({ error: 'API key is missing' });
    }

    const apiKey = process.env.API_KEY;
    console.log(apiKey);
    console.log(apiKeyHeader)
    if (apiKeyHeader !== apiKey) {
        return res.status(403).json({ error: 'Invalid API key' });
    }

    next();
}

export default validateApiKey;