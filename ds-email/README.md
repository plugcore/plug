
![plugcore.com](https://raw.githubusercontent.com/plugcore/plug/master/_docs/logo.png "plugcore.com")

## @plugcore/ds-email

[![https://nodei.co/npm/@plugcore/ds-email.png?downloads=false&downloadRank=false&stars=false](https://nodei.co/npm/@plugcore/ds-email.png?downloads=false&downloadRank=false&stars=false)](https://www.npmjs.com/package/@plugcore/ds-email)

Documentation can be found at [the wiki](https://github.com/plugcore/plugcore/wiki/Email-connection).
 
## Datasource: Email
 
This utility will help connect to an Email server (ex: SMTP server, GMAIL, Outlook 365, etc)  to send our emails. It uses the [datsources system](https://github.com/plugcore/plugcore/wiki/Datasources-configuration),
where every instance of the client will target an specific email server.
 
Internally it uses [nodemailer](https://nodemailer.com/about/) to connect to any email server, but it also adds some helper functions to connect to a Google API Gmail account, which can be very helpful if you are using a gmail account to send your emails, or a GSuite account, where you can configure SPF, DKIM or DMARC records to secure your emails and evade SPAM filters.
 
## Configuration
 
Inside our configuration file, for example `{PROJECT_ROOT}/configuration/configuration.json`, we will have to add a new
entry for each email server we want to connect, like in this example:
 
```
{
    "connections": {
        "myemail": { // Connection id
            "type": "email", // Datasource type
            "host": "smtp.email.com", // SMTP Host
            "port": 587, // SMTP port
            "secure": false, // true for 465, false for other ports
            "auth": {
                "user": "user", // User/email
                "pass": "password",
            },
            "defaultFrom": { // Email address that will be used to send the emails
                "name": "Company name",
                "address": "info@company.com"
            }
        },
        ...
    },
    ...
}
```

For more information about configuration you can go to: [https://nodemailer.com/smtp/](https://nodemailer.com/smtp/)

## Usage
 
Once the connection is defined in the configuration we are ready to create a service decorated with `@Service({ connection: 'myemail' })`
that will be able to send emails through the configured server. 
 
Basic example:
 
```typescript
import { MailOptions, EmailAddress } from '@plugcore/ds-email';
 
// Service that will use the connection we defined before
@Service({ connection: 'myemail' })
export class EmailService { 
 
    constructor(
        // Connection to "myemail"
        private emailDataSource: EmailDataSource
    ) {}
 
    // Basic example
 
    public async sendEmail() {
        await this.emailDataSource.sendEmail(<MailOptions>{
            from: 'info@company.com', // This field optional and it's recommended to leave it empty so the system will use the 
                                      // "defaultFrom" property from the configuration file
            to: <EmailAddress>{ name:'Customer Al', address: 'al@other.com' },
            cc: [
                'test@company.com',
                { name:'Admin', address: 'admin@company.com' }
            ],
            subject: 'New receipt',
            html: `
                <div>
                    <img src="cid:embeddedlogo" title="Company logo">
                </div>
                <h2>Hi this is a title</h2>
                <p>This is text</p>
            `,
            attachments: [
                {
                    filename: 'logo.png',
                    path: '/path/to/logo.png',
                    cid: 'embeddedlogo'
                },
                {
                    filename: 'receipt.pdf',
                    content: createReadStream('/path/to/local/file.pdf')
                }
            ]
        });
    }
  
}
```
 
You can learn more about MailOptions at [https://nodemailer.com/message/](https://nodemailer.com/message/) and form file attch options at [https://nodemailer.com/message/attachments/](https://nodemailer.com/message/attachments/)

# Google API
 
In order to send emails safely using Google Suite accounts, we have created a special configuration. You can learn how to create your Oauth 2.0 certificate here: [https://developers.google.com/gmail/api/auth/web-server](https://developers.google.com/gmail/api/auth/web-server), after this you will have to configure the datasource like in this example:
 
```
{
    "connections": {
        "myemail": { // Connection id
            "type": "email", // Datasource type
            "defaultFrom": {
                "name": "Company name",
                "address": "info@company.com"
            },
            "gSuiteApi": {
                    "clientEmail": "example@supple-hangout-999999.iam.gserviceaccount.com",
                    "privateKey": "-----BEGIN PRIVATE KEY-----\nabc123...ab123==\n-----END PRIVATE KEY-----\n", // Important to scape the new lines with "\n"
                    "userId": "info@company.com" // Same value as from address
            }
        },
        ...
    },
    ...
}
```
 
With this you will be able to send emails through the Gmail API instead of an SMTP server.
 