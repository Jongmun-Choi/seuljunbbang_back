const repository = require('./repository');

exports.upload = async (req, res) => {
    const file = req.file;

    const { affectedRows, insertID } = await repository.create(file.originalname, file.path);

}