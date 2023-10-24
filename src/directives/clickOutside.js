// clickOutside.js
export const clickOutside = {
    beforeMount: (el, binding) => {
      el.clickOutsideEvent = event => {
        // check that click was outside the el and his childrens
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event);  // if outside call method provided in attribute value
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted: (el) => {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    },
  };
  