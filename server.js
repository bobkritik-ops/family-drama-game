const http=require('http'),fs=require('fs'),path=require('path'),WebSocket=require('ws');
const root=__dirname,server=http.createServer((req,res)=>{
 let u=decodeURIComponent(req.url.split('?')[0]);if(u==='/')u='/index.html';
 let f=path.join(root,u);if(!f.startsWith(root)){res.writeHead(403);return res.end()}
 fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end('404')}
 const ext=path.extname(f),types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.png':'image/png','.mp3':'audio/mpeg'};
 res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});res.end(d)})
});
const wss=new WebSocket.Server({server});
wss.on('connection',ws=>ws.on('message',msg=>{for(const c of wss.clients)if(c!==ws&&c.readyState===WebSocket.OPEN)c.send(msg.toString())}));
server.listen(8080,'0.0.0.0',()=>console.log('GAME: http://localhost:8080'));
