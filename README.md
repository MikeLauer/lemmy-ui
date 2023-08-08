# Lemmy-UI

The official web app for [Lemmy](https://github.com/LemmyNet/lemmy), written in inferno.

Based off of MrFoxPro's [inferno-isomorphic-template](https://github.com/MrFoxPro/inferno-isomorphic-template).

## Tor Compatibility Fork

Lemmy has one significant issue with Tor at this point: Picture requests are leaking.

### The issue explained

On the normal web, all requests go to `https://lemmy.tld/...`, including image requests that look like `https://lemmy.tld/pictures/image/...`. In Tor, you access `http://xyz.onion/`, but the image requests still use `https://lemmy.tld/pictures/image/...`. From a Tor perspective, this is not intended and defeats the purpose of a hidden service. Yes, you are still anonymous, but the traffic through the exit nodes is slow (traffic within the tor network is »faster«) and not even necessary in this case.

The reason for this problem is that the image links are stored in full length in the database. For example, an image has the id `1a2b3c4d` and is stored in the DB as `https://lemmy.tld/pictrs/imate/1a2b3c4d`. This causes requests for images (of the same site you visit via tor) to take the long route via the clear web.

### Proposed fix

The solution I propose is relatively simple: when an image URL is to be loaded, it is checked whether the URL contains the specified domain. If it matches, the domain is replaced with the browser's current location. In this way, the URLs of the images from the own instance are replaced by the Tor URLs. Federated image URLs are not changed, otherwise they would break.

- `https://lemmy.tld/pictures/image/...` will be replaced to
- `http://xyz.onion/pictures/image/...` if it matches `https://lemmy.tld`


## Please note

Be aware, that content from other instances might not be visable due to Tor blocking. Furthermore federation is currently not supported for Tor instances. Federation traffic between instances is handled on the clear web.

If you just want a Tor mirror, you might want to consider using a [single onion service](https://blog.torproject.org/whats-new-tor-0298/) for better performance.

Use at your own risk.