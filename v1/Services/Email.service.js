import nodemailer from 'nodemailer'
import Imap from 'imap'
import { inspect } from 'util'

export class Email {
  static async send(to, subject, message, from, fromPassword, cc) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.NODE_ENV === 'production' ? 465 : 587,
        secure: process.env.NODE_ENV === 'production',
        auth: {
          user: from,
          pass: fromPassword,
        },
      })

      await transporter.sendMail({
        from,
        to,
        subject,
        text: message,
        cc: cc || '',
      })

      return 'Email sent successfully.'
    } catch (error) {
      console.log('🚀 ~ file: Email.service.js ~ line 27 ~ error: ', error)
      return { error, message: 'email not sent' }
    }
  }

  static async reveive() {
    const imap = new Imap({
      user: process.env.EMAIL_SUPPORT_EMAIL,
      password: process.env.EMAIL_SUPPORT_PASSWORD,
      host: 'imap.dreamhost.com',
      port: 993,
      tls: true,
    })

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb)
    }

    imap.once('ready', () => {
      openInbox((err, box) => {
        if (err) throw err
        const f = imap.seq.fetch(`${box.messages.total}:*`, {
          bodies: ['HEADER.FIELDS (FROM)', 'TEXT'],
        })
        f.on('message', (msg, seqno) => {
          console.log('Message #%d', seqno)
          const prefix = `(#${seqno}) `
          msg.on('body', (stream, info) => {
            if (info.which === 'TEXT')
              console.log(
                `${prefix}Body [%s] found, %d total bytes`,
                inspect(info.which),
                info.size
              )
            let buffer = ''
            let count = 0
            stream.on('data', (chunk) => {
              count += chunk.length
              buffer += chunk.toString('utf8')
              if (info.which === 'TEXT')
                console.log(
                  `${prefix}Body [%s] (%d/%d)`,
                  inspect(info.which),
                  count,
                  info.size
                )
            })
            stream.once('end', () => {
              if (info.which !== 'TEXT')
                console.log(
                  `${prefix}Parsed header: %s`,
                  inspect(Imap.parseHeader(buffer))
                )
              else
                console.log(`${prefix}Body [%s] Finished`, inspect(info.which))
              console.log(buffer.toString(), '  <-- Here is the body')
            })
          })
          msg.once('attributes', (attrs) => {
            console.log(`${prefix}Attributes: %s`, inspect(attrs, false, 8))
          })
          msg.once('end', () => {
            console.log(`${prefix}Finished`)
          })
        })
        f.once('error', (err) => {
          console.log(`Fetch error: ${err}`)
        })
        f.once('end', () => {
          console.log('Done fetching all messages!')
          imap.end()
        })
      })
    })
    imap.once('error', (err) => {
      console.log(err)
    })
    imap.once('end', () => {
      console.log('Connection ended')
    })
    imap.connect()
  }
}
