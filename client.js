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

// Create a client
const client = new helloProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

// Call the SayHello function
client.SayHello({ name: 'World' }, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Greeting:', response.message);
});

