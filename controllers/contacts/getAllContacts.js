const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query
  const skip = (page - 1) * limit
  console.log(skip)
  const result = await Contact.find({ owner: req.user._id }, '_id mail owner', {
    skip,
    limit: +limit,
  })
  sendSuccessRes(res, { result })
}
module.exports = getAllContacts
