//const connection = require('../database/connection');
const date = new Date();

module.exports={
    async create(request, response) {
        console.log(request.body)
        formatedcsvs = request.body.map(function(arg) {
                                                        return arg['time'] + ',' +
                                                               arg['x']    + ',' +
                                                               arg['y']    + ',' +
                                                               arg['z']}).join("\n")
        const {time, x, y, z} = request.body[0];

        console.log('--------------------')
        console.log(request.body[0]);
        console.log({time, x, y, z});
        console.log(formatedcsvs)

        // TODO: use a database
        //await connection('accel').insert({
        //    x,
        //    y,
        //    z,
        //});

        fs = require('fs');
        fs.writeFile(date.getTime() + '.csv',
                     formatedcsvs + '\n',
                     function (err) {
                       if (err) return console.log(err);
                       console.log('new data saved at helloworld.txt');
        });

        return response.json({'response': 'saved!'});
    }
};
