exports.index = (req, res) => {
    res.send('메뉴 목록');
}

exports.newMenu = (req, res) => {
    res.send('메뉴 생성');
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