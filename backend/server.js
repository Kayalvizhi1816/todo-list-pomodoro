const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===== MongoDB Connection =====
mongoose.connect('mongodb://127.0.0.1:27017/todo_pomodoro', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ MongoDB Connected');

    // ===== Routes =====
    const authRoutes = require('./routes/authRoutes');
    const taskRoutes = require('./routes/taskRoutes');

    app.use('/api/auth', authRoutes);
    app.use('/api/tasks', taskRoutes);

    // ===== Test Route =====
    app.get('/', (req, res) => {
        res.send('Hello from backend server 🚀');
    });

    // ===== Start Server =====
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => console.log('❌ MongoDB connection error:', err));
// cd backend
// npm start