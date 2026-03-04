# Authenticating Users

We'll use this code as a starting point for exploring how to authenticate users within a React app.

The first time you run this app, make sure to run `npm install` first, to install needed dependencies.  Then, to run the app and see it in your browser, you can run
```
npm run dev
```
This will run the app using Vite's development server.  You should be able to visit the running app by viewing [http://localhost:5173](http://localhost:5173) to view the app in your browser.  The development server is set up to use "Hot Module Replacement" (HMR), so the app will automatically reload in your browser if you make edits to the code.

Note that this app also has a separate API server in `server.js`.  You can run this server on port 8000 by running:
```
npm run api
```
The Vite app config in `vite.config.js` is set up to proxy requests from the client for URLs beginning with `/api` to the API server.
