

const express = require('express');

const contactsConrtroller = require('../controllers/contacts');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-contact', isAuth, contactsConrtroller.getAddContact);

router.get('/contacts', isAuth, contactsConrtroller.getContacts);

router.post('/add-contact', isAuth, contactsConrtroller.postAddContact);

router.get('/edit-contact/:contactId', isAuth, contactsConrtroller.getEditContact);

router.post('/edit-contact', isAuth, contactsConrtroller.postEditContact);

router.post('/delete-contact', isAuth, contactsConrtroller.postDeleteContact);

module.exports = router;
