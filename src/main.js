const { Client, Collection } = require("discord.js");
const { readdirSync, lstatSync } = require('fs')
const { join } = require('path')

const Functions = require("./functions-and-embeds/functions/functions-general.js");

const config = require("./json/config.json")

module.exports = class extends Client {
    constructor(options) {
        super(options)
        this.slashcommands = new Collection();
        this.functions = new Functions(this);

        this.config = config;
        this.optionsBot = this.config.optionsBot;
        this.mainConfig = this.config.mainConfig;

        this.pushslash = [];
        this.embeds = {};

    }

    start() {
        this.login(process.env.TOKEN);
        this.loadCommandsSlash();
        this.loadEvents();
        this.loadEmbeds();
    }

    async loadCommandsSlash() {
        try {
            readdirSync('./src/commands/').forEach(async file => {
                const command = await require(`./commands/${file}`);
                this.pushslash.push(command.data.toJSON());
                this.slashcommands.set(command.data.name, command);
            })
            console.log(`\x1b[38;5;75m✔ [Commands] All commands have been loaded. \x1b[0m`);
        } catch (e) {
            console.error(e);
        }
    }

    loadEvents(path = 'src/events', currentPath = '') {
        let eventCount = 0;
        const files = readdirSync(join(path, currentPath));

        for (const file of files) {
            const filePath = join(currentPath, file);
            const fullFilePath = join(path, filePath);
            const isDirectory = lstatSync(fullFilePath).isDirectory();

            if (isDirectory) {
                eventCount += this.loadEvents(path, filePath);
            } else {
                const eventClass = require(join(process.cwd(), fullFilePath));
                const evt = new (eventClass)(this);
                this.on(evt.name, evt.run);
                eventCount++;
            }
        }
        if (currentPath === '') console.log(`\x1b[38;5;36m✔ [Events] ${eventCount} events were loaded successfully. \x1b[0m`);
        return eventCount;
    }


    loadEmbeds(embedsPath = 'src/functions-and-embeds/embeds-and-example/embeds/') {
        const files = readdirSync(embedsPath, { withFileTypes: true });

        for (const file of files) {
            const filePath = join(embedsPath, file.name);
            const isDirectory = file.isDirectory();

            if (isDirectory) {
                this.loadEmbeds(filePath);
            } else {
                const embedModule = require(join(process.cwd(), filePath));
                const embedFunctionName = Object.keys(embedModule)[0];

                this.embeds[embedFunctionName] = embedModule[embedFunctionName];
            }
        }
    }
}

