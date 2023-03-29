# Discohooks

A simple library to send notifications to Discord via webhooks, designed for use in React applications.

## Installation

Install the library using npm:

```
npm install dishooks
```

or

```
yarn add dishooks
```

## Usage

Import the library:

```javascript
const axios = require('axios');
const DiscordNotification = require('dishooks');

const webhookUrl = 'https://discord.com/api/webhooks/; // Replace with your webhook
const discord = new DiscordNotification(webhookUrl);

const apiUrl = 'https://reqres.in/api/users/1'; // Replace with the actual API URL

async function sendApiDataToDiscord() {
  try {
    const response = await axios.get(apiUrl);
    const user = response.data.data;

    const embed = {
      color: 0x0099ff,
      title: `${user.first_name} ${user.last_name}`,
      thumbnail: {
        url: user.avatar,
      },
      fields: [
        {
          name: 'User ID',
          value: user.id,
          inline: true,
        },
        {
          name: 'Email',
          value: user.email,
          inline: true,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: 'Discord Notification',
      },
    };

    await discord.send(
      null,
      {
        username: 'Custom Username',
        avatar_url: 'https://example.com/avatar.png',
        tts: true,
      },
      embed,
    );

    console.log('Message sent successfully');
  } catch (error) {
    console.error('Failed to send message:', error.message);
  }
}

sendApiDataToDiscord();

```

# Customization

You can customize the appearance of the Discord message by using "embeds." Update the send method in your index.js file to accept an optional embed parameter:

```
async send(content, options = {}, embed = null) {
  ...
}
```

Refer to the [Discord API documentation](https://discord.com/developers/docs/resources/channel#embed-object) for more information about embeds and their properties.

# Support

If you need help or have questions, please open an issue in the GitHub repository or contact neonn0d

# License

This library is released under the MIT License.
