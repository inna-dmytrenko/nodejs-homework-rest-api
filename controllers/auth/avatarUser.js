const fs = require('fs/promises')

const path = require('path')

const { User } = require('../../models')
const Jimp = require('jimp')

const uploadDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user

  const { originalname, path: tempName } = req.file
  console.log(tempName)
  try {
    const [extention] = originalname.split('.').reverse()
    const newFileName = `avatar_${id}.${extention}`
    const fileName = path.join(uploadDir, newFileName)

    const file = await Jimp.read(tempName)
    file.resize(250, 250).write(tempName)
    await fs.rename(tempName, fileName)
    const avatar = path.join('/avatars', newFileName)
    await User.findByIdAndUpdate(id, { avatarURL: avatar })

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: avatar,
      },
    })
  } catch (error) {
    await fs.unlink(tempName)
  }
}

module.exports = { updateAvatar }
