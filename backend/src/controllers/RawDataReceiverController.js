//const connection = require('../database/connection');

module.exports={
    async create(request, response) {
        console.log(request.body)
        const {time, x, y, z} = request.body;

        // TODO: use a database
        //await connection('accel').insert({
        //    x,
        //    y,
        //    z,
        //});

        fs = require('fs');
        fs.writeFile('helloworld.txt',
                     time + ',' +  x + ',' + y + ',' + z + '\n',
                     function (err) {
                       if (err) return console.log(err);
                       console.log('new data saved at helloworld.txt');
        });

        return response.json({'response': time+',x,y,z'});
    }
};
