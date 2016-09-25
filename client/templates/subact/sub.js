Template.subItem.helpers({
  rollupFormat: function() {
    return this.rollup.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
})