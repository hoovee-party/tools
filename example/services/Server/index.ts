class Server {
  port: number;
  host: string;
  color: string;

  constructor(host: string, port: number, color: string) {
    this.port = port;
    this.host = host;
    this.color = color;
  }

  start() {
    /*
      http.createServer(function (req, res) {
        res.write(`Color is ${this.color}!`);
        res.end();
      }).listen(this.port);
    */
  }
}

export default Server;
