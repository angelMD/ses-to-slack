export default async function template(mailContent) {
  let color = 'warning';
  switch (mailContent.notificationType) {
    case 'Bounce':
      color = 'warning'
    break;
    case 'Complaint':
      color = 'danger;'
    break;
    case 'Delivery':
      color = 'good;'
    break;
  }

  const message = {
    text: 'New Email Notification from AWS',
    attachments: [
      {
        fallback: "You are unable to view",
        attachment_type: "default",
        color: color,
        fields: [
          {
            title: "Type",
            value: mailContent.notificationType,
            short: true
          },
          {
            title: "Environment",
            value: process.env.ENV,
            short: true
          },
          {
            title: "Email",
            value: mailContent.mail.destination.join(),
            short: true
          },
          {
            title: "From",
            value: mailContent.mail.source,
            short: true
          },
          {
            title: "Subject",
            value: mailContent.mail.commonHeaders.subject,
            short: false
          },
        ],
      }
    ]
  };

  return message;
}
