const fs = require('fs-extra')
const path = require('path')

const debug = require('debug')
var log = debug('cs-plugin-vendor-indexes:compiler')

function createVendorPackage(profileName, targets) {
	console.log('createVendorPackage()')
	const dir = './4-vendor/' + profileName + '/'
	fs.emptyDirSync(dir)

	Object.keys(targets).forEach(target => {
		const filePath = '.' + targets[target]
		const filePathSplit = filePath.split(path.sep)
		filePathSplit.pop()
		const folderName = filePathSplit.pop()
		console.log('\t item:', target, '|', filePath, '|', folderName)	

		const dirTrafficAd = dir + folderName
		fs.emptyDirSync(dirTrafficAd)
		fs.copy(filePath + '/index.html', dirTrafficAd + '/index.html', err => {
			if (err) return console.error(err)
			console.log('to_traffic index.html success')
		})

		fs.copy(filePath + '/backup.jpg', dirTrafficAd + '/backup.jpg', err => {
			if (err) return console.error(err)
			console.log('to_traffic backup.jpg success')
		})
	})
}

module.exports = {
	createVendorPackage
}