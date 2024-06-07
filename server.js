const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Define the proto file path
const PROTO_PATH = path.join(__dirname, 'protos', 'hello.proto');

// Load the protobuf
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

// Implement the SayHello function
function sayHello(call, callback) {
  console.log("received request for sayHello method");
  const reply = { message: `Hello ${call.request.name}` };
  callback(null, reply);
}

// Implement the SayHelloStreaming function
function sayHelloStreaming(call) {
  console.log("received request for sayHello method");
  const name = call.request.name;
  let count = 0;
  const interval = setInterval(() => {
    if (count < 10) {
      const reply = { message: `Hello ${name} - Message ${count + 1}` };
      call.write(reply);
      count++;
    } else {
      clearInterval(interval);
      call.end();
    }
  }, 1000);
}

// Start the gRPC server
function main() {
  const server = new grpc.Server();
  server.addService(helloProto.Greeter.service, { SayHello: sayHello, SayHelloStreaming: sayHelloStreaming});
  const bindAddress = '0.0.0.0:50051';
  server.bindAsync(bindAddress, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server running at ${bindAddress}`);
  });
}

main();

