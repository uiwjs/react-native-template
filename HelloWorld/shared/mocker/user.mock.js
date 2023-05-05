module.exports = {
  'POST /api/login': (req, res) => {
    let { username, password } = req.body;
    if (username === 'admin' && password === 'admin!') {
      return res.status(201).json({
        message: 'Login successful!',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        data: {
          nikename: 'Hello App',
        },
      });
    }
    res.status(401).json({
      message: 'username or password is error.',
    });
  },
  'POST /api/logout': {
    message: 'Logout successful!',
  },
  'GET /api/auth': {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    // token: '',
  },
};
