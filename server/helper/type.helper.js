function type(data) {
    const dataType = Object.prototype.toString.call(data).slice(8, -1);
    return dataType.toLowerCase();
}
module.exports = type;
