const { App: Index } = require('@slack/bolt');
const core = require('@actions/core');
const github = require('@actions/github');
const {DEPLOY_SUCCESSFUL} = require("./message/deploy_successful");
const {DEPLOY_INIT} = require("./message/deploy_init");

// Initializes your app with your bot token and signing secret
const slackToken = core.getInput('slack-bot-token');
const slackSigningSecret = core.getInput('slack-signing-secret');
const action = core.getInput('action');
const app = new Index({
  token: slackToken,
  signingSecret: slackSigningSecret
});
const channelId = core.getInput('slack-channel-id');
const statusDeployment = core.getInput('deployment-results');
const teascannerApp = core.getInput('teascanner-heroku-app');
console.log(statusDeployment);
const payload = github.context.payload;

initDeploy = () =>  app.client.chat.postMessage({
        channel: channelId,
        text: `${payload.repository.name} is deploying...`,
        blocks: [DEPLOY_INIT(payload)] });

feedbackDeploy = () =>  app.client.chat.postMessage({
        channel: channelId,
        text: `${payload.repository.name} has been deployed` ,
        attachments: [slackMessage]});


(async () => {
    switch(action) {
        case 'INIT':
            let messageInit = await initDeploy();
            console.log(messageInit);
            break;
        case 'DEPLOYED':
            let message = await feedbackDeploy(DEPLOY_SUCCESSFUL(payload, teascannerApp));
            console.log(message);
            break;
    }
})()
