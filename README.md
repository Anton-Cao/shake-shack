# How to run
First, `cd client` and run `yarn install`. Then run `yarn start` to start the frontend.

Then, in a separate terminal window, `cd ../server` and run `npm install`. 
Then run `npm start` to start the backend.

Finally, go to `localhost:3000` to see the website.

## Installing stuff
Install packages in the frontend using `yarn add <package>` in the `client/` directory.

Install packages in the backend using `npm install <package>` in the `server/` directory.

## Database stuff
If you're working with mongo, run `mongod` in a separate terminal window before
starting the backend. Data will be saved into a database called `shake-shack`.
