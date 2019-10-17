export default () => {
  var length = 10,
    charset = "abcdefghjkmnpqrstuvwxyz123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};
