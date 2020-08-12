module.exports={
    async create(request, response) {
        console.log(request.body)
        const {time, x, y, z} = request.body;

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
