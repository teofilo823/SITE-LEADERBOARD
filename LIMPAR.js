require('dotenv').config();
const { REST, Routes } = require('discord.js');

const token = process.env.TOKEN;
const clientId = '1363856919638573277'; // Seu Client ID
const guildId = '1305832132328947743'; // Sua Guild ID

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('--- 🧹 INICIANDO LIMPEZA DE COMANDOS ---');

        // 1. Limpar comandos da GUILD específica
        console.log('Limpando comandos da Guild...');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
        console.log('✅ Comandos da Guild removidos com sucesso.');

        // 2. Limpar comandos GLOBAIS
        console.log('Limpando comandos Globais...');
        await rest.put(Routes.applicationCommands(clientId), { body: [] });
        console.log('✅ Comandos Globais removidos com sucesso.');

        console.log('--- ✨ LIMPEZA CONCLUÍDA ---');
        console.log('Dica: Reinicie seu Discord (Ctrl + R) para atualizar a lista visual.');
        
        process.exit(); // Fecha o script após terminar
    } catch (error) {
        console.error('❌ Erro ao limpar comandos:', error);
    }
})();