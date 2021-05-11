import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStatic } from 'passport'
import User from '../models/User'
import config from '../utils/config'

export default (passport: PassportStatic) => {
  let opts: any = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.SECRET
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id, (err: Error, user: typeof User) => {
        if (err) {
          return done(err, false)
        }

        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    })
  )
}
