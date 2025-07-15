module.exports = (req, res, next) => {
  const fs = require('fs');
  const path = require('path');

  if (req.method === 'POST' && req.path === '/users') {
    const dbPath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'E-mail é obrigatório' });
    }

    const emailExists = db.users.some(user => user.email === email);
    if (emailExists) {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }

    const maxId = Math.max(...db.users.map(u => parseInt(u.id) || 0));
    const newId = (maxId + 1).toString();

    req.body = {
      id: newId,
      name,
      email
    }
  }

  next();
};