
# gRPC Hello World

This is a simple gRPC server implementation in Node.js that demonstrates how to implement a basic `SayHello` route. The server responds with a greeting message when a client sends a request.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [Running the Client](#running-the-client)
- [Project Structure](#project-structure)
- [Protocol Buffers Definition](#protocol-buffers-definition)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).

## Installation

1. Clone the repository:

    \`\`\`sh
    git clone https://github.com/arjun-mavonic/nodejs-grpc-demo.git
    cd nodejs-grpc-demo
    \`\`\`

2. Install the dependencies:

    \`\`\`sh
    npm install
    \`\`\`

## Usage

### Running the Server

To start the gRPC server, run the following command:

\`\`\`sh
node server.js
\`\`\`

You should see the following output indicating that the server is running:

\`\`\`
Server running at 0.0.0.0:50051
\`\`\`

### Running the Client

To test the server, you can use the provided client implementation. In a new terminal, run:

\`\`\`sh
node client.js
\`\`\`

You should see the following output:

\`\`\`
Greeting: Hello World
\`\`\`

## Project Structure

The project structure is as follows:

\`\`\`
grpc-hello-world/
├── node_modules/
├── protos/
│   └── hello.proto
├── client.js
├── server.js
├── package.json
└── README.md
\`\`\`

- `protos/hello.proto`: The Protocol Buffers definition file for the gRPC service.
- `server.js`: The implementation of the gRPC server.
- `client.js`: A simple gRPC client to test the server.
- `package.json`: The project configuration file.
- `README.md`: This file.

## Protocol Buffers Definition

The `hello.proto` file defines the gRPC service and messages:

\`\`\`proto
syntax = "proto3";

package hello;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
\`\`\`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
