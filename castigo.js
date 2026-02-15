const { EmbedBuilder } = require('discord.js');

async function executarCastigo(interaction) {
    const targetMember = interaction.options.getMember('jogador');
    const minutos = interaction.options.getInteger('tempo');
    const motivo = interaction.options.getString('motivo') || "Não especificado";

    if (!targetMember) {
        return interaction.reply({ content: "❌ Não foi possível encontrar este membro.", ephemeral: true });
    }

    if (!targetMember.moderatable) {
        return interaction.reply({ content: "❌ Eu não tenho permissão para castigar este usuário (cargo superior ao meu).", ephemeral: true });
    }

    try {
        // Aplica o timeout (tempo em milisegundos)
        await targetMember.timeout(minutos * 60 * 1000, motivo);

        const embed = new EmbedBuilder()
            .setTitle("⏳ JOGADOR EM CASTIGO")
            .setDescription(`${targetMember} foi silenciado e removido das atividades.`)
            .addFields(
                { name: "🕒 Duração", value: `${minutos} minutos`, inline: true },
                { name: "📝 Motivo", value: motivo, inline: true }
            )
            .setColor("#FFA500")
            .setThumbnail(targetMember.user.displayAvatarURL())
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    } catch (err) {
        console.error(err);
        await interaction.reply({ content: "❌ Ocorreu um erro ao tentar aplicar o castigo.", ephemeral: true });
    }
}

module.exports = { executarCastigo };