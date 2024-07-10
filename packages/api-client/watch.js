const { exec } = require("child_process");
const chokidar = require("chokidar");
const { promisify } = require("util");

const execA = promisify(exec);

let watcher;

let generating = false;

const generate = async () => {
  if (generating) {
    return;
  }
  generating = true;
  try {
    // Wait for the server to be online

    await execA("npx wait-on http://backend:80/docs-json");

    await execA(
      `npx openapi-generator-cli generate -i http://backend:80/docs-json -g typescript-fetch -o /src/packages/api-client --additional-properties=typescriptThreePlus=true,supportsES6=true,withInterfaces=true,npmName="api-client",npmVersion="1.0.0"`
    );
    await execA(
      `cd /src/packages/api-client && npm run build && chmod -R 777 src`
    );
  } catch (error) {
    console.error(error);
  } finally {
    generating = false;
  }
};

const watchAndGenerateApiClient = () => {
  if (watcher) {
    return;
  }

  watcher = chokidar.watch(
    [
      "/src/apps/backend/src/**/*.ts",
    ],
    { ignored: /node_modules/ }
  );

  watcher.on("change", generate);
};

generate();
watchAndGenerateApiClient();
