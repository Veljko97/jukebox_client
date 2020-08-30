

const config = {

  getHostName() {
    return 'localhost:8080';
  },

  getApiUrl() {
    return 'http://' + this.getHostName() + '/api';
  },

};

export { config };
