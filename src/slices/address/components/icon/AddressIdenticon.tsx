// SPDX-License-Identifier: LicenseRef-Blockscout

import React from 'react';

import AddressGradientSquare from './AddressGradientSquare';

interface IconProps {
  hash: string;
  size: number;
}

type Props = IconProps;

// G8Chain: a deterministic per-address gradient square replaces the classic circular
// identicons (blockie/jazzicon/gradient avatar/...) across the whole explorer — the
// same motif as the homepage transaction rows. The identicon-type cookie/config is
// superseded by this design decision. The square is always 12×12 — callers that used
// to size identicons differently (20/24/30) render the same compact accent everywhere.
const AddressIdenticon = (props: Props) => {
  return <AddressGradientSquare hash={ props.hash } size={ 12 }/>;
};

export default React.memo(AddressIdenticon);
