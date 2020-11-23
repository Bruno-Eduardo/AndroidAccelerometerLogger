# AndroidAccelerometerLogger
Simple app that dumps accelerometer values for android devices using react native and expo

# Branch structure
There are three important branches 
- backend: repo for node code that will run remotely and will receive the data from any smartphone
- frontend: repo for expo code that will build a malicious app that will leak the data to the remote server
- master: Should merge backend and frontend periodically when any of them is stable and tested

# Start a backend server
- Get a small remote server (Google Cloud and AWS have awesome services for this)
- 1 cpu, 1 Gb of RAM and 10 Gb of HD should be fine and cheap/free
- Open the port 3333 to your IP address (do not open for any IP address if you can’t block strangers requests. Implementation of this feature is scheduled)
- If you need the external IP address of your server run curl api.ipify.org
- Install git
- Install npm (current node version is )
- Install python3 and pip3
- Clone this repo and checkout to backend
- Change directory to backend and run npm install
- Run npm start and the server should be up

# Build locally your malicious app
- Make sure you have git and expo installed
- Make sure your device has the main expo app (available at Google Play)
- Clone this repo and checkout to mobile
- Make sure
- Run npm install
- Run expo start
- Scan the provided QR code with your expo app
- The app will try to send the data (accelerometer values) to the external IP set at src/services/api.js

## Generate a .apk
If you want a performatic app (to increase  sampling rate) you can follow Expo tutorial (https://docs.expo.io/distribution/building-standalone-apps/) to build an .apk and install it at your device.

# Disclaimer
Please keep in mind that this app is a PoC (proof of concept) that accelerometers are a dangerous source of information. Do not get data from anyone who does not know what is happening to their data or does not agree with their data usage.
