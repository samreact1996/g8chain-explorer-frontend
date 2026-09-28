// SPDX-License-Identifier: LicenseRef-Blockscout

const styles = {
  '.address-entity': {
    '&.address-entity_highlighted': {
      _before: {
        content: `" "`,
        position: 'absolute',
        // snug fit: the dashed highlight hugs the address text (2px on all sides)
        // instead of the roomy 5px default
        py: 0.5,
        pl: 0.5,
        pr: 0,
        top: '-2px',
        left: '-2px',
        width: `calc(100% + 4px)`,
        height: 'calc(100% + 4px)',
        borderRadius: 'base',
        borderColor: 'address.highlighted.border',
        borderWidth: '0.2px',
        borderStyle: 'dotted',
        bgColor: 'address.highlighted.bg',
        zIndex: -1,
      },
      '& .entity__shield': {
        borderColor: 'address.highlighted.bg',
        bgColor: 'address.highlighted.bg',
      },
    },
  },
  '.address-entity_no-copy': {
    '&.address-entity_highlighted': {
      _before: {
        pr: 1,
        width: `calc(100% + 4px + 4px)`,
      },
    },
  },
};

export default styles;
