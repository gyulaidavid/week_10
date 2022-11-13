const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const port = 4000

const path = require ('path');
//fs = filesistem
// require szóval importálunk.
const fs = require('fs')


//endpoint ez is; kötelező megadni a json formátumot, ez a script.js-ben is így van hozzá kell igazítani ezt is, különben console.log nem írja ki.
app.use(express.json())
app.use(fileUpload())

//kép küldése csak form data-val lehet, kép nem string


//endpoint, a főoldal letöltését szolgálja
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.get('/about', (reg, res) => {
	res.send("hello")
})


//endpoint
app.use('/public', express.static(`${__dirname}/../frontend/public`))

//endpoint created, frontendet hozzáigazítani: script.js fetch-et átírtuk uploadra
app.post('/upload', (request, response) => { //első mindig a kérés - request, második a válasz - response
	console.log(request.body);
	fs.writeFile(`${__dirname}/data/userdata.json`, JSON.stringify(request.body, null, 4), (error) => {
		if(error) {
			console.log(error);
			return response.status(500).send(error)
		}else {response.status(200).send('ok')}
	} )
	
})
//file upload strats
app.post('/upload-image', (request, response) => {
	if (!request.files) {
		return response.status(400).send('No file were uploaded')
	}
	const picture = request.files.file
	const picName = request.body.fileName
	console.log(picName);

	picture.mv(`${__dirname}/data/${picName}.jpg`, (error) => {
		if(error) {
			console.log(error);
			return response.status(500).send(error)
		} else {
			response.status(200).send('Image saved.')
		}

	}) //mv => moove átmozgatja mappába
});



// app.get('/style.css', (req, res) => {
// 	res.sendFile(path.join(`${__dirname}/../frontend/style.css`))
//   })

// app.get('/script.js', (req, res) => {
// 	res.sendFile(path.join(`${__dirname}/../frontend/script.js`))
//   })
console.log(module);

app.listen(port, () => {
  console.log(`server is running @: http://127.0.0.1:${port}`)
})