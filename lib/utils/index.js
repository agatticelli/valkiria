module.exports = {
  typeof: obj => {
    return ({})
        .toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
  },
};
