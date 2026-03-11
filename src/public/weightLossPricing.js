import { safeSelect } from 'public/siteUtils';

export const WEIGHT_LOSS_PRICING_REPEATERS = [
  '#semaglutideClinicRepeater',
  '#semaglutideHomeRepeater',
  '#tirzepatideClinicRepeater',
  '#tirzepatideHomeRepeater'
];

function formatDose(value) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return '';
  }

  return `${numericValue.toFixed(2)} mg`;
}

function formatCost(value) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return '';
  }

  return `$${numericValue.toFixed(0)}/month`;
}

function formatDeliveryType(value) {
  if (!value) {
    return '';
  }

  if (value === 'Home deliver') {
    return 'Home delivery';
  }

  return value;
}

export function setupWeightLossPricingRepeaters($w, repeaterIds = WEIGHT_LOSS_PRICING_REPEATERS) {
  repeaterIds.forEach((repeaterId) => {
    const repeater = safeSelect($w, repeaterId);
    if (!repeater || typeof repeater.onItemReady !== 'function') {
      return;
    }

    repeater.onItemReady(($item, itemData) => {
      const doseText = safeSelect($item, '#doseText');
      const costText = safeSelect($item, '#costText');
      const deliveryText = safeSelect($item, '#deliveryText');

      if (doseText && typeof doseText.text !== 'undefined') {
        doseText.text = formatDose(itemData.doseMg);
      }

      if (costText && typeof costText.text !== 'undefined') {
        costText.text = formatCost(itemData.monthlyCost);
      }

      if (deliveryText && typeof deliveryText.text !== 'undefined' && itemData.deliveryType) {
        deliveryText.text = formatDeliveryType(itemData.deliveryType);
      }
    });
  });
}
