const Contact = require('../models/contact');

exports.getAddContact = (req, res, next) => {
  res.render('add-contact', {
    title: 'Add Product',
    path: '/add-product',
    editing: false
  });
};

exports.postAddContact = (req, res, next) => {
  const {name} = req.body;
  const {email} = req.body;
  const {address} = req.body;
  const {phoneNumber} = req.body;
  const contact = new Contact({
    name,
    email,
    phoneNumber,
    address,
    userId: req.user
  });
  contact
    .save()
    .then(result => {
      res.redirect('/contacts');
    })
    .catch(error => {
      {throw error};
    });
};

exports.getEditContact = (req, res, next) => {
  const editMode = req.query.edit;
  
  if (!editMode) {
    return res.redirect('/');
  }
  const {contactId} = req.params;
  Contact.findById(contactId)
    .then(contact => {
      if (!contact) {
        return res.redirect('/');
      }
      res.render('add-contact', {
        title: 'Edit Contact',
        path: '/edit-contact',
        editing: editMode,
        contact
      });
    })
    .catch(error => {throw error});
};

exports.postEditContact = (req, res, next) => {
  const {contactId} = req.body;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedPhoneNumber = req.body.phoneNumber;
  const updatedAddress = req.body.address;

  Contact.findById(contactId)
    .then(contact => {
      contact.name = updatedName;
      contact.email = updatedEmail;
      contact.phoneNumber = updatedPhoneNumber;
      contact.address = updatedAddress;
      return contact.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/contacts');
    })
    .catch(error => {throw error});
};

exports.getContacts = (req, res, next) => {
  Contact.find({userId:req.user._id})
    .then(contacts => {
      res.render('contacts', {
        contacts,
        title: 'Contacts',
        path: '/contact'
      });
    })
    .catch(error => {throw error});
};

exports.postDeleteContact = (req, res, next) => {
  const {contactId} = req.body;
  Contact.findByIdAndRemove(contactId)
    .then(() => {
      res.redirect('/contacts');
    })
    .catch(error => {throw error});
};
