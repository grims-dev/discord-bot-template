import 'dotenv/config';
import { Client, GatewayIntentBits, Events, BaseInteraction } from 'discord.js';
import { getCommands, getEvents } from './utils';

const init = () => {
    console.log('Initialising the bot...');
    const { DISCORD_BOT_TOKEN: token } = process.env;

    if (!token?.trim()) {
        console.error('No token environment variable has been provided. Please add it to your `.env` file.');
        return;
    }

    const commands = getCommands();
    const events = getEvents();

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    // not in `events` folder as we need access to available commands
    client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
        if (!interaction.isChatInputCommand()) return;
        const command = commands.get(interaction.commandName);

        if (!command) {
            console.error(`Command '${interaction.commandName}' does not exist`);
            return;
        }

        await command.execute(interaction);
    })

    events.forEach(event => {
        event.once
            ? client.once(event.name, (...args: any[]) => event.execute(...args))
            : client.on(event.name, (...args: any[]) => event.execute(...args));
    });

    client.login(token);
};

init();
