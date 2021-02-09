const Cookie = process.client ? require('js-cookie') : undefined

export const getDomain = () => {
  let domain
  //domain = '.local.com'
  if (process.env.NUXT_ENV_MODE === 'test') {
    domain = '.computer.com'
  } else if (process.env.NUXT_ENV_MODE === 'pre') {
    domain = '.conschina.com'
  } else if (process.env.NUXT_ENV_MODE === 'prd') {
    domain = '.conschina.com'
  }
  return domain
}

export const setCookies = (kvs) => {
  let options = { expires: 7 }
  let domain = getDomain()
  if (domain) {
    options['domain'] = domain
  }
  
  console.log('client set cookie ---------- ', 'domain:', domain, 'options:', options)

  for (let key in kvs) {
    Cookie.set(key, kvs[key], options) 
  }
}

export const removeCookie = (key) => {
  let options = {}
  let domain = getDomain()
  if (domain) {
    options['domain'] = domain
  }
  
  console.log('client remove cookie ---------- ', 'domain:', domain, 'options:', options)

  Cookie.remove(key, options)
}