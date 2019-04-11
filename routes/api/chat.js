const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Chat model
const Chat = require('../../models/Chat');

// Validation
const validateChatInput = require('../../validation/chat');


// @route   GET api/chat/test
// @desc    Tests chat route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: 'Chat Works'
}));

// @route   GET api/chat
// @desc    Get chats
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(chat => res.json(chat))
    .catch(err => res.status(404).json({
      nochatfound: 'No Chat found'
    }));
});


// @route   POST api/chat
// @desc    Create chat
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateChatInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Chat.findById(req.params.id)
      .then(chat => {
        const newMessage = {
          message: req.body.text,
        };

        // Add to message array
        chat.messages.unshift(newMessage);

        // Save
        chat.save().then(chat => res.json(chat));
      })
      .catch(err => res.status(404).json({
        chatnotfound: 'No chat found'
      }));
  }
);