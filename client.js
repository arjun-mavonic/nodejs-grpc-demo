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

// Create a stream to receive multiple responses
const stream = client.SayHelloStreaming({ name: 'World' });

// Listen for 'data' event to receive each response
stream.on('data', (response) => {
  console.log('Greeting:', response.message);
});

// Listen for 'end' event to know when the stream has ended
stream.on('end', () => {
  console.log('Stream ended');
});

// Listen for 'error' event to handle any errors
stream.on('error', (err) => {
  console.error(err);
});

