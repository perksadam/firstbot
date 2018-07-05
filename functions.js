module.exports = function (client) {
	var functions = {};

	functions.setCurrentDate = function() {
		const currentDate = new Date().getMonth() + 1 + '/' + new Date().getDate();
		console.log(currentDate);
		client.dates.set('currentDate', currentDate);
	};

	functions.setLastFirstDate = function() {
		const date = new Date().getMonth() + 1 + '/' + new Date().getDate();
		client.dates.set('lastFirstDate', date);
	};

	functions.isFirst = function(message) {
		const key = message.author.id;

		if(!client.firstdata.has(key)) {
			client.firstdata.set(key,{
				user: message.author.username,
				firsts: 0
			});
		}

		let totalFirsts = client.firstdata.getProp(key, 'firsts');
		client.dates.set('lastFirstUser',message.author.username);
		client.firstdata.setProp(key, 'firsts', ++totalFirsts);
		client.functions.setLastFirstDate();
	}

	functions.randomNote = function(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	functions.getLeaderboard = function(message) {
		const leaderboard = client.firstdata.array().sort((a,b) => a.firsts < b.firsts);
		let count = 0;
		const botresponse = new client.discord.RichEmbed()
			  .setTitle("Leaderboard")
			  .setDescription("All the firsts!")
			  .setColor(0x00AE86)
			  .setFooter(client.functions.randomNote(client.notes.footerNotes));
			for(const data of leaderboard) {
				count++;
				let note = '';
				if(count == 1) {
					note = client.functions.randomNote(client.notes.happyNotes);
				} else {
					note = client.functions.randomNote(client.notes.regularNotes);
				}
			  	botresponse.addField(`${data.user} : ${data.firsts}`, note);
			}
		return botresponse;
	}

	functions.getLastFirst = function(message) {
		const lastFirstUser = client.dates.get('lastFirstUser');
		const lastFirstDate = client.dates.get('lastFirstDate');
		let botresponse = `The last first was ${lastFirstUser} on ${lastFirstDate}, praise them!`;
		return botresponse;
	}

	functions.resetChron = function() {
		const chron = client.schedule.scheduleJob('0 0 * * *', function(){
			client.functions.setCurrentDate();
		});
	}

	return functions;
}