const express = require('express');
const nodemailer = require('nodemailer');
const Notification = require('../models/notifications');
const router = express.Router();



// Route to send notifications and store them
router.post('/send-to-users', async (req, res) => {
  const { type, recipients, subject, message } = req.body;

  try {
    if (!recipients || recipients.length === 0) {
      return res.status(400).json({ success: false, message: 'No recipients provided' });
    }

    // Send email notifications if type is email
    if (type === 'email') {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Hotel Notifications" <${process.env.SMTP_USER}>`,
        to: recipients.join(','),
        subject,
        text: message,
      };

      await transporter.sendMail(mailOptions);
    } else {
      return res.status(400).json({ success: false, message: 'Unsupported notification type' });
    }

    // Save notifications in the database
    const notificationsToSave = recipients.map((recipient) => ({
      type,
      recipient,
      subject,
      message,
    }));
    await Notification.insertMany(notificationsToSave);

    res.status(200).json({ success: true, message: 'Notifications sent and saved successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send notification' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ success: false, message: 'Failed to delete notification' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    if (!notifications.length) {
      return res.status(404).json({ success: false, message: 'No notifications found' });
    }
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
