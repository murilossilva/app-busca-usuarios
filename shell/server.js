const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/users') {
    const dbPath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'E-mail é obrigatório' });
    }

    const emailExists = db.users.some(user => user.email === email);
    if (emailExists) {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }
  }

  next();
};