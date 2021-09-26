export const DEPLOY_SUCCESSFUL = (payload, teascannerApp) => {
    return {
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
}
