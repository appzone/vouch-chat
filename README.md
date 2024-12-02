# Chat Application Documentation

## Date submission

> > 3 December 2024 00:31:00 GMT+7

---

## Instruction to run

> > Clone the repository   https://github.com/appzone/vouch-chat.git
> > Pre-req :: install nodejs, npm, docker, docker-compose  
> > In the root folder run this command  
> > `docker-compose up --build --force-recreate`

---

## Time spent

> > 5 hours

---

## Assumptions made

> >

1. padding , size, margin.
2. take latest 10 messages
3. persistent with store data to localstorage
4. there is no "unstable" connection scenario.
5. happy flow scenario
6. multi user chatroom

---

## Shortcuts / compromises made

1. use indexed db instead of localstorage
2. better state management and use effect / component lifecycle handling
3. connect to socket if user click join instead of directly connect on page open

---

## Assume your application will go into production

### a. What would be your approach to ensuring the application is ready for production (testing)?

> > Having unit test, vuln scanning (node_modules / docker image), performance / stress test. List and test all possible scenario.

### b. How would you ensure a smooth user experience as 1000's of users start using your app simultaneously?

> > First, we need to measure our socket / webserver capacity by doing performance test.  
> > if result is able to handle >1000 concurrent user, than nothing to do.  
> > if result not able to handle that, we need to do scale
> >
> > > > if we are using kubernetes we can have scale the container vertically / horizontally (ex: increase pod / increase memory - cpu )  
> > > > use Load balancer to distribute traffic across container / service  
> > > > currently in code there is sync / block process when message come to socket it need to save to database, we can increase performance by doing this async processed in background. also we can using redis for caching.  
> > > > Using socket io compression  
> > > > Using multi instance socketio with help of redis to maintain data across instance  
> > > > Use nodejs cluster

---

## What key steps would you take to ensure application security?

> > Encrypt / decode content  
> > Use secure connection (secure websocket / secure https)  
> > Doing vulnerability scanning (dependency / docker image)  
> > Use authentication when connecting / joining to socket  
> > Doing pentest / OWASP 10 scanning  
> > Makesure http headers set is following OWASP http headers recommendation (CSP, etc)  
> > Allow only CORS for our domain and spesific domain (web.abc.com) instead of wildcard \*.abc.com  
> > Using cloudflare to prevent unwanted traffic  
> > Use CSRF token  
> > Make sure access is not broken.  
> > Removing footprinting (default config, default banners, etc ) (ex: ssh banner, nginx banner, nodejs version , etc )  
> > in frontend doing obfuscate the code  
> > put secrets properly ex: put into kubernetes secrets and encrypt it  
> > XSS or injection preventation especially in inputbox.  
> > NEVER trust Frontend / client, always validate in Backend side

---

## What did you not include in your solution that you want us to know about?

> > Handling socket connect error / disconnection, currently just doing refresh. Handling if connection unstable, ex: automatic reconnect and re-fetch data. https or secure socket. Mongoose schema to have prevalidation to validate data before save. Prettier, linting, CI/CD pipeline, unit testing, using react context instead of passing socket to component. Creating form / page as reuseable small component, ex Button, Input, etc.  
> > Dockerfile, split the builder and runtime image to make the image smaller. Do compile code and Not include source code to the docker. Using / having nginx to reverse proxy to the container instead of directly access container.

---

## Other information about your submission

> > Dev mode figma.

---

## Your feedback on this technical challenge

> > The technical challenge is Ok, clear instructions, timeline is OK.
