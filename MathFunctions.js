let computeChecksum = exports.computeChecksum = function(num)
{
    if (typeof num !== 'number' || isNaN(num))
    {
        throw new Error('Number, which is not NaN, expected as Parameter.');
    }

    num = Math.floor(Math.abs(num));
    let checksum = 0;
    while (num > 0)
    {
        checksum += num % 10;
        num = Math.floor(num / 10);
    }

    return checksum;
};