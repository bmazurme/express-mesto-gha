const reg = /^((http|https):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;
const isLink = (link) => reg.test(link);

module.exports = { isLink, reg };
