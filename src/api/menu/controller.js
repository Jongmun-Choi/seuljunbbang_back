
const { v4: uuidv4 } = require("uuid")
const path = require("path")
const dbPool = require("../../database")

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
});



exports.index = (req, res) => {
    res.send('메뉴 목록');
}

exports.newMenu = async (req, res) => {
    const { name, description, price, is_available } = req.body;
    const file = req.files

    if(!name || !price || !file || file.size === 0) {
        return res.status(400).json({message: "필수 정보가 누락되었습니다." });
    }

    let connection;
    try {
        connection = await dbPool.getConnection()
    }catch (error) {
        console.error("연결실패:", error)
        return res.status(500).json({ message: "데이터베이스 연결에 실패했습니다."});
    }

    try {
        await connection.beginTransaction();

        const menuSql = `INSERT INTO Menus (name, description, price, is_available) VALUES (?, ?, ?, ?)`;
        const [menuResult] = await connection.execute(menuSql, [name, description, price, is_available || true]);
        const newMenuId = menuResult.insertId;

        const uploadPromises = file.map(async (image) => {
            const uniqueueFileName = `menus/${newMenuId}-${uuidv4()}.${path.extname(image.originalname).replace('.', '')}`;

            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: uniqueueFileName,
                Body: image.buffer,
                ContentType: image.mimetype
            };

            const command = new PutObjectCommand(params);
            return s3Client.send(command).then(() => {
                const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
                return imageUrl;
            });
        });

        const imageUrls = await Promise.all(uploadPromises);

        const imageSql = `INSERT INTO MenuImages (menu_id, image_url, is_main) VALUES ?`;
        const imageValues = imageUrls.map((url, index) => [newMenuId, url, index === 0]);
        await connection.query(imageSql, [imageValues]);

        await connection.commit();

        res.status(201).json({
            message: '메뉴가 성공적으로 등록되었습니다.',
            menuId: newMenuId,
            imageUrls: imageUrls,
        });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('메뉴 등록 중 에러 발생:', error);
        // TODO: 에러 발생 시 S3에 업로드된 파일 삭제 로직 추가 가능
        res.status(500).json({ message: '메뉴 등록 중 서버 에러가 발생했습니다.' });
    } finally {
        if (connection) connection.release();
    }
}

exports.show = (req, res) => {
    const id = req.params.id;
    res.send('메뉴 상세');
}

exports.edit = (req, res) => {
    const id = req.params.id;
    res.send('메뉴 수정');
}

exports.isSoldOut = (req, res) => {
    const id = req.params.id;
    res.send('메뉴 매진 셋팅');
}

exports.delete = (req, res) => {
    const id = req.params.id;
    res.send('메뉴 삭제');
}