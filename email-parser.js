const Imap = require('imap');
const { simpleParser } = require('mailparser');
const Ticket = require('./models/Ticket');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const imap = new Imap({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  port: 993,
  tls: true
});

imap.once('ready', function () {
  imap.openBox('INBOX', false, () => {
    imap.search(['UNSEEN'], (err, results) => {
      if (!results || !results.length) {
        imap.end();
        return;
      }

      const fetch = imap.fetch(results, { bodies: '' });
      fetch.on('message', (msg) => {
        msg.on('body', async (stream) => {
          const parsed = await simpleParser(stream);
          const ticket = new Ticket({
            title: parsed.subject,
            description: parsed.text,
            category: 'Email',
            isGrievance: false
          });
          await ticket.save();
        });
      });
      fetch.on('end', () => imap.end());
    });
  });
});

imap.connect();
