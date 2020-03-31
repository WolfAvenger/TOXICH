const ow = require('overwatch-stats-api');

function getBasics(player){
    (async () => {
        await ow.getBasicInfo(player.tag.reaplce('#','-'));
    })().then((result) => {
        return result;
    })
}
