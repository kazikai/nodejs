cd mongodb-osx-x86_64-3.0.7/bin
./mongod --dbpath db --port 12700 &
cd ../../
node server.js >> server.log 2>&1 &
