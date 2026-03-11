import wixLocation from 'wix-location';
import { HEADER_IDS, MOBILE_MENU_IDS, NAV_IDS, PAGE_SLUGS } from 'public/siteConfig';
import { collapseIfExists, expandIfExists, forEachExisting, onClickIfExists, safeSelect } from 'public/siteUtils';

function setHeaderMode($w, isSolid) {
  const transparentHeader = safeSelect($w, HEADER_IDS.transparentStateBox);
  const solidHeader = safeSelect($w, HEADER_IDS.solidStateBox);

  if (transparentHeader) {
    if (isSolid) {
      transparentHeader.hide();
    } else {
      transparentHeader.show();
    }
  }

  if (solidHeader) {
    if (isSolid) {
      solidHeader.show();
    } else {
      solidHeader.hide();
    }
  }
}

function highlightActiveNav($w) {
  const slug = wixLocation.path.join('/');
  const activeKey = Object.entries(PAGE_SLUGS).find(([, value]) => value === slug)?.[0] || 'home';
  const activeNavId = NAV_IDS[activeKey];

  forEachExisting($w, Object.values(NAV_IDS), (element, selector) => {
    if (selector === activeNavId && element.style) {
      element.style.backgroundColor = '#EEF5F3';
      element.style.color = '#1D5E6A';
    }
  });
}

function setupMobileMenu($w) {
  collapseIfExists($w, MOBILE_MENU_IDS.drawer);

  onClickIfExists($w, MOBILE_MENU_IDS.openButton, () => {
    expandIfExists($w, MOBILE_MENU_IDS.drawer);
  });

  onClickIfExists($w, MOBILE_MENU_IDS.closeButton, () => {
    collapseIfExists($w, MOBILE_MENU_IDS.drawer);
  });

  forEachExisting($w, Object.values(NAV_IDS), (element) => {
    element.onClick(() => {
      collapseIfExists($w, MOBILE_MENU_IDS.drawer);
    });
  });
}

$w.onReady(function () {
  highlightActiveNav($w);
  setupMobileMenu($w);
  setHeaderMode($w, false);

  const heroSentinel = safeSelect($w, HEADER_IDS.heroSentinel);
  if (heroSentinel && typeof heroSentinel.onViewportLeave === 'function') {
    heroSentinel.onViewportLeave(() => setHeaderMode($w, true));
    heroSentinel.onViewportEnter(() => setHeaderMode($w, false));
  } else {
    setHeaderMode($w, true);
  }
});
