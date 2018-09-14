const fs = require('fs-extra')
const path = require('path')

const debug = require('@ff0000-ad-tech/debug')
var log = debug('cs-plugin-vendor-indexes:packager')

function createVendorPackage(profileName, targets) {
	log('createVendorPackage()')
	const dir = './4-vendor/' + profileName + '/'
	fs.emptyDirSync(dir)

	Object.keys(targets).forEach(target => {
		const filePath = '.' + targets[target]
		const filePathSplit = filePath.split(path.sep)
		filePathSplit.pop()
		const folderName = filePathSplit.pop()
		log('\t item:', target, '|', filePath, '|', folderName)

		const dirTrafficAd = dir + folderName
		fs.emptyDirSync(dirTrafficAd)
		fs.copy(filePath + '/index.html', dirTrafficAd + '/index.html', err => {
			if (err) return console.error(err)
			log('to_traffic index.html success')
		})

		fs.readdir(filePath, function(err, items) {
			console.log('BACKUPS ' + items)

			var item
			for (var i = 0; i < items.length; i++) {
				item = items[i]
				console.log('Backups   ' + item)
				if (item.indexOf('.jpg') > -1) {
					fs.copy(filePath + '/' + item, dirTrafficAd + '/' + item, err => {
						if (err) return console.error(err)
						log('to_traffic backup success')
					})
				}
			}
		})
	})
}

module.exports = {
	createVendorPackage
}
