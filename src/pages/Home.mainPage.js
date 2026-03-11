import wixLocation from 'wix-location';
import { revealOnEnter } from 'public/siteAnimations';
import { onClickIfExists } from 'public/siteUtils';

$w.onReady(function () {
  revealOnEnter($w, [
    '#quickValueSection',
    '#whyChooseSection',
    '#howItWorksSection',
    '#primaryCareSection',
    '#membershipSection',
    '#weightLossSection',
    '#teamSection',
    '#faqSection',
    '#finalCtaSection'
  ]);

  onClickIfExists($w, '#heroPrimaryCta', () => {
    wixLocation.to('/membership-pricing');
  });

  onClickIfExists($w, '#heroSecondaryCta', () => {
    wixLocation.to('/contact');
  });
});
