module.exports = function (g) {
  g.initConfig({
    bower: {
      copy: {
        options: {
          targetDir: './app',
          install: false,
          layout: function (type) { return type; }
        }
      }
    }
  });

  g.loadNpmTasks('grunt-bower-task');
};