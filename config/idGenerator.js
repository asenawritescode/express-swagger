const generateId = () => {
    const randomId = Math.random().toString(36);
    return randomId.slice(2, 11);
  };

module.exports = {
    generateId
}