export function safeSelect($w, selector) {
  try {
    return $w(selector);
  } catch (error) {
    return null;
  }
}

export function forEachExisting($w, selectors, callback) {
  selectors.forEach((selector) => {
    const element = safeSelect($w, selector);
    if (element) {
      callback(element, selector);
    }
  });
}

export function onClickIfExists($w, selector, handler) {
  const element = safeSelect($w, selector);
  if (element) {
    element.onClick(handler);
  }
}

export function showIfExists($w, selector, effectName, effectOptions) {
  const element = safeSelect($w, selector);
  if (!element) {
    return;
  }

  if (effectName) {
    element.show(effectName, effectOptions);
    return;
  }

  element.show();
}

export function collapseIfExists($w, selector) {
  const element = safeSelect($w, selector);
  if (element && typeof element.collapse === 'function' && !element.collapsed) {
    element.collapse();
  }
}

export function expandIfExists($w, selector) {
  const element = safeSelect($w, selector);
  if (element && typeof element.expand === 'function' && element.collapsed) {
    element.expand();
  }
}
