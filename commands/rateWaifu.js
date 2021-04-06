const mathFunctions = require('../MathFunctions');

module.exports = {
    name: 'rateWaifu',
	description: 'Rate the waifu',
    execute( message, args) {
        var result = 0;
 
        for (var j = 0; j< args.length; ++j){
            for (var i = 0; i < args[j].length; i++) {
                result += args[j][i].charCodeAt();
            }
        }

        while(result > 10)
        {
            result = mathFunctions.ComputeChecksum(result);
        }
        
        message.channel.send('On a scale from 0 to 10, I rate your waifu as '+result);
    }
}