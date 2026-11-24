// Passenger entry point for the Next.js standalone build.
process.env.NODE_ENV = "production";
process.env.HOSTNAME = "0.0.0.0";
require("./server.js");
