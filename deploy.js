#!/home/sifear/.nvm/versions/node/v21.2.0/bin/node

const fs = require("node:fs");
const { exec } = require("node:child_process");

regepx = '{"version":"0.0.([0-9]+)"}';
content = fs.readFileSync("/etc/nginx/nginx.conf", { encoding: "utf-8" });

version = content.match(regepx)[1];
new_version = +version + 1;
console.log(`Deploying version ${new_version}`);

exec(
   `sudo sed -i 's/0.0.${version}/0.0.${new_version}/' /etc/nginx/nginx.conf`,
   (error, stdout, stderr) => {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
   }
);

exec(
   `sudo sed -i 's/0.0.${version}/0.0.${new_version}/' src/components/App/Main/Main.tsx`,
   (error, stdout, stderr) => {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
   }
);
exec("npm run build");
exec("sudo nginx -s stop");
exec("sudo nginx");
