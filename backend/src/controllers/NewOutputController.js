const fileName = '../../assets/testFile.txt'
path = require('path')
filePath = path.join(__dirname, fileName);

module.exports={
    async create(request, response) {

        fs = require('fs');
        fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
            console.log(err);
            console.log(path)
             return response.json({'response': 'fail!'});
        }
            console.log('found:' + data);
            return response.json({'response': data});
        });
    }
};
