export const DEPLOY_INIT = (payload) => {
    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*${payload.repository.full_name} is deploying...*`
                },
                "accessory": {
                    "type": "image",
                    "image_url": "https://media4.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif?cid=ecf05e47kpv37pdsny9ruerjn0p4t1u0brd9o3cuqit4jswx&rid=giphy.gif&ct=g",
                    "alt_text": "cute cat"
                }
            }
        ]
    }
}
