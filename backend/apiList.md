### API LISTS

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId // status - ignored, interested
- POST /request/review/:status/:requestId // status - accepted, rejected

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - get all profile of others
