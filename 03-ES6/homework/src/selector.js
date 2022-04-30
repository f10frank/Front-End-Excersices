var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien
  if(matchFunc(startEl)) {
    resultSet.push(startEl);
  }
  // TU CÓDIGO AQUÍ
  for(let i = 0; i < startEl.children.length; i++) {
    let elements = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...elements];
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

/**
 * selectorTypeMatcher('#princial'); --> id
 * selectorTypeMatcher('.secundario'); --> class
 * selectorTypeMatcher('div'); --> tag
 * selectorTypeMatcher('div.tercer'); --> tag.class
 */

var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] == '#') return 'id';
  if(selector[0] == '.') return 'class';
  if(selector.split('.').length > 1) return 'tag.class';  // divide el array en 2 array si tiene punto
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);   // devuelve id - class - tag -tagclass
  var matchFunction;
  if (selectorType === "id") { 
    matchFunction = function (element) {
      return "#" + element.id === selector;
    }
  } else if (selectorType === "class") {
    matchFunction = function(element) {
      let classes = element.classList;      // El atributo classList devuevle la lista de las clases
      // classes.forEach(e => {if(`.${e}` === selector) return true;});
      //return false;
      for(let i = 0; i < classes.length; i++) {
        if(`.${classes[i]}` === selector) return true;
      }
      return false;
    }
    
  } else if (selectorType === "tag.class") {
    matchFunction = function (element) {
      var [tagBuscar, classBuscar] = selector.split('.');   //['p', 'small']
      return matchFunctionMaker(tagBuscar)(element) && matchFunctionMaker(`.${classBuscar}`)(element);
    }
  } else if (selectorType === "tag") {
    matchFunction = function (element) {
      return element.tagName.toLowerCase() === selector;
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
