import { Telegraf } from "telegraf";
import fs from "fs";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    "Привет! ✈️ Я помогу найти попутчика для передачи документов.\n\nВыберите:\n" +
    "1️⃣ Напиши 'Я лечу'\n2️⃣ Или 'Хочу отправить'"
  )
);

bot.hears(/лечу/i, (ctx) =>
  ctx.reply("Отлично! Напиши маршрут в формате: Минск → Варшава 30 октября")
);

bot.hears(/→/i, (ctx) => {
  const data = `${ctx.from.username || ctx.from.first_name}: ${ctx.message.text}\n`;
  fs.appendFileSync("trips.txt", data);
  ctx.reply("✈️ Маршрут сохранён! Когда появится запрос — уведомлю.");
});

bot.launch();
console.log("✅ Бот запущен");
