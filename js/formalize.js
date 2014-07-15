(function( $ ){
  $.fn.formalize = function(options){
    var settings = $.extend({
      section: 'fieldset',
      wrapper: '.form-section',
      navType: 'section',
      prevNav: '.form-nav-prev',
      nextNav: '.form-nav-next',
      timing: 0,
      nextCallback: null,
      prevCallback: null
    }, options),
    form = this,
    sections = [];
    form.find(settings.wrapper).each(function(){
      sections.push($(this));
    });
    var sectionsCount = sections.length;

    // when setting up the form
    for (var i = 1; i < sectionsCount; i++){
      sections[i].hide();
    };
    showSection(form.find($(settings.section)).first());

    // when user navigates forwards
    $(settings.nextNav).on('click', function(){
      if (settings.navType === 'section'){
        showNextSection($(this).closest(settings.section));
      }
      else if (settings.navType === 'global'){
        if (!lastSectionIsOpen()){
          showNextSection(form.find($('.open')));
        }
      }
    })

    // when user navigates backwards
    $(settings.prevNav).on('click', function(){
      if (settings.navType === 'section'){
        showPrevSection($(this).closest(settings.section));
      }
      else if (settings.navType === 'global'){
        if (!firstSectionIsOpen()){
          showPrevSection(form.find($('.open')));
        }
      }
    })

    // showing moving forward in the form.
    // first, we check to make sure that if there is a callback,
    // that it returns true.
    function showNextSection(curr){
      if (settings.nextCallBack != null){
        if (settings.nextCallBack()){
          hideSection(curr);
          showSection(curr.next());
        }
      }
      else{
        hideSection(curr);
        showSection(curr.next());
      }
    };

    // moving backwards in the form.
    // as with showNextSection(curr),
    // we first check what the callback returns.
    function showPrevSection(curr){
      if (settings.prevCallBack != null){
        if (settings.prevCallBack()){
          hideSection(curr);
          showSection(curr.prev());
        }
      }
      else{
        hideSection(curr);
        showSection(curr.prev());
      }
    };

    function hideSection(section){
      section.find(settings.wrapper).slideUp(settings.timing);
      section.removeClass('open');
    };

    function showSection(section){
      section.find(settings.wrapper).slideDown(settings.timing);
      section.addClass('open');
      if (settings.navType === 'global'){
        if (lastSectionIsOpen()){
          lastNav();
        }
        else if (firstSectionIsOpen()){
          firstNav();
        }
        else{
          intermediateNav();
        }
      }
    };

    function firstSectionIsOpen(){
      return (form.find($('.open'))[0] == form.find($(settings.section)).first()[0]);
    };

    function lastSectionIsOpen(){
      return (form.find($('.open'))[0] === form.find($(settings.section)).eq(sectionsCount - 1)[0]);
    };

    function firstNav(){
      setDisabled($(settings.prevNav));
      setEnabled($(settings.nextNav));
    };

    function lastNav(){
      setEnabled($(settings.prevNav));
      setDisabled($(settings.nextNav));
    };

    function intermediateNav(){
      setEnabled($(settings.prevNav));
      setEnabled($(settings.nextNav));
    };

    function setDisabled(elt){
      elt.addClass('disabled');
    }

    function setEnabled(elt){
      elt.removeClass('disabled');
    }

  };
}(jQuery));
