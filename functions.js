module.exports = {
    sleep: function(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    },
    randomInArray: function (anArray){
        //TODO : Check if anArray is really an array.	
    
        var randomIndex=Math.floor(Math.random()*anArray.length)	
        return anArray[randomIndex];
    },
    mentions: function (mention) {
        // The id is the first and only match found by the RegEx.
        const matches = mention.match(/^<@!?(\d+)>$/);
    
        // If supplied variable was not a mention, matches will be null instead of an array.
        if (!matches) return;
    
        // However the first element in the matches array will be the entire mention, not just the ID,
        // so use index 1.
        const id = matches[1];
    
        return client.users.cache.get(id);
    }
}