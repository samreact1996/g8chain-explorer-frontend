// SPDX-License-Identifier: LicenseRef-Blockscout

import { Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  hash: string;
  size?: number;
}

// Deterministic per-address gradient square (G8Chain stat-cell accent look): the two
// gradient stops are derived from the address hash, so every address gets its own
// stable color pair — same address always shows the same colors.
const gradientFromHash = (hash: string) => {
  const h1 = parseInt(hash.slice(2, 8), 16) % 360;
  const h2 = (h1 + 35 + (parseInt(hash.slice(8, 14), 16) % 60)) % 360;
  return `linear-gradient(135deg, hsl(${ h1 }, 72%, 52%) 0%, hsl(${ h2 }, 72%, 42%) 100%)`;
};

const AddressGradientSquare = ({ hash, size = 12 }: Props) => {
  const background = React.useMemo(() => gradientFromHash(hash.toLowerCase()), [ hash ]);

  return (
    <Box
      boxSize={ `${ size }px` }
      flexShrink={ 0 }
      borderRadius="sm"
      background={ background }
      aria-hidden
    />
  );
};

export default React.memo(AddressGradientSquare);
