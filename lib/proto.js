Array.prototype.remove = function(index){
	i = this.indexOf(index)
	if (i > -1) {
		this.splice(i, 1);
	}
	return this
}
Array.prototype.random = function () {
	const obj = (array) => array[Math.floor(Math.random() * array.length)];
	return obj(this);
};
String.prototype.italic = function(){
	return `_${this}_`
}
String.prototype.bolds = function(){
	return `*${this}*`
}