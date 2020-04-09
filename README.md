This is the finished app for the round 1
This application is served on the port 3333

NOTE: the tokens used here as examples may be expired at the time you test this application, so you should generate your own tokens

It consists in tree routes:
1. localhost:3333/login; type: POST
  This route handles the login, it receives a json with a
  user and a password, and i returns a json with the JWT name as "token".
  EXAMPLE:
    Axios({
      url: 'http://localhost:3333/login',
      method: 'POST',
      data: { user: 'user', password: 'password' },
    });
  should return a response with a data like
    { token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsImlhdCI6MTU4NjM5OTgyNiwiZXhwIjoxNTg2NDAzNDI2fQ.a_EKYQHQaKU3ts9vcT6q4FaWCi9B5gu-IdLfZbdcMU0' }
2. localhost:3333/json-patch; type: GET
  This route receives a json with a json object and a json Patch and it applies the patch 
  onto the jsonObject and returns the result inside a json names as "result"
  To access this route you have to send a valid token as a header by the name "x-access-token"
  EXAMPLE:
    Axios({
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
    });
  should return a response with a data like
    { result: { a: 18, b: [ 0, 2, 3 ] } }
3. localhost:3333/create-thumbnail'; type: GET
  This route receives a image url, and resizes to 50x50 (px) then returns the image in the form of html using a <img> tag
  EXAMPLE:
    Axios({
      url: 'http://localhost:3333/create-thumbnail',
      method: 'GET',
      data: { url: 'https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg' },
      headers: {
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsImlhdCI6MTU4NjM5OTgyNiwiZXhwIjoxNTg2NDAzNDI2fQ.a_EKYQHQaKU3ts9vcT6q4FaWCi9B5gu-IdLfZbdcMU0',
      },
    });
  should return something like:
    <img src="data:image/jpeg;base64,...."/>