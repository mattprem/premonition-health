import wixWindow from 'wix-window';
import { safeSelect } from 'public/siteUtils';

function isReducedMotionMode() {
  return wixWindow.formFactor === 'Mobile';
}

export function revealOnEnter($w, selectors, options = {}) {
  const effectName = options.effectName || 'fade';
  const duration = options.duration || 220;

  selectors.forEach((selector) => {
    const element = safeSelect($w, selector);
    if (!element || typeof element.onViewportEnter !== 'function') {
      return;
    }

    if (!isReducedMotionMode()) {
      element.hide();
    }

    let hasRevealed = false;
    element.onViewportEnter(() => {
      if (hasRevealed) {
        return;
      }

      hasRevealed = true;
      if (isReducedMotionMode()) {
        element.show();
        return;
      }

      element.show(effectName, { duration });
    });
  });
}

export function setupAccordion($w, items) {
  items.forEach(({ trigger, panel, iconOpen, iconClosed }) => {
    const triggerElement = safeSelect($w, trigger);
    const panelElement = safeSelect($w, panel);

    if (!triggerElement || !panelElement || typeof panelElement.collapse !== 'function') {
      return;
    }

    panelElement.collapse();

    triggerElement.onClick(() => {
      const shouldOpen = panelElement.collapsed;

      items.forEach((item) => {
        const otherPanel = safeSelect($w, item.panel);
        if (otherPanel && typeof otherPanel.collapse === 'function' && !otherPanel.collapsed) {
          otherPanel.collapse();
        }

        const otherOpenIcon = safeSelect($w, item.iconOpen);
        const otherClosedIcon = safeSelect($w, item.iconClosed);
        if (otherOpenIcon) {
          otherOpenIcon.hide();
        }
        if (otherClosedIcon) {
          otherClosedIcon.show();
        }
      });

      if (shouldOpen) {
        panelElement.expand();

        const openIcon = safeSelect($w, iconOpen);
        const closedIcon = safeSelect($w, iconClosed);
        if (openIcon) {
          openIcon.show();
        }
        if (closedIcon) {
          closedIcon.hide();
        }
      }
    });
  });
}
