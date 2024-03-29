import express from 'express'
import passport from 'passport'
import { currentUser } from '../Middlewares/current-user'
import { userRoute } from '../Controllers/User/userIndex.controller'
import { proxy } from '../Utils/proxy'

module.exports = () => {
  const router = express.Router()
  // @route    GET /v1/auth

  // @desc     Route will return all user in database
  // @access   PUBLIC
  router.get('/', async (req, res) => await userRoute.get.all(req, res))

  // @route    GET /v1/auth/me
  // @desc     Route will return all user in database
  // @access   PRIVATE
  router.get(
    '/me', currentUser,
    async (req, res) => await userRoute.get.me(req, res)
  )
  // @route    GET /v1/auth/user/:id
  // @desc     Route will return specific user in database
  // @access   PUBLIC
  router.get(
    '/user/:id',
    async (req, res) => await userRoute.get.user(req, res)
  )

  // @route    POST /v1/auth/signup
  // @desc     Register user
  // @access   Public
  router.post(
    '/signup',
    async (req, res) => await userRoute.post.signup(req, res)
  )

  // @route    POST v1/auth/signin
  // @desc     Authenticate user & get token
  // @access   Public
  router.post(
    '/signin',
    async (req, res) => await userRoute.post.signin(req, res)
  )

  // @route    POST v1/auth/forgot-password
  // @desc     Sends a forgot password link to email
  // @access   Public
  router.post(
    '/forgot-password',
    async (req, res) => await userRoute.post.forgotPassword(req, res)
  )

  // @route    POST v1/auth/password-reset/:userId/:token
  // @desc     Sends a forgot password link to email to reset password
  // @access   Public
  router.post(
    '/password-reset/:userId/:token',
    async (req, res) => await userRoute.post.passwordReset(req, res)
  )

  // @route    PUT v1/auth/user
  // @desc     Updates user object
  // @access   Public
  router.put(
    '/user',
    async (req, res) => await userRoute.update.user(req, res)
  )

  // @route    POST v1/auth/signout
  // @desc     Removes current user session information form server
  // @access   Public
  router.post(
    '/sign-out',
    async (req, res) => await userRoute.post.signout(req, res)
  )

  // @route    POST v1/auth/facebook
  // @desc     Logs in user with facebook
  // @access   Public
  router.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
  )
  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: `${proxy()}/sign-in`,
    }),
    (req, res) => userRoute.post.facebookCallback(req, res)
  )

  // @route    POST v1/auth/google
  // @desc     Logs in user with google
  // @access   Public
  router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )
  router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: `${proxy()}/sign-in`,
    }),
    (req, res) => userRoute.post.googleCallback(req, res)
  )

  // TODO: MAKE SURE TO CANCEL ANY SUBSCRIPTIONS!
  // @route    DELETE v1/auth
  // @desc     Deletes a user
  // @access   Private
  router.delete('/', async (req, res) => await userRoute.remove.user(req, res))

  return router
}
