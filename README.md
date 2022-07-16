### REACT LOGIN REGISTER ROUTING AUTHENTICATION CHEATSHEET

## Description

Cheatsheet based on yt video series tutorials by Dave Gray
https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd

The Frontend is connecting with Server from this repo:
https://github.com/IamIGI/NodeJS-Cheet-Sheet

# JWT - JSON Web Tokens

User authentication, when user is authenticated, user get access token adn refresh token
Access token - short time (5-15 min)
Refresh token - long time (even days)
JWT have to be stored in memory (not local storage or cookies) so data will be lost after app is closed
Refresh Token - send this via httpOnly cookie, cuz when it's not accessible via JS. Add expiry time. Issued at Authorization, Client uses to request new Access Token. Verified with endpoint and database. Must by allowed to expire or logout.
Access Token - issued at Authorization, client uses for API access until expires. Verified with Middleware, new token issued at refresh request

## Useful links

# Axios

https://axios-http.com/docs/intro

# Font Awesome

https://fontawesome.com/v5/docs/web/use-with/react

# React Router Dom

https://reactrouter.com/docs/en/v6/getting-started/overview
