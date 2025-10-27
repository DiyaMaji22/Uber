const http=require('http');
const app= require('./app');
const port=process.env.PORT || 3000;

const server=http.createServer(app);

server.on('error', (error) => {
    console.error('Server error:', error);
});

server.listen(port,()=>{
    console.log(`This server is running on port ${port}`);
});