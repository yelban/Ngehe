const LineConnect = require('./connect');
const LINE = require('./main.js');

/*
| This constant is for auth/login
| 
| Change it to your authToken / your email & password
*/
const auth = {
	authToken: 'KvRxCrTKaeJ4ivOeE2XFySyhODcPKGk5/lEOVnq5jGvNwIirxXdwm98HAmuzfm5H1LRq5s0NBI9vY7+rvG92TJt8Gx44VYahDSSaTUIY4r+fwCPSWLqSTc0n2c5enEDr0mYsNd0CJfKykHijrZBQWAdB04t89/1O/w1cDnyilFU=',
	certificate: '2bd246b73a74988a6002f7bdee297915',
	email: '',
	password: ''
}

let client = new LineConnect();
//let client =  new LineConnect(auth);

client.startx().then(async(res) => {
	while (true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch (error) {
			console.log('error', error)
		}
		for (let op in ops) {
			if (ops[op].revision.toString() != -1) {
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
		//LINE.aLike() //AutoLike (CAUSE LAG)
	}
});