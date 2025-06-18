const express = require("express");
const router = express.Router();

// const multer = require("multer");
// const upload = multer({dest: "storage/"});

const webController = require("./web/controller");

const apiMenuController = require('./api/menu/controller');
const apiUserController = require('./api/users/controller');

const { logRequestTime } = require("./middleware/log");

router.use(logRequestTime);

// router.post("/file", upload.single("file"), (req, res) => {
//     console.log(req.file);
//     res.json(req.file)
// });

router.get("/", webController.home);
router.get("/page/:route", webController.page);

router.post("/auth/phone", apiUserController.phone);
router.put("/auth/phone", apiUserController.phoneVerify);
router.post("/auth/register", apiUserController.register);
router.post("/auth/login", apiUserController.login);
router.post("/auth/logout", apiUserController.logout);
router.post("/api/user/my", apiUserController.update);
router.get("/api/user/my", apiUserController.show);

router.get("/api/menu", apiMenuController.index);
router.post("/api/menu", apiMenuController.newMenu);
router.get("/api/menu/:id", apiMenuController.show);
router.put("api/menu/:id", apiMenuController.edit);
router.delete("/api/menu/:id", apiMenuController.delete);

module.exports = router;