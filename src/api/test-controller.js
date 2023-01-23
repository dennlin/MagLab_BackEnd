// The logic to application logic
export default class TestController {
    echo(req, res, next) {
        try {
            const data = {
                req: req.body
            };
            res.json(data);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}