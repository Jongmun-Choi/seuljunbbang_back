const generateToken = require("./jwt");

exports.register = async (req, res) => {
    try {
        const userInfo = {id: 1, name:"홍길동" };
        const token = await generateToken(userInfo);
        res.json({result: "ok", access_token: token});
    }catch (error) {
        res.status(500).json({result: "fail", message: error.message});
    }
}

exports.phone = (req, res) => {
    res.send("인증 번호 발송");
}

exports.phoneVerify = (req, res) => {
    const {code} = req.body;
    //const code = req.body.code;

    if(code === "123456") {
        res.json({result: "ok", message: "성공"});
        return;
    }

    res.json({result: "fail", message:"인증 번호가 맞지 않습니다."});

}

exports.login = async (req, res) => {
    try {
        const userInfo = {id: 1, name:"홍길동" };
        const token = await generateToken(userInfo);
        res.json({result: "ok", access_token: token});
    }catch (error) {
        res.status(500).json({result: "fail", message: error.message});
    }
}

exports.show = (req, res) => {
    res.send("마이페이지");
}

exports.update= (req, res) => {
    res.send("마이페이지 업데이트");
}

exports.logout = (req,res) => {
    res.send("로그아웃");
}