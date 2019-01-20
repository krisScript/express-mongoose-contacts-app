const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contactsData: {
    contacts: [
      {
        contactId: {
          type: Schema.Types.ObjectId,
          ref: 'Contact',
          required: true
        }
      }
    ]
  }
});

userSchema.methods.addContact = contact => {
  const contactIndex = this.contactsData.contacts.findIndex(cp => {
    return cp.contactId.toString() === contact._id.toString();
  });
  const updatedContacts = [...this.contactsData.contacts];

    updatedContacts.push({
      contactId: contact._id,
    });
  
  const updatedContactsData = {
    contacts: updatedContacts
  };
  this.contactsData = updatedContactsData;
  return this.save();
};

userSchema.methods.removeContact = contactId => {
  const updatedContacts = this.contactsData.contacts.filter(item => {
    return item.contactId.toString() !== contactId.toString();
  });
  this.contactsData.contacts = updatedContacts;
  return this.save();
};

userSchema.methods.clearContacts = () => {
  this.contactsData = { contacts: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
