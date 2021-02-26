const fs = require("fs")

function Flux(settings) {
	this.data = {}
	this.settings = settings
	this.path = `${this.settings.name.toLowerCase()}.flux`

	try { this.data = JSON.parse(fs.readFileSync(this.path)) } catch(err){}
	try { this.stats = fs.statSync(this.path) } catch(err) {}
	if (!this.stats) { fs.writeFileSync(this.path, JSON.stringify({}, null)) }

	Flux.prototype.set = (key, value) => {
		this.data[key] = value
		asyncFileWrite(this.path, this.data)
	}

	Flux.prototype.has = (key) => {
	  return this.data.hasOwnProperty(key)
	};

	Flux.prototype.get = (key) => {
		const call = this.data.hasOwnProperty(key) ? this.data[key] : undefined
		return call
	}

	Flux.prototype.delete = (key) => {
		const call = this.data.hasOwnProperty(key) ? delete this.data[key] : false
		asyncFileWrite(this.path, this.data)
		return call
	}

	Flux.prototype.getAll = () => {
		return [this.data]
	}

	Flux.prototype.deleteAll = () => {
		const call = this.data = {}
		asyncFileWrite(this.path, this.data)
		return true
	}

	async function asyncFileWrite(path, content) {
		fs.writeFileSync(path, JSON.stringify(content, null, 2))
	}
}

module.exports = Flux