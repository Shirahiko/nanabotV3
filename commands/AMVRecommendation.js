module.exports = {
    name: 'recommendation',
    aliases: ['recommend'],
    description: 'Recommend a random AMV',
    execute(message, args)
    {
        let replies = [encodeURI("https://www.youtube.com/watch?v=tf52mbGTB4o"), //Karton on BestAMV channel, which is locked by YT. Troll answer
        encodeURI("https://www.youtube.com/watch?v=GeXXHCVOtxI"), // Project Imouto
        encodeURI("https://www.youtube.com/watch?v=TW0TV1U_Dyc"), // Twisted
        encodeURI("https://www.youtube.com/watch?v=fuRge7A0OlY"), // Oshiri
        encodeURI("https://www.youtube.com/watch?v=fflOC5PIFuw"), // Fetish Fever
        encodeURI("https://www.youtube.com/watch?v=tUy41ajGcus"), // Unlimited Waifu Works
        encodeURI("https://www.youtube.com/watch?v=5wTNa2eV5jk"), // The D only makes it better
        encodeURI("https://www.youtube.com/watch?v=wwerIrGq12A"), // Pop it 
        encodeURI("https://www.youtube.com/watch?v=Rs9R4Eyha1Y"), // Halbstark
        encodeURI("https://www.youtube.com/watch?v=WoKo_r2NKAg"), // Secret Santa
        encodeURI("https://www.youtube.com/watch?v=97uviVyw0_o"), // You so Precious when you smile
        encodeURI("https://www.youtube.com/watch?v=oIa_8AIpRnQ"), // Last Supper by Gorz 
        encodeURI("https://www.youtube.com/watch?v=s7SIy9wdYno"), // Witchtrip by Kazkon 
        encodeURI("https://www.youtube.com/watch?v=oIa_8AIpRnQ"), // Last Supper by Gorz 
        encodeURI("https://www.youtube.com/watch?v=o-Qu8-ZGL14"), // Anime got talent by Luna, JazzsVids and Replay
        encodeURI("https://www.youtube.com/watch?v=z6lSTAfcRn0"), // Insomnia by Janzki
        encodeURI("https://www.youtube.com/watch?v=KGIx3fB9kr8"), // Good News Week by Streicher
        encodeURI("https://www.youtube.com/watch?v=lufuZQnfWXI"), // Ichigo by Streicher
        encodeURI("https://www.dailymotion.com/video/xa2v8"), // Secret Waltz
        encodeURI("https://www.youtube.com/watch?v=uaCQExEjJus"), // Molly by Padre
        encodeURI("https://www.youtube.com/watch?v=dB3yVaS6s7s"), // Just my Type by Z0rek
        encodeURI("https://www.youtube.com/watch?v=-NK2YYlAVU4"), // Kuhglogge by Lapskaus
        encodeURI("https://www.youtube.com/watch?v=AR7EhNdYOYU")] // Dakimakura
        let result = Math.floor((Math.random() * replies.length));

        message.channel.send(replies[result]);
    }
}

