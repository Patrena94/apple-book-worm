const router = require('express').router();
const path = require('path');
const apiRoutes = require('./api');

router.use('api', apiRoutes);

//serve up react front-end in production

router.use((req, res) =>{
    res.sendFile(path.join(__dirname,'../../client/build/index.html'));
});
moudule.exports=router;