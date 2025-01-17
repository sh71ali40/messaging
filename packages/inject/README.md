# Inject

The inject script is used to connect a web page and the webchat together using an iframe. This script handles configuration parsing, storing, and editing along with the ability to listen to events from the webchat.

## Prerequisites

1.  A Messaging server running
    - Make sure to create a client. See `misc/api.rest` -> `Create client`.

## Setup

To try this out you can compile the bundle with `cd packages/inject` and `yarn build`. This will produce a bundle in the `dist` directory. You can then start a media server (e.g. `npx http-server`) on this directory and paste the address in the the example.html file.

For example with a server started on port 8080, and a messaging server started on port 3100 with a existing clientId of `8b6b25ae-e47d-455e-8057-356dae07fff2` this would be the minimal configuration.

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="utf-8" />
  </head>
  <body>
    <h1>Example website</h1>
    <p>This website integrates the botpress webchat!</p>
  </body>

  <script src="http://localhost:8080/inject.js"></script>
  <script>
    window.botpressWebChat.init({
      hostUrl: 'http://localhost:8080',
      messagingUrl: 'http://localhost:3100',
      clientId: '8b6b25ae-e47d-455e-8057-356dae07fff2'
    })
  </script>
</html>
```

`hostUrl` should be the same base url that you get the inject.js script from. `messagingUrl` is simply the the url of the messaging server.

## Development

If you want to make changes to the inject script, you can also use the command `yarn dev` so that changes made to the file will automatically be compiled.
