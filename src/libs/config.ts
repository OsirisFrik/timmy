const env = process.env

export default {
  isDev: env.NODE_ENV === 'development',
  port: env.PORT || 3000,
  cookieSecret: env.COOKIE_SECRET || 'SAKHFSDKJGHADSKJfsfsfsf23faq',
  discordToken: env.DISCORD_TOKEN,
  ngrokToken: env.NGROK_TOKEN
}
