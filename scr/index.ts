import { Telegraf } from 'telegraf';
import messagesTexts from './messages';

const BOT_TOKEN = process.env.BOT_TOKEN!
const ICAL_SERVER_URL = process.env.ICAL_SERVER_URL!

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.replyWithHTML(messagesTexts.info));

bot.on('text', async (ctx) => {
  const message = ctx.message.text.replace("-", "\-")
  console.log(message)
  const messageTextMatch = message.match(/.*\:\/\/ruz\.nsmu\.ru\/\?group\=(.*)\/(.*)\&spec\=(.*)\#/)
  if (messageTextMatch) {
    console.log(`${messageTextMatch[1]}-${messageTextMatch[2]}-${messageTextMatch[3]}`)
    const icalLink = `${ICAL_SERVER_URL}/${messageTextMatch[1]}/${messageTextMatch[2]}/${messageTextMatch[3]}`.replace("-", "\-")
    const responseMessageText = (messagesTexts.sendIcalLink + '\n\n' + icalLink).replace("-", "\-")
    await ctx.replyWithHTML(responseMessageText)
    await ctx.replyWithHTML(messagesTexts.subscribtionInstruction.replace("-", "\-"))
  } else {
    await ctx.replyWithHTML(messagesTexts.invalidMessage)
  }
})


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));