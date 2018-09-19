const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

// replace the value below with the Telegram token you receive from @BotFather
const token = '694390843:AAGZPJeAH2B1rr0_cJLrKl6n5H8NwMHhWdU';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, 'Выберите клуб который вас интересует:',{
        reply_markup:{
            inline_keyboard:
            [
                [
                    {
                        text: 'Arsenal',
                        callback_data: 'Arsenal'
                    },
                    {
                        text: 'Bournemouth',
                        callback_data: 'Bournemouth'
                    },
                    {
                        text: 'Brighton',
                        callback_data: 'Brighton'
                    },
                    {
                        text: 'Burnley',
                        callback_data: 'Burnley'
                    }
                    
                ]
            ]
        }
    });
    bot.sendMessage(chatId, '...',{
        reply_markup:{
            inline_keyboard:
            [
                [
                    {
                        text: 'Cardiff City',
                        callback_data: 'Cardiff City'
                    },
                    {
                        text: 'Crystal Palace',
                        callback_data: 'Crystal Palace'
                    },
                    {
                        text: 'Everton',
                        callback_data: 'Everton'
                    },
                    {
                        text: 'Fulham',
                        callback_data: 'Fulham'
                    }
                    
                ]
            ]
        }
    });
    bot.sendMessage(chatId, '...',{
        reply_markup:{
            inline_keyboard:
            [
                [
                    {
                        text: 'Huddersfield',
                        callback_data: 'Huddersfield'
                    },
                    {
                        text: 'Leicester City',
                        callback_data: 'Leicester City'
                    },
                    {
                        text: 'Liverpool',
                        callback_data: 'Liverpool'
                    },
                    {
                        text: 'Manchester City',
                        callback_data: 'Manchester City'
                    }
                    
                ]
            ]
        }
    });
    bot.sendMessage(chatId, '...',{
        reply_markup:{
            inline_keyboard:
            [
                [
                    {
                        text: 'Manchester United',
                        callback_data: 'Manchester United'
                    },
                    {
                        text: 'Newcastle',
                        callback_data: 'Newcastle'
                    },
                    {
                        text: 'Southampton',
                        callback_data: 'Southampton'
                    },
                    {
                        text: 'Tottenham',
                        callback_data: 'Tottenham'
                    }
                    
                ]
            ]
        }
    });
    bot.sendMessage(chatId, '...',{
        reply_markup:{
            inline_keyboard:
            [
                [
                    {
                        text: 'Watford',
                        callback_data: 'Watford'
                    },
                    {
                        text: 'West Ham',
                        callback_data: 'West Ham'
                    },
                    {
                        text: 'Wolverhampton',
                        callback_data: 'Wolverhampton'
                    }
                ]
            ]
        }
    });
});

bot.on('callback_query',  query => {
    const id = query.message.chat.id;

    request('https://gitcdn.xyz/repo/drraq/PremierLeague.json/master/data.json', function(error, response, body){
        const data = JSON.parse(body);
        const result = data.filter(item => item.name === query.data)[0];
        let md = `
            Club: _${result.name}_
            Manager: _${result.manager}_
            Stadium: _${result.stadium}_
            Capacity: _${result.capacity}_
            Position: _${result.position}_
            Games played: _${result.games_played}_
            Wins: _${result.wins}_
            Losses: _${result.losses}_
            Goals scored: _${result.goals_scored}_
            Points: _${result.points}_
            Next fixture: _${result.next_fixture}_
        `;
        bot.sendMessage(id, md, {parse_mode: 'Markdown'});
    })
});