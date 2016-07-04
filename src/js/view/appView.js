var appModel = require('../model/appModel'); //eslint-disable-line

var appView = (function () {
  var showcase = $('.main__showcase');
  var priceSwitcher = $('#filter__price');
  var subjectSwitcher = $('#filter__subject');
  var genreSwitcher = $('#filter__genre');
  var gradeSwitcher = $('#filter__class');

  function togglePrice() {
    var pricesRub = $('.price-rub');
    var pricesBonus = $('.price-bonus');
    var currency = $(this).val();
    if (currency === 'R') {
      $(pricesBonus).addClass('hidden');
      $(pricesRub).removeClass('hidden');
    } else {
      $(pricesRub).addClass('hidden');
      $(pricesBonus).removeClass('hidden');
    }
  }

  function toggleSubjectItems() {
    var showcaseItems = $('.showcase__item');
    var showcaseItemsNonHidden = $('.showcase__item:not(.hidden)');
    var selectedSubject = $(this).val();
    var itemsToShow;
    if (selectedSubject === 'all') {
      $(showcaseItems).removeClass('hidden');
      return;
    }
    itemsToShow = $(showcase).find('*[data-subject="' + selectedSubject + '"]');
    $(showcaseItemsNonHidden).addClass('hidden');
    $(itemsToShow).removeClass('hidden');
  }

  function toggleGenreItems() {
    var showcaseItems = $('.showcase__item');
    var showcaseItemsNonHidden = $('.showcase__item:not(.hidden)');
    var selectedGenre = $(this).val();
    var itemsToShow;
    if (selectedGenre === 'all') {
      $(showcaseItems).removeClass('hidden');
      return;
    }
    itemsToShow = $(showcase).find('*[data-genre="' + selectedGenre + '"]');
    $(showcaseItemsNonHidden).addClass('hidden');
    $(itemsToShow).removeClass('hidden');
  }

  function toggleGradeItems() {
    var showcaseItems = $('.showcase__item');
    var selectedGrade = ($(this).val()).toString();
    var gradesRange;

    if (selectedGrade === 'all') {
      $(showcaseItems).removeClass('hidden');
      return;
    }

    $(showcaseItems).addClass('hidden');
    $(showcaseItems).each(function () {
      var i;
      gradesRange = ($(this).data('grades')).toString();
      gradesRange = gradesRange.split(';');
      for (i = 0; i < gradesRange.length; i++) {
        if (gradesRange[i] === selectedGrade) {
          $(this).removeClass('hidden');
        }
      }
    });
  }

  function render(template, data) {
    var compiledTemplate = _.template(template, data); //eslint-disable-line
    $(showcase).append(compiledTemplate);
  }

  $(priceSwitcher).on('change', togglePrice);
  $(subjectSwitcher).on('change', toggleSubjectItems);
  $(genreSwitcher).on('change', toggleGenreItems);
  $(gradeSwitcher).on('change', toggleGradeItems);

  return {
    render: render
  };
})();

module.exports = appView;
