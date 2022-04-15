const Clarifai = require('clarifai');




const app = new Clarifai.App({
    apiKey: 'b0156915221645458e1105fbe5e9738c'
});


const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unabe to work with API'))
}



const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => [
        res.json(entries[0].entries)
    ])
    .catch(err => res.status(400).json('unable to get entries'))
}



module.exports = {
    handleImage,
    handleApiCall
}