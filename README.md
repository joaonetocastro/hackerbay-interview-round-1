This is the finished app for the round 1<br>
This application is served on the port 3333<br>

NOTE: the tokens used here as examples may be expired at the time you test this application, so you should generate your own tokens<br>

to run this app you should clone this repository, then run npm install<br>
to run the server you should run: npm start<br>
to run the tests you should run: npm test<br>
to verify the linting you should run: npm run lint<br>

The link to the docker image on DockerHub is https://hub.docker.com/r/joaonetocastro/round1<br>

It consists in tree routes:<br>
1. localhost:3333/login; type: POST<br>
  This route handles the login, it receives a json with a<br>
  user and a password, and i returns a json with the JWT name as "token".<br>
  EXAMPLE:<br>
    <code>Axios({
      url: 'http://localhost:3333/login',
      method: 'POST',<br>
      data: { user: 'user', password: 'password' },
    });</code>
  should return a response with a data like<br>
    <code>{ token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsImlhdCI6MTU4NjM5OTgyNiwiZXhwIjoxNTg2NDAzNDI2fQ.a_EKYQHQaKU3ts9vcT6q4FaWCi9B5gu-IdLfZbdcMU0' }</code>
2. localhost:3333/json-patch; type: GET<br>
  This route receives a json with a json object and a json Patch and it applies the patch <br>
  onto the jsonObject and returns the result inside a json names as "result"<br>
  To access this route you have to send a valid token as a header by the name "x-access-token"<br>
  EXAMPLE:<br>
    <code>Axios({
      url: 'http://localhost:3333/json-patch',
      method: 'GET',
      data: {
        jsonObject: { a: 10 },
        patch: [
          {
            op: 'replace',
            path: '/a',
            value: 18,
          },
          {
            op: 'add',
            path: '/b',
            value: [
              0,
              2,
              3,
            ],
          },
        ],
      },
      headers: {
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsImlhdCI6MTU4NjM5OTgyNiwiZXhwIjoxNTg2NDAzNDI2fQ.a_EKYQHQaKU3ts9vcT6q4FaWCi9B5gu-IdLfZbdcMU0',
      },
    });</code>
  should return a response with a data like<br>
    <code>{ result: { a: 18, b: [ 0, 2, 3 ] } }</code>
3. localhost:3333/create-thumbnail'; type: GET<br>
  This route receives a image url, and resizes to 50x50 (px) then returns the image in the form of html using a <code><img></code> tag<br>
  EXAMPLE:<br>
    <code>Axios({
      url: 'http://localhost:3333/create-thumbnail',
      method: 'GET',
      data: { url: 'https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg' },
      headers: {
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsImlhdCI6MTU4NjM5OTgyNiwiZXhwIjoxNTg2NDAzNDI2fQ.a_EKYQHQaKU3ts9vcT6q4FaWCi9B5gu-IdLfZbdcMU0',
      },
    });</code>
  should return something like:<br>
    <code><img src="data:image/jpeg;base64,...."/></code>
