const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const addContacts = async (req, res) => {
  console.log(req.user)
  const result = await Contact.create({ ...req.body, owner: req.user._id })
  console.log(req)
  sendSuccessRes(res, { result }, 201)
}
module.exports = addContacts
