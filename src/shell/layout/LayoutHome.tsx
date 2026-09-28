// SPDX-License-Identifier: LicenseRef-Blockscout

import React from 'react';

import type { Props } from './types';

import HeaderAlert from 'src/shell/header/HeaderAlert';
import HeaderMobile from 'src/shell/header/HeaderMobile';

import AppErrorBoundary from 'src/shared/errors/AppErrorBoundary';

import * as Layout from './components';

const LayoutHome = ({ children }: Props) => {
  return (
    <Layout.Root content={ children }>
      <Layout.Container>
        <Layout.TopRow/>
        <HeaderMobile hideSearchButton/>
        <Layout.MainArea isFullBleed>
          <Layout.SideBar/>
          <Layout.MainColumn isFullBleed>
            <HeaderAlert mb={ 3 }/>
            <AppErrorBoundary>
              { children }
            </AppErrorBoundary>
          </Layout.MainColumn>
        </Layout.MainArea>
        <Layout.Footer/>
      </Layout.Container>
    </Layout.Root>
  );
};

export default LayoutHome;
