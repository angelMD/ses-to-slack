import {simpleParser} from 'mailparser';
import Slack from './slack';

async function processContent(content) {
  const mail = await simpleParser(content);
  const message = `
\`From:\` ${mail.from.text}
\`Subject:\` ${mail.subject}

${mail.text}
`;
  const slack = new Slack(process.env.WEBHOOK);
  return await slack.send(message);
}

async function processEvent(event) {
  return Promise.all(event.Records.map(record => {
    const {content} = JSON.parse(record.Sns.Message);
    return processContent(content);
  }));
}

export function handle(event, context, callback) {
  processEvent(event)
    .then(value => callback(null, value))
    .catch(err => callback(err, null));
}