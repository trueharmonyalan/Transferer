export function keyValidtorController(validator) {
    return async function (req, res) {
        const receivedKey = req.body;
        try {
            if (!receivedKey?.key) {
                receivedKey.error = "Key is not given or expired";
                return res.status(404).json({ error: receivedKey.error });
            }
            if (receivedKey.key.length < 5) {
                receivedKey.error = "unxpected format";
                return res.status(404).json({ error: receivedKey.error });
            }
            const hasSymbol = /[^\w\s]/.test(receivedKey.key);
            if (hasSymbol) {
                receivedKey.error = "Key is not valid and it has unexpected characters";
                return res.status(404).json({ error: receivedKey.error });
            }
            const isValid = await validator.dbKeyCheck(receivedKey.key);
            console.log(isValid);
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
        return res.json({ success: receivedKey.key });
    };
}
