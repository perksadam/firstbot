exports.run = (client, message, args) => {

	const key = message.author.id;
	const user = message.member.displayName;

	const hasFirsts = client.firstdata.has(key);

	const totalCoins = hasFirsts ? client.firstdata.getProp(key,'coins') : 0;

	let botresponse = '';

	if(totalCoins-100 > 0) {
		firstdata.setProp(key, 'coins', totalCoins-100);
		botresponse = `The pact is sealed, ${user}. You have **${totalCoins - 100}** schmeckle${totalCoins-100 > 1 ? 's' : ''} remaining. https://www.youtube.com/watch?v=QVw5mnRI8Zw`;
	} else {
		botresponse = `I think you know what I'm about say to you, but I'll say it to you anyways. You poor. Get out of here.`
	}
	
	message.channel.send(botresponse);

}