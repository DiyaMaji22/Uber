const http=require('http');
const app= require('./app');
const port = parseInt(process.env.PORT, 10) || 5000;

function startServer(p, triesLeft = 5) {
    const server = http.createServer(app);

    server.on('error', (error) => {
        if (error && error.code === 'EADDRINUSE' && triesLeft > 0) {
            console.warn(`Port ${p} in use, trying port ${p + 1} (${triesLeft - 1} attempts left)`);
            // try next port
            startServer(p + 1, triesLeft - 1);
            return;
        }
        console.error('Server error:', error);
        process.exit(1);
    });

    server.listen(p, () => {
        console.log(`This server is running on port ${p}`);
    });
}

startServer(port);