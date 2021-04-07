const mathFunctions = require('../MathFunctions');

module.exports =
{
    name: 'rate',
    description: 'Rate a waifu',
    execute(message, args)
    {
        let result = 0;
        for (let j = 0; j < args.length; ++j)
        {
            for (let i = 0; i < args[j].length; i++)
            {
                result += args[j].charCodeAt(i);
            }
        }

        while (result > 10)
        {
            result = mathFunctions.computeChecksum(result);
        }

        message.reply('On a scale from 0 to 10, I rate your waifu as ' + result);
    }
}