import { SlashCommandBuilder } from 'discord.js';
import { ICommand } from '../../types';

const command: ICommand = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: any) {
		await interaction.reply('Pong!');
	},
};

export default command;