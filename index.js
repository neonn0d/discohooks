const axios = require('axios');

class DiscordNotification {
  constructor(webhookUrl) {
    if (!webhookUrl) {
      throw new Error('Webhook URL is required');
    }
    this.webhookUrl = webhookUrl;
  }

  async send(content, options = {}, embed = null) {
    if (!content && !embed) {
      throw new Error('Content or embed is required');
    }

    const payload = {
      content,
      ...options,
    };

    if (embed) {
      payload.embeds = [embed];
    }

    try {
      const response = await axios.post(this.webhookUrl, payload);
      return response.data;
    } catch (error) {
      throw new Error('Failed to send notification: ' + error.message);
    }
  }

  async sendFromApi(apiUrl, options = {}, embedOptions = {}) {
    if (!apiUrl) {
      throw new Error('API URL is required');
    }

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      const content = JSON.stringify(data, null, 2);
      return this.send(content, options, null);
    } catch (error) {
      throw new Error('Failed to send notification from API: ' + error.message);
    }
  }
}

module.exports = DiscordNotification;
