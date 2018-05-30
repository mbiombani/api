# passport-token-facebook


[Passport](http://passportjs.org/) strategy for authenticating with [Facebook](http://www.facebook.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Facebook in your Node.js applications.
By plugging into Passport, Facebook authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-token-facebook

## Usage

#### Configure Strategy

The Facebook authentication strategy authenticates users using a Facebook
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying an app ID, app secret, and optionally enabling [`appsecret_proof`] (https://developers.facebook.com/docs/graph-api/securing-requests#appsecret_proof).

    passport.use(new TokenFacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        enableProof: false
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'token-facebook'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/token-facebook',
      passport.authenticate('token-facebook'),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

#### Profile Fields

The Facebook profile is very rich, and may contain a lot of information.  The
strategy can be configured with a `profileFields` parameter which specifies a
list of fields (named by Portable Contacts convention) your application needs.
For example, to fetch only user's facebook ID, name, and picture, configure
strategy like this.

    passport.use(new TokenFacebookStrategy({
        // clientID and clientSecret
        profileFields: ['id', 'displayName', 'photos']
      },
      // verify callback
    ));

If `profileFields` is not specified, the default fields supplied by Facebook
will be parsed.
