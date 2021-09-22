const { App: Index } = require('@slack/bolt');
const core = require('@actions/core');
const github = require('@actions/github');

// Initializes your app with your bot token and signing secret
const slackToken = core.getInput('slack-bot-token');
const slackSigningSecret = core.getInput('slack-signing-secret');
const app = new Index({
  token: slackToken,
  signingSecret: slackSigningSecret
});
const channelId = core.getInput('slack-channel-id');
const statusDeployment = core.getInput('deployment-results');
const teascannerApp = core.getInput('teascanner-heroku-app');

( async () => {
  // Start your app
  const payload = github.context.payload;
  console.log(statusDeployment)
  await app.client.chat.postMessage({
      channel: channelId,
      text: `${payload.repository.name} has been deployed` ,
      attachments: [
		{
			"color": "#b5e48c",
			"blocks": [
				{
					"type": "context",
					"elements": [
						{
							"type": "image",
							"image_url": `${payload.sender.avatar_url}`,
							"alt_text": "images"
						},
						{
							"type": "mrkdwn",
							"text": `<${payload.sender.html_url} | *${payload.sender.login}*>`
						}
					]
				},
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": `Successfully deployed <${payload.head_commit.url} | ${payload.head_commit.id.substring(0, 7)}> to ${teascannerApp}`
					}
				},
				{
					"type": "context",
					"elements": [
						{
							"type": "image",
							"image_url": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
							"alt_text": "images"
						},
						{
							"type": "mrkdwn",
							"text": `<${payload.repository.html_url} | ${payload.repository.full_name}>`
						}
					]
				}
			]
		}
	]
  })
})();
