"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const messages_1 = __importDefault(require("./messages"));
const BOT_TOKEN = process.env.BOT_TOKEN;
const ICAL_SERVER_URL = process.env.ICAL_SERVER_URL;
const bot = new telegraf_1.Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.replyWithHTML(messages_1.default.info));
bot.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const message = ctx.message.text.replace("-", "\-");
    console.log(message);
    const messageTextMatch = message.match(/.*\:\/\/ruz\.nsmu\.ru\/\?group\=(.*)\/(.*)\&spec\=(.*)\#/);
    if (messageTextMatch) {
        console.log(`${messageTextMatch[1]}-${messageTextMatch[2]}-${messageTextMatch[3]}`);
        const icalLink = `${ICAL_SERVER_URL}/${messageTextMatch[1]}/${messageTextMatch[2]}/${messageTextMatch[3]}`.replace("-", "\-");
        const responseMessageText = (messages_1.default.sendIcalLink + '\n\n' + icalLink).replace("-", "\-");
        yield ctx.replyWithHTML(responseMessageText);
        yield ctx.replyWithHTML(messages_1.default.subscribtionInstruction.replace("-", "\-"));
    }
    else {
        yield ctx.replyWithHTML(messages_1.default.invalidMessage);
    }
}));
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
