import * as semver from 'semver'
if(semver.satisfies(process.version,'=>12.11.1'))  throw new Error ("You need node version 12.11.1 or higher");
import { Client, Collection } from 'discord.js';
import { prefix, token } from './config.json';
import { readdir } from 'fs';
import * as mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/FarmCord', { useNewUrlParser: true };

declare module 'discord.js' {
	interface Client {
		commands: Collection<String, any>
	}
}

const client: Client = new Client();

client.commands = new Collection()

readdir("./cmds", (err, files) => {

	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		console.log("Command not found.");
		return;
	}

	jsfile.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${f} loaded!`);
		client.commands.set(props.info.name, props);
		console.log(props)
	});
});

client.on("message", async message => {

	if (message.channel.type === "dm") return;

	if (!message.content.startsWith(prefix)) return;

	if (message.author.bot) return;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandfile = client.commands.get(cmd.slice(prefix.length));
	if (commandfile) commandfile.run(client, message, args)

});

client.login(token)
