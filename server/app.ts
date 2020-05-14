import express, { Application } from 'express';
import path from 'path';
import loggerMiddleware from './middleware/logger';
import membersApi from './routes/api/members';
import messageApi from './routes/api/messages';
import userApi from './routes/api/users';

const PORT = process.env.PORT || 5000;
const app: Application = express();

// Setup middlewares
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set API routes
app.use('/api/members', membersApi);
app.use('/api/messages', messageApi);
app.use('/api/users', userApi);

// Start listening to port
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
