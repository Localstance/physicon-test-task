$(document).ready(function () {

  var appModel = (function () {
    var itemsData = {};
    var showcase = $('.main__showcase');
    var itemTemplate;
    function getItemsData() {
      $.ajax({
        type: 'POST',
        url: 'http://api.qa.imumk.ru/api/mobilev1/update',
        data: {'data': ''},
        dataType: 'json'
      }).done(function (response) {
        itemsData = response;
        console.log(response);
        handleResponse();
      }).fail(function (e) {
        console.log(e);
      });
    }

    function handleResponse() {
      $.ajax({
        type: 'GET',
        url: './templates/_item.html'
      }).done(function(data){
        render(data);
      }).fail(function (e) {
        console.log(e);
      });
    }

    function render(template) {
      var compiledTemplate = _.template(template, itemsData);
      $(showcase).append(compiledTemplate);
    }

    function togglePrice() {

    }

    return {
      togglePrice: togglePrice,
      getItemsData: getItemsData,
      handleResponse: handleResponse
    };
  })();

  var appView = (function () {
    var showcase = $('.main__showcase');

    return {};
  })();

  appModel.getItemsData();

});