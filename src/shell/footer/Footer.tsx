// SPDX-License-Identifier: LicenseRef-Blockscout

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import React from 'react';

import { CONTENT_MAX_WIDTH } from 'src/shell/layout/utils';

import NetworkAddToWallet from 'src/features/web3-wallet/components/NetworkAddToWallet';

import { Link } from 'src/toolkit/chakra/link';

// G8Chain site footer (design system §10.6): light band closed by the four-color strip,
// the "Powered by" partner bar, two columns (brand, quick links, Partners) and the
// legal bar. Layout mirrors the G8CHAIN website footer; copy is subject to change.

const TEXT = 'text.primary';
const DIM = 'text.secondary';
const FAINT = 'rgba(29, 37, 46, 0.45)';
const HAIRLINE = 'rgba(29, 37, 46, 0.08)';

const STRIP_COLORS = [ '#1F4DD8', '#0C90B8', '#38B3D4', '#280ecfff' ];

// G8Chain footer quick links — real explorer routes (blogs page does not exist yet)
const FOOTER_LINKS = [
  { text: 'Explorer', href: '/' },
  { text: 'Transactions', href: '/txs' },
  { text: 'Accounts', href: '/accounts' },
  { text: 'Tokens', href: '/tokens' },
  { text: 'Contracts', href: '/verified-contracts' },
];

const PARTNERS = [
  { name: 'ALPHAG8', role: 'Exclusive Technology Partner', color: '#d8c51fff', isSoon: false },
  { name: 'G8CHAIN', role: 'Distributed Ledger Technology', color: '#0C90B8', isSoon: false },
  { name: 'ONEG8', role: 'Privacy Focused Social Platform', color: '#0b2163ff', isSoon: false },
  { name: 'X/TWITTER', role: 'Social Updates & Community', color: '#000000ff', isSoon: false },
];

const LEGAL_LINKS = [
  { text: 'Imprint', href: '#top', testId: 'link-footer-imprint' },
  { text: 'Terms of Use', href: '#top', testId: 'link-footer-terms' },
  { text: 'Privacy Policy', href: '#top', testId: 'link-footer-privacy' },
  { text: 'Swiss Data Security', href: '#top', testId: 'link-footer-swiss' },
];

const ZAP_PATH =
  'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z';

const ZapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d={ ZAP_PATH }/>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M7 7h10v10"/>
    <path d="M7 17 17 7"/>
  </svg>
);

const Sep = () => (
  <Box
    as="i"
    aria-hidden
    w="3px"
    h="3px"
    flexShrink={ 0 }
    bg="rgba(29, 37, 46, 0.25)"
    borderRadius="1px"
  />
);

const Footer = () => {
  return (
    <Box as="footer" className="site-footer" bg="bg.primary" color={ TEXT } borderTop="1px solid" borderTopColor={ HAIRLINE }>
      { /* four-color brand strip closing the page */ }
      <Box h="4px" display="flex" className="footer-colorstrip">
        { STRIP_COLORS.map((color) => <Box key={ color } flex="1" bg={ color }/>) }
      </Box>
      <Box maxW={ `${ CONTENT_MAX_WIDTH }px` } mx="auto" px={{ base: 3, lg: 6 }} className="footer-shell">

        { /* powered-by partner bar */ }
        <Flex
          className="footer-poweredbar"
          alignItems="center"
          columnGap={ 3 }
          rowGap={ 2 }
          flexWrap="wrap"
          py={ 3 }
          borderBottom="1px solid"
          borderColor={ HAIRLINE }
        >
          <Text fontFamily="mono" fontSize="11px" fontWeight={ 700 } letterSpacing="0.14em" textTransform="uppercase" color="#0C90B8">
            Powered by
          </Text>
          <Link href="#top" title="ALPHAG8 — Technology Partner" _hover={{ color: '#0a7495' }} data-testid="link-footer-powered-alphag8">
            <Text fontFamily="mono" fontSize="13px" fontWeight={ 700 } letterSpacing="0.04em" lineHeight={ 1 }>ALPHAG8</Text>
          </Link>
          <Link href="#top" title="G8Chain — Distributed Ledger Infrastructure" _hover={{ color: '#0a7495' }} data-testid="link-footer-powered-g8chain">
            <Text fontFamily="mono" fontSize="13px" fontWeight={ 700 } letterSpacing="0.04em" lineHeight={ 1 }>G8CHAIN</Text>
          </Link>
          <Flex alignItems="center" columnGap={ 2 } ml={{ base: 0, lg: 'auto' }}>
            <Box as="i" aria-hidden w="6px" h="6px" borderRadius="1px" bg="#38B3D4" flexShrink={ 0 }/>
            <Text fontFamily="mono" fontSize="11px" letterSpacing="0.06em" color={ DIM }>
              ISO 9001 · ISO 14001 · ISO 45001 · SOA
            </Text>
          </Flex>
        </Flex>

        { /* main columns */ }
        <Grid
          className="footer-columns"
          gridTemplateColumns={{ base: '1fr', lg: 'minmax(0, 1.15fr) minmax(0, 0.62fr) minmax(0, 1fr)' }}
          columnGap={{ lg: 12 }}
          rowGap={{ base: 8, lg: 0 }}
          py={{ base: 8, lg: 12 }}
        >
          { /* brand */ }
          <Box className="footer-col footer-brandcol">
            <Link href="#top" className="brand-row" data-testid="link-footer-home" _hover={{ opacity: 0.85 }}>
              <Flex alignItems="center" columnGap={ 3 }>
                <Flex
                  aria-hidden
                  w="32px"
                  h="32px"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="sm"
                  border="1px solid"
                  borderColor={ HAIRLINE }
                  color="#0C90B8"
                  flexShrink={ 0 }
                >
                  <ZapIcon/>
                </Flex>
                <Text fontFamily="mono" fontWeight={ 700 } fontSize="15px" letterSpacing="0.04em" lineHeight={ 1 } className="brand-word">
                  G8CHAIN EXPLORER
                </Text>
              </Flex>
            </Link>
            <Text mt={ 4 } fontSize="13.5px" lineHeight="1.6" color={ DIM } maxW="400px" className="brand-mission">
              G8Chain Explorer lets you inspect and analyze G8Chain Distributed Ledger Infrastructure. Search transactions,
              verify smart contracts, and explore addresses across the G8Chain ecosystem.
            </Text>
            { /* Add G8Chain wallet button (renders when a browser wallet is detected) */ }
            <Box mt={ 5 }>
              <NetworkAddToWallet source="Footer"/>
            </Box>
          </Box>

          { /* quick links (no column heading by design) */ }
          <Box as="nav" className="footer-col" aria-label="Explorer pages">
            <Flex as="ul" flexDir="column" rowGap={ 2 } listStyleType="none" p={ 0 } m={ 0 }>
              <Text fontFamily="mono" fontSize="11px" fontWeight={ 700 } letterSpacing="0.18em" textTransform="uppercase" color={ DIM }>
                Quick Links
              </Text>
              { FOOTER_LINKS.map(link => (
                <Box as="li" key={ link.text } w="fit-content">
                  <Link
                    href={ link.href }
                    className="col-link focus-ring"
                    data-testid={ `link-footer-${ link.text.toLowerCase() }` }
                    display="inline-flex"
                    alignItems="center"
                    columnGap={ 2 }
                    fontSize="13.5px"
                    color="rgba(29, 37, 46, 0.75)"
                    _hover={{ color: TEXT }}
                  >
                    <Box as="i" aria-hidden w="10px" h="1px" bg="currentColor" opacity={ 0.4 } flexShrink={ 0 }/>
                    { link.text }
                  </Link>
                </Box>
              )) }
            </Flex>
          </Box>

          { /* partners */ }
          <Box className="footer-col footer-partnerscol">
            <Flex className="col-eyebrow" alignItems="center" mb={ 4 }>
              { /* { eyebrow } */ }
              <Text fontFamily="mono" fontSize="11px" fontWeight={ 700 } letterSpacing="0.18em" textTransform="uppercase" color={ DIM }>
                Partners
              </Text>
            </Flex>
            <Flex className="partner-rows" flexDir="column" rowGap={ 2 }>
              { PARTNERS.map(partner => (
                <Flex
                  key={ partner.name }
                  className={ partner.isSoon ? 'partner-row is-soon' : 'partner-row' }
                  alignItems="center"
                  justifyContent="space-between"
                  columnGap={ 3 }
                  px={ 3 }
                  py={ 2.5 }
                  border="1px solid"
                  borderColor={ HAIRLINE }
                  borderRadius="sm"
                  opacity={ partner.isSoon ? 0.6 : 1 }
                  _hover={{ borderColor: 'rgba(29, 37, 46, 0.24)' }}
                  transition="border-color .2s ease"
                >
                  <Box className="partner-copy" minW={ 0 }>
                    <Flex alignItems="center" columnGap={ 2 } className="partner-name">
                      <Box as="i" aria-hidden w="9px" h="9px" borderRadius="1px" bg={ partner.color } flexShrink={ 0 }/>
                      <Text fontFamily="mono" fontSize="12.5px" fontWeight={ 700 } letterSpacing="0.04em" lineHeight={ 1.2 }>
                        { partner.name }
                      </Text>
                    </Flex>
                    <Text mt={ 1 } ml="17px" fontSize="12px" color={ FAINT } className="partner-role">
                      { partner.role }
                    </Text>
                  </Box>
                  { partner.isSoon ? (
                    <Text
                      className="partner-soon"
                      fontFamily="mono"
                      fontSize="10px"
                      fontWeight={ 700 }
                      letterSpacing="0.12em"
                      textTransform="uppercase"
                      color={ FAINT }
                      border="1px solid"
                      borderColor={ HAIRLINE }
                      borderRadius="sm"
                      px={ 1.5 }
                      py={ 0.5 }
                      flexShrink={ 0 }
                    >
                      Soon
                    </Text>
                  ) : (
                    <Box className="partner-arrow" color="#0C90B8" flexShrink={ 0 }>
                      <ArrowUpRightIcon/>
                    </Box>
                  ) }
                </Flex>
              )) }
            </Flex>
          </Box>
        </Grid>

        { /* legal bar */ }
        <Flex
          className="footer-legal"
          borderTop="1px solid"
          borderColor={ HAIRLINE }
          py={ 4 }
          columnGap={ 3 }
          rowGap={ 2 }
          flexWrap="wrap"
          justifyContent={{ base: 'flex-start', lg: 'space-between' }}
          alignItems="center"
        >
          <Flex className="legal-copyright" alignItems="center" columnGap={ 2 } rowGap={ 1 } flexWrap="wrap">
            <Text fontSize="12px" color={ FAINT }>© 2026 G8CHAIN — G8CHAIN S.R.L.</Text>
            <Sep/>
            <Text fontSize="12px" color={ FAINT } className="legal-credit">
              Design &amp; Concept <Link href="#top" _hover={{ color: TEXT }}>ALPHAG8.com</Link>
            </Text>
          </Flex>
          <Flex as="nav" className="legal-links" aria-label="Legal and compliance" alignItems="center" columnGap={ 2 } rowGap={ 1 } flexWrap="wrap">
            { LEGAL_LINKS.map((link, index) => (
              <React.Fragment key={ link.text }>
                { index > 0 && <Sep/> }
                <Link href={ link.href } className="focus-ring" data-testid={ link.testId } fontSize="12px" color={ FAINT } _hover={{ color: TEXT }}>
                  { link.text }
                </Link>
              </React.Fragment>
            )) }
            <Sep/>
            <Text fontSize="12px" color={ FAINT }>ISO 27001 · FINMA · nFADP</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default React.memo(Footer);
