## To Install node packages
> sudo npm install -g serve

> sudo npm run build

> sudo serve -s build

## Full Stack Application
> firebase init  >> functions >> javascript >> EsLint=Y >> Install dependencies Yes

The above creates a ./functions folder

### Run the following commands in ./functions folder
> sudo npm i -g express

> sudo npm i cors

> sudo npm i stripe
> sudo npm i @stripe/stripe-js
> sudo npm i @stripe/react-stripe-js

> sudo npm install -g firebase

> sudo npm install -g firebase-tools

> firebase emulators:start #inside ./functions

### To Deploy the Backend only
> firebase deploy --only functions #inside project root

### To Deploy the Frontend
> firebase init >> Hosting >> build >> Yes >> Yes  #inside project root

> npm run build && firebase deploy --only hosting #inside project root
