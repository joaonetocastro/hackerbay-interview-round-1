const Jimp = require('jimp');

module.exports = {
  index(req, res) {
    const { url } = req.body;
    if (!url || url === '' || typeof url !== 'string') {
      return res.status(400).send({ err: 'You should send a image URL' });
    }
    return Jimp.read(url, (err, img) => {
      if (err) {
        return res.status(500).send({ err: "Couldn't resize image" });
      }
      return img.resize(50, 50).getBase64(Jimp.AUTO, (e, img64) => res.send(`<img src="${img64}"/>`));
    });
  },
};
