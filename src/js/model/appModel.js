var appView = require('../view/appView');

var appModel = (function () {
  var itemsData = {};  function getItemsData() {
    $.ajax({
      type: 'POST',
      url: 'http://api.qa.imumk.ru/api/mobilev1/update',
      data: { data: '' },
      dataType: 'json'
    }).done(function (response) {
      handleResponse(response);
    }).fail(function (e) {
      throw new Error(e);
    });
  }

  function handleResponse(response) {
    var items = [];
    var itemsCollection = response.items;
    var itemsLength = itemsCollection.length;
    var i;
    var filteredItem;

    for (i = 0; i < itemsLength; i++) {
      filteredItem = {};
      filteredItem = itemsCollection[i];
      filteredItem.grades = filterGrade(filteredItem.grade);
      items.push(filteredItem);
    }

    itemsData.items = items;

    $.ajax({
      type: 'GET',
      url: './templates/_item.html'
    }).done(function (template) {
      appView.render(template, itemsData);
    }).fail(function (e) {
      throw new Error(e);
    });
  }

  function filterGrade(grade) {
    var fltrGrade;
    var grades;
    var lastGradeIndex;
    if (grade.length === 1) {
      return grade;
    }
    grades = grade.split(';');
    lastGradeIndex = grades.length - 1;
    fltrGrade = grades[0] + '-' + grades[lastGradeIndex];
    return fltrGrade;
  }

  return {
    getItemsData: getItemsData,
    handleResponse: handleResponse
  };
})();

module.exports = appModel;
