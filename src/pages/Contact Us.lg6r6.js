import { revealOnEnter } from 'public/siteAnimations';

$w.onReady(function () {
  revealOnEnter($w, [
    '#contactOptionsSection',
    '#contactFormSection',
    '#locationSection',
    '#portalSection',
    '#contactFaqSection'
  ]);
});
