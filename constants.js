// const logLevels = {
//   success: 'SUCCESS',
//   trace: 'TRACE',
//   debug: 'DEBUG',
//   info: 'INFO',
//   warn: 'WARN',
//   error: 'ERROR',
//   fatal: 'FATAL',
// }

module.exports = {
  routing: {
    USER_ROOT: '/auth',
    PROFILE_ROOT: '/profile',
    STRIPE_ROOT: '/stripe',
    GLOBAL_ROOT: '/global',
    STORE_ROOT: '/store',
    PRODUCT_ROOT: '/product',
    REVIEW_ROOT: '/review',
  },
  paginations: {
    DEFAULT_LIMIT: 60,
  },
}
